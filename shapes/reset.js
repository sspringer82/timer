class ResetControl extends Control {
  render() {
    const triangleHeight = this.height / 2.25;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#40ff00';
    this.ctx.strokeStyle = '#40ff00';
    this.ctx.lineWidth = 4;
    const radius = this.height / 2 - triangleHeight / 2;
    this.ctx.arc(
      this.x + this.height / 2,
      this.y + this.width / 2,
      radius,
      Math.PI + Math.PI / 2,
      Math.PI,
    );
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.x + this.width / 2, this.y);
    this.ctx.lineTo(this.x + this.width / 2, this.y + triangleHeight);
    this.ctx.lineTo(
      this.x + this.width / 2 - triangleHeight / 2,
      this.y + triangleHeight / 2,
    );
    this.ctx.lineTo(this.x + this.width / 2, this.y);
    this.ctx.fill();
  }
}
