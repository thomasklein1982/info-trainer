import { GameObject } from "./GameObject";
import BeeJSON from "../bee/graphics/bee.json";

export class Bee extends GameObject{
  constructor(position, name, gameworld){
    super(position,name,gameworld,BeeJSON.dataurl);
    this.imageSize=0.7;
    this.lastRotations=[];
  }
  move(){
    super.move();
    this.lastRotations=[];
  }
  turnLeft(){
    super.turnLeft();
    this.lastRotations.push("l");
  }
  turnRight(){
    super.turnRight();
    this.lastRotations.push("r");
  }
}