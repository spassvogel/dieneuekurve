import Dot, { LEFT, STRAIGHT, RIGHT } from './Dot';
import 'yuki-createjs';

const NUM_PLAYERS_REQUIRED = 2; // Minimum number of players required to start game
const START_POS_MARGIN = 20;	// Player can never start in this area around the edges
const GAME_AREA_MARGIN = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
}
const SPAWN_DISTANCE_TRESHOLD = 100;



export default class GameCanvas {

    constructor(canvas){
        this.canvas = canvas;
        this.init();
    }

    init(){
        this.stage = new createjs.Stage(this.canvas);
        this.gameArea = new createjs.Shape();
        this.gameAreaDimensions = new createjs.Rectangle(
            GAME_AREA_MARGIN.left, 
            GAME_AREA_MARGIN.top, 
            this.canvas.width - GAME_AREA_MARGIN.left - GAME_AREA_MARGIN.right, 
            this.canvas.height - GAME_AREA_MARGIN.top - GAME_AREA_MARGIN.bottom);

        this.controls = {};

        this.gameArea.x = this.gameAreaDimensions.x;
        this.gameArea.y = this.gameAreaDimensions.y;
        this.stage.addChild(this.gameArea);

        createjs.Ticker.addEventListener("tick", this.gameLoop.bind(this));
        createjs.Ticker.setFPS(30);
        this.paused = true;
    }

    /** Events */
    onPlayerDies() { }   // Override this    

    /** Public methods */
    prepareRound(players) {
        this.paused = true;
        this.players = players;
        this.controls = {};
        
        this.gameArea.graphics.clear();
        this._drawGameAreaBorder();
        this._spawnDots();

        this._repaint(); 
    }

    startRound() {
        this.paused = false;
    }

    /**
     * @param {string} playerId 
     * @param {string} key 'left' or 'right'
     * @param {boolean} pressed 
     */
    control(playerId, key, pressed) {
        const dot = this.dots.find(d => d.id === playerId);
        if(!this.controls[playerId]) {
            this.controls[playerId] = {};
        }
        this.controls[playerId][key] = pressed;
        const keyMap = {
            'left': LEFT,
            'right': RIGHT
        }
        if(pressed) {            
            dot.direction = keyMap[key];
        } 
        else {
            switch(key) {
                case 'left':
                    dot.direction = this.controls[playerId]['right'] ? RIGHT : STRAIGHT;
                    break;
                case 'right':
                    dot.direction = this.controls[playerId]['left'] ? LEFT : STRAIGHT;
                    break;
            }
        }        
    }

    _drawGameAreaBorder() {            

        this.gameArea.graphics
            .setStrokeStyle(2)
            .beginStroke("#fff")
        	.drawRect(0, 0, this.gameAreaDimensions.width, this.gameAreaDimensions.height);
    }

    _spawnDots(){
        this.dots = this.players.map(p => 
            new Dot(p.id, p.color));
        /**
         * Returns true if the given coordinates are within SPAWN_DISTANCE_TRESHOLD of the position of another player
         * @param {*} x 
         * @param {*} y  */
        const tooCloseToOtherPlayer = (x, y) => {
            // return true if at least one of the players has a position too close
            return this.dots.some((dot) => (dot.pos && Math.hypot(dot.pos.x - x, dot.pos.y -y) < SPAWN_DISTANCE_TRESHOLD));
        }

        this.dots.forEach((dot) => {
            dot.alive = true;

            let x, y;
            do {
                // Keep trying to find a location not too close to another player
                x = (this.gameAreaDimensions.width - 2 * START_POS_MARGIN) * Math.random() + START_POS_MARGIN;
                y = (this.gameAreaDimensions.height - 2 * START_POS_MARGIN) * Math.random() + START_POS_MARGIN;
            }
            while(tooCloseToOtherPlayer(x, y));

            dot.pos = new createjs.Point(x, y);		
    
            // Rotate to face the middle, this way we won't go offscreen so easily
            dot.rotation = Math.PI / 2 + Math.atan2(this.gameAreaDimensions.height / 2 - y, this.gameAreaDimensions.width / 2 - x);
            dot.rotation += Math.random() * .5;
            
			this.gameArea.graphics
				.beginStroke(dot.color)
				.beginFill(dot.color)
				.drawCircle(dot.midPoint.x, dot.midPoint.y, dot.stroke / 2);				
        });

    }
    
    gameLoop(event) {
        if(!this.paused) {
            const dotHitSomething = (dot) => {
                return this.gameArea.hitTest(dot.pos.x, dot.pos.y) ||
                    dot.pos.x < 0 ||
                    dot.pos.y < 0 ||
                    dot.pos.x > this.gameAreaDimensions.width ||
                    dot.pos.y > this.gameAreaDimensions.height
            }

            const activeDots = this.dots.filter(dot => dot.alive);
            if(activeDots.length === 1){
                // someone wins
            }
            activeDots.forEach((dot) => {
                // Randomly open the line
                if(Math.random() * 100 < .5 && !dot.isOpen){
                    dot.open = true;
                }

                // Determine new position
                dot.update(event);

                if(dotHitSomething(dot)){
                    // Create the event
                    if(typeof this.onPlayerDies === 'function'){
                        this.onPlayerDies(dot);
                    }

                    dot.alive = false;
                }

                // Draw new segment
                if(!dot.open){
                    this.gameArea.graphics
                        .setStrokeStyle(dot.stroke, 'round', 'round')
                        .beginStroke(dot.color).moveTo(dot.midPoint.x, dot.midPoint.y)
                        .curveTo(dot.prevPos.x, dot.prevPos.y, dot.prevMidPoint.x, dot.prevMidPoint.y);
                }
            });
            
            this._repaint();
        }
    }

    _repaint() {
        this.stage.update();        
    }


    // gameLoop(event) {
        
    //     switch(this._gameState){
    //         case GAME_STATES.playing:
    //             const dotHitSomething = (dot) => {
    //                 return this.gameArea.hitTest(dot.pos.x, dot.pos.y) ||
    //                     dot.pos.x < 0 ||
    //                     dot.pos.y < 0 ||
    //                     dot.pos.x > this.gameAreaDimensions.width ||
    //                     dot.pos.y > this.gameAreaDimensions.height
    //             }

    //             if (!event.paused) {
	// 				const activeDots = this.dots.filter(dot => dot.alive);
	// 				if(activeDots.length === 1){
						
	// 				}
	// 				activeDots.forEach((dot) => {
    //                     // Randomly open the line
    //                     if(Math.random() * 100 < .5 && !dot.isOpen){
    //                         dot.open = true;
    //                     }

    //                     // Determine new position
    //                     dot.update(event);

    //                     if(dotHitSomething(dot)){
    //                         console.log(dot.name + " dies")
    //                         dot.alive = false;
    //                     }

    //                     // Draw new segment
    //                     if(!dot.open){
    //                         this.gameArea.graphics
    //                             .setStrokeStyle(dot.stroke, 'round', 'round')
    //                             .beginStroke(dot.color).moveTo(dot.midPoint.x, dot.midPoint.y)
    //                             .curveTo(dot.prevPos.x, dot.prevPos.y, dot.prevMidPoint.x, dot.prevMidPoint.y);
    //                     }
    //                 });
    //             }
    //             break;

    //         case GAME_STATES.waitingForRound:
    //             break;

    //         case GAME_STATES.waitingForGame:
    //             if(this._repaintWaitingForGame) {
    //                 this.paintWaitingForGameScreen();
    //                 this._repaintWaitingForGame = false;                    
    //             }
    //             break;
    //     }
    //     this.stage.update();
    // }

    // set gameState(val){
    //     if(val == this._gameState){
    //         return;
    //     }

    //     this._gameState = val;
    //     switch(val){
	// 		case GAME_STATES.playing:
	// 			this.paintInitialPlayingScreen();				
    //             break;

	// 		case GAME_STATES.waitingForRound:
	// 			this.spawnDots();
    //             this.paintWaitingForRoundScreen();
    //             break;

    //         case GAME_STATES.waitingForGame:
    //              this._repaintWaitingForGame = true;            
    //             break;
    //     }
    // }

    // get players() {
    //     return this._store.getState().players;
    // }

    // /**
    //  * The Waiting for Game screen shows the players that have joined and whether they are set to 'ready'
    //  */
    // paintWaitingForGameScreen() {
    //     const players = this.players;
    //     this.gameArea.graphics.clear();
    //     this.hud.removeAllChildren();

    //     if(this.firstGame) {
    //         const headerText = new createjs.Text('Starting game', "50px Arial", "#ffffff");                   
    //         headerText.x = this.canvas.width / 2;
	// 		headerText.y = 15;
    //         headerText.textAlign = 'center';
    //         this.hud.addChild(headerText);
            
    //         let text;
    //         if(players.length < NUM_PLAYERS_REQUIRED) {
    //             const delta = NUM_PLAYERS_REQUIRED - players.length;
    //             text = `Waiting on ${delta} more player${delta != 1 ? 's' : ''} to join.`;
    //         } else {
    //             const playersReadyCount = players.filter(p => !p.ready).length;
    //             text = `Waiting on ${playersReadyCount} player${playersReadyCount != 1 ? 's' : ''} to get ready.`
    //         }
    //         // waiting on more players
    //         const footerText = new createjs.Text(text, "30px Arial", "#ffffff");                   
    //         footerText.x = this.canvas.width / 2;
    //         footerText.y = this.canvas.height - 80;
    //         footerText.textAlign = 'center';
    //         this.hud.addChild(footerText);
    //     }

    //     const joinGameText = new createjs.Text(`Point your mobile browser at: ${this._serverAddress}`, "30px Arial", "#ffffff");      
    //     joinGameText.x = this.canvas.width / 2;
    //     joinGameText.y = this.canvas.height - 35;
    //     joinGameText.textAlign = 'center';
    //     this.hud.addChild(joinGameText);
        
    //     const playerTextX = 100;
    //     const playerTextY = 200;
    //     const playerTextHeight = 80;
    //     for(let i = 0; i < players.length; i++){
    //         const text = new createjs.Text(`${players[i].ready ? '✓': '  '} ${players[i].name}`, "50px Arial", players[i].color);
    //         text.x = playerTextX;
	// 		text.y = playerTextY + i * playerTextHeight;
    //         this.hud.addChild(text);
    //     }
    // }

    // /**
    //  * The Waiting for Round screen shows the round number and a countdown 
    //  */
    // paintWaitingForRoundScreen() {
    //     this.hud.removeAllChildren();

    //     let counter = 3;
    //     const getHeaderText = () => `Round ${this._round}. Get ready: ${counter}`;
    //     const headerText = new createjs.Text(getHeaderText(), "50px Arial", "#ffffff");
    //     const counterInterval = setInterval(() => {
    //         if(--counter === 0){
    //             clearInterval(counterInterval);
    //             this.gameState = GAME_STATES.playing;
    //         }
    //         else {
    //             headerText.text = getHeaderText();
    //         }
    //     }, 1000);

    //     headerText.x = 20;
	// 	headerText.y = 15;
    //     this.hud.addChild(headerText);

    //     this.paintPlayerBar();
    // }
	
	// /**
	//  * Gets called right before every round starts
	//  */
	// paintInitialPlayingScreen(){
	// 	this.hud.removeAllChildren();
	// 	const headerText = new createjs.Text(`Round ${this._round}.`, "50px Arial", "#ffffff");
	// 	headerText.x = 20;
	// 	headerText.y = 15;
	// 	this.hud.addChild(headerText);

	// 	this.gameArea.graphics.clear();
    //     this.drawGameAreaBorder();
        
    //     this.paintPlayerBar();        
	// }

    // paintPlayerBar() {
    //     if(!this.playerBar) {
    //         this.playerBar = new createjs.Container();
    //         this.playerBar.y = this.canvas.height - 35;
    //         this.playerBar.x = GAME_AREA_MARGIN.left;
    //     }
    //     this.hud.addChild(this.playerBar);            
    //     this.playerBar.removeAllChildren();

    //     this.players.forEach((p,i) => {
    //         const square = new createjs.Shape();
    //         square.graphics
    //             .beginFill(p.color)
    //             .drawRoundRect (0, 0, 20, 20, 2);
    //         square.x = i * (this.gameAreaDimensions.width / this.players.length);
    //         this.playerBar.addChild(square);


    //         const text = new createjs.Text(`${p.name}`, "20px Arial", "#ffffff");
    //         text.x = square.x + 25;
    //         this.playerBar.addChild(text);
	// 	});

    // }

	// /**
	//  * Creates dots based on players in the store
	//  */
	// createDots() {
    //     return this.players.map(p => new Dot(p.color));
	// }

}






