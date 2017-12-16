

const SECOND = 1000;

const MOVE_SPEED = 150; // amount of pixels per second
const TURN_SPEED = 0.1; // increment in radians
const HOLE_SIZE = 25;       //

export const LEFT = -1;
export const STRAIGHT = 0;
export const RIGHT = 1;

export default class Dot {

    constructor(id, color) {
        this._pos = null;
        this._rotation = Math.PI / 2;
        this._openDist = 0;
    
        this.alive = true;
        this.midPoint = null;
        this.prevPos = null;
        this.prevMidPoint = null;
    
        //this.controller = new KeyboardController();
        this.direction = STRAIGHT;
        this.stroke = 5;

        this.color = color;
        this.id = id;
    }

    update(event) {
        this.prevPos = this.pos;
        this.prevMidPoint = this.midPoint;

        this._rotation += this.direction * TURN_SPEED;

        /*switch(this.controller.direction) {
            case LEFT:
                break;
            case STRAIGHT:
                break;
            case RIGHT:
                break;
        }*/

        const displacement = event.delta / SECOND * MOVE_SPEED;
        this.pos = new createjs.Point(
            this.pos.x + Math.sin(this._rotation) * displacement, 
            this.pos.y - Math.cos(this._rotation) * displacement
        );
        this.midPoint = new createjs.Point(this.pos.x + this.prevPos.x >> 1, this.pos.y + this.prevPos.y >> 1);

        if(this.open){
            this._openDist -= displacement;
        }
    }

    set open(val) {
        this._openDist = val ? HOLE_SIZE : 0;
    }

    get open() {
        return this._openDist >= 0;
    }

    set pos(point) {
        this._pos = point;
        this.midPoint = this._pos.clone();
    }
    
    get pos() {
        return this._pos;
    }

    set rotation(rad) {
        this._rotation = rad;
    }
    
    get rotation() {
        return this._rotation;
    }
}