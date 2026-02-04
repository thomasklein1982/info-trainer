import { GameObject } from "./GameObject";
import BeeJSON from "../bee/graphics/bee.json";

export class Bee extends GameObject{
  constructor(position, name, gameworld){
    super(position,name,gameworld,BeeJSON.dataurl);
    this.imageSize=0.7;
  }
}