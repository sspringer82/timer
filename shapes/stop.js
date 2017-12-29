class StopControl {
  constructor(ctx, x, y, height, width) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  render() {
    const innerWidth = Math.floor(this.width / 3);
    this.ctx.beginPath();
    this.ctx.fillStyle = '#40ff00';
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + innerWidth, this.y);
    this.ctx.lineTo(this.x + innerWidth, this.y + this.height);
    this.ctx.lineTo(this.x, this.y + this.height);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.fill();

    this.ctx.moveTo(this.x + 2 * innerWidth, this.y);
    this.ctx.lineTo(this.x + 2 * innerWidth + innerWidth, this.y);
    this.ctx.lineTo(this.x + 2 * innerWidth + innerWidth, this.y + this.height);
    this.ctx.lineTo(this.x + 2 * innerWidth, this.y + this.height);
    this.ctx.lineTo(this.x + 2 * innerWidth, this.y);
    this.ctx.fill();
  }
}
