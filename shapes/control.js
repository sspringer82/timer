export class Control {
  constructor(ctx, x, y, height, width) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  isClickWithin(e) {
    return (
      e.offsetX >= this.x &&
      e.offsetX <= this.x + this.width &&
      e.offsetY >= this.y &&
      e.offsetY <= this.y + this.height
    );
  }

  render() {
    throw new Error('Abstract method not implemented');
  }
}
