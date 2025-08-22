import RandExp from 'randexp';

export class RandExpSeeded extends RandExp{
  constructor(regexp, random, max){
    super(regexp);
    if(max) this.max=max;
    this.setRandom(random);
  }
  setRandom(random){
    this.random=random;
  }
  randInt(a,b){
    if(!this.random){
      return super.randInt(a,b);
    }
    return this.random.int(a,b);
  }
}