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
}






