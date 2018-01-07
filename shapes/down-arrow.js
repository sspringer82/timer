import { Control } from './control';

export class DownArrow extends Control {
  render() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#40ff00';
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.width / 2, this.y + this.height);
    this.ctx.lineTo(this.x + this.width, this.y);
    this.ctx.stroke();
  }
}
