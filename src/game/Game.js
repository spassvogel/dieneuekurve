import Dot from './Dot';
import * as actions from './../shared/actions';
import {} from './game.less';

const NUM_PLAYERS_REQUIRED = 2; // Minimum number of players required to start game
const CONTROLLER_PATH = "controller.html";
const START_POS_MARGIN = 20;	// Player can never start in this area around the edges
const GAME_AREA_MARGIN = {
    top: 80,
    right: 20,
    bottom: 30,
    left: 20
}
const GAME_STATES = {
    playing: 0,             // We be playin'
    waitingForRound: 1,     // We wait three seconds and start the next round
    waitingForGame: 2       // We wait for at least two players to be there and be ready
}
const SPAWN_DISTANCE_TRESHOLD = 100;


export default class Game {

    constructor(canvas, store){
        this._gameState = null;
        this._repaintWaitingForGame = false; // flag to repaint player list 
        this._round = 1;
        this._dots = [];
        
        this._store = store;
        store.subscribe(this.storeChanged.bind(this));

        this.addressBackend = window.location.host;
        this.init(canvas);
    }

    init(canvas){
        this.stage = new createjs.Stage(canvas);
        this.gameArea = new createjs.Shape();
        this.gameAreaDimensions = new createjs.Rectangle(
            GAME_AREA_MARGIN.left, 
            GAME_AREA_MARGIN.top, 
            canvas.width - GAME_AREA_MARGIN.left - GAME_AREA_MARGIN.right, 
            canvas.height - GAME_AREA_MARGIN.top - GAME_AREA_MARGIN.bottom);

        this.gameArea.x = this.gameAreaDimensions.x;
        this.gameArea.y = this.gameAreaDimensions.y;
        this.stage.addChild(this.gameArea);

        this.hud = new createjs.Container();
        this.stage.addChild(this.hud);
            
        createjs.Ticker.addEventListener("tick", this.gameLoop.bind(this));
        createjs.Ticker.setFPS(30);

        this.firstGame = true;
        this.gameState = GAME_STATES.waitingForGame;
    }

    storeChanged() {
        switch(this._gameState){
            case GAME_STATES.waitingForGame:
                this._repaintWaitingForGame = true;

                if(this.players.length >= NUM_PLAYERS_REQUIRED && this.players.every(p => p.ready)){
                    // All players ready
                    this.gameState = GAME_STATES.waitingForRound;
                }
                break;
        }
    }

    spawnDots(){

		this.dots = this.createDots();
		this.drawGameAreaBorder();

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
	
			this.gameArea.graphics
				//.setStrokeStyle(dot.stroke, 'round', 'round')
				.beginStroke(dot.color)
				.beginFill(dot.color)
				.drawCircle(dot.midPoint.x, dot.midPoint.y, dot.stroke / 2);
				
        });

    }

	drawGameAreaBorder() {
		this.gameArea.graphics.clear();
        this.gameArea.graphics
            .setStrokeStyle(2)
            .beginStroke("#fff")
        	.drawRect(0, 0, this.gameAreaDimensions.width, this.gameAreaDimensions.height);
	}

    gameLoop(event) {
        
        switch(this._gameState){
            case GAME_STATES.playing:
                const dotHitSomething = (dot) => {
                    return this.gameArea.hitTest(dot.pos.x, dot.pos.y) ||
                        dot.pos.x < 0 ||
                        dot.pos.y < 0 ||
                        dot.pos.x > this.gameAreaDimensions.width ||
                        dot.pos.y > this.gameAreaDimensions.height
                }

                if (!event.paused) {
					const activeDots = this.dots.filter(dot => dot.alive);
					if(activeDots.length === 1){
						
					}
					activeDots.forEach((dot) => {
                        // Randomly open the line
                        if(Math.random() * 100 < .5 && !dot.isOpen){
                            dot.open = true;
                        }

                        // Determine new position
                        dot.update(event);

                        if(dotHitSomething(dot)){
                            console.log(dot.name + " dies")
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
                }
                break;

            case GAME_STATES.waitingForRound:
                break;

            case GAME_STATES.waitingForGame:
                if(this._repaintWaitingForGame) {
                    this.paintWaitingForGameScreen();
                    this._repaintWaitingForGame = false;                    
                }
                break;
        }
        this.stage.update();
    }

    set gameState(val){
        if(val == this._gameState){
            return;
        }

        this._gameState = val;
        switch(val){
			case GAME_STATES.playing:
				this.paintInitialPlayingScreen();				
                break;

			case GAME_STATES.waitingForRound:
				this.spawnDots();
                this.paintWaitingForRoundScreen();
                break;

            case GAME_STATES.waitingForGame:
                 this._repaintWaitingForGame = true;            
                break;
        }
    }

    get players() {
        return this._store.getState().players;
    }

    /**
     * The Waiting for Game screen shows the players that have joined and whether they are set to 'ready'
     */
    paintWaitingForGameScreen() {
        const players = this.players;
        this.gameArea.graphics.clear();
        this.hud.removeAllChildren();

        if(this.firstGame) {
            const headerText = new createjs.Text('Starting game', "50px Arial", "#ffffff");                   
            headerText.x = canvas.width / 2;
			headerText.y = 15;
            headerText.textAlign = 'center';
            this.hud.addChild(headerText);
            
            let text;
            if(players.length < NUM_PLAYERS_REQUIRED) {
                const delta = NUM_PLAYERS_REQUIRED - players.length;
                text = `Waiting on ${delta} more player${delta != 1 ? 's' : ''} to join.`;
            } else {
                const playersReadyCount = players.filter(p => !p.ready).length;
                text = `Waiting on ${playersReadyCount} player${playersReadyCount != 1 ? 's' : ''} to get ready.`
            }
            // waiting on more players
            const footerText = new createjs.Text(text, "30px Arial", "#ffffff");                   
            footerText.x = canvas.width / 2;
            footerText.y = canvas.height - 30;
            footerText.textAlign = 'center';
            this.hud.addChild(footerText);
        }

        const playerTextX = 100;
        const playerTextY = 200;
        const playerTextHeight = 80;
        for(let i = 0; i < players.length; i++){
            const text = new createjs.Text(`${players[i].ready ? '✓': '  '} ${players[i].name}`, "50px Arial", players[i].color);
            text.x = playerTextX;
			text.y = playerTextY + i * playerTextHeight;
            this.hud.addChild(text);
        }
    }

    /**
     * The Waiting for Round screen shows the round number and a countdown 
     */
    paintWaitingForRoundScreen() {
        this.hud.removeAllChildren();

        let counter = 3;
        const getHeaderText = () => `Round ${this._round}. Get ready: ${counter}`;
        const headerText = new createjs.Text(getHeaderText(), "50px Arial", "#ffffff");
        const counterInterval = setInterval(() => {
            if(--counter === 0){
                clearInterval(counterInterval);
                this.gameState = GAME_STATES.playing;
            }
            else {
                headerText.text = getHeaderText();
            }
        }, 1000);

        headerText.x = 20;
		headerText.y = 15;
        this.hud.addChild(headerText);        
    }
	
	/**
	 * Gets called right before every round starts
	 */
	paintInitialPlayingScreen(){
		this.hud.removeAllChildren();
		const headerText = new createjs.Text(`Round ${this._round}.`, "50px Arial", "#ffffff");
		headerText.x = 20;
		headerText.y = 15;
		this.hud.addChild(headerText);

		this.gameArea.graphics.clear();
		this.drawGameAreaBorder();	
	}

	/**
	 * Creates dots based on players in the store
	 */
	createDots() {
		const dots = [];
		this._store.getState().players.forEach(p => {
			dots.push(new Dot(p.color));
		})
		return dots;
	}

}






