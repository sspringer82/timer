class StartControl extends Control {
  render() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#40ff00';
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.width, this.y + this.height / 2);
    this.ctx.lineTo(this.x, this.y + this.height);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.fill();
  }
}
