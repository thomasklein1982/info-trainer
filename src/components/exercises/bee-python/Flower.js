import { GameObject } from "./GameObject";
import FlowerJSON from "../bee/graphics/flower.json";

export class Flower extends GameObject{
  constructor(position, name, gameworld, color){
    super(position,name,gameworld,FlowerJSON.dataurl);
    if(!color) color="blue";
    if(color==="red"){
      this.style.filter="hue-rotate(125deg)";
    }else if(color==="green"){
      this.style.filter="hue-rotate(220deg)";
    }
  }
}