class Numbers {
    constructor(ctx) {
        this.ctx = ctx;
        this.length = 1;
        this.multiplier = 6;
        this.margin = 2;
        this.color = '#40ff00';
    }

    drawStandingShape(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + this.length, y);
        this.ctx.lineTo(x + 2 * this.length, y + this.length);
        this.ctx.lineTo(x + 2 * this.length, y + this.length * this.multiplier);
        this.ctx.lineTo(x + this.length, y + this.length * this.multiplier + this.length);
        this.ctx.lineTo(x, y + this.length * this.multiplier);
        this.ctx.lineTo(x, y + this.length);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    drawLyingShape(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + this.length);
        this.ctx.lineTo(x + this.length, y);
        this.ctx.lineTo(x + this.length + this.length * this.multiplier, y);
        this.ctx.lineTo(x + 2 * this.length + this.length * this.multiplier, y + this.length);
        this.ctx.lineTo(x + this.length + this.length * this.multiplier, y + 2 * this.length);
        this.ctx.lineTo(x + this.length, y + 2 * this.length);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    drawNumber(number, x, y) {
        if (number === undefined) {
            return;
        }

        if (number.leftTop) {
            this.drawStandingShape(x, y + this.length + this.margin);
        }
        if (number.leftBottom) {
            this.drawStandingShape(x, y + 2 * this.length + this.length * this.multiplier + 3 * this.margin);
        }

        if (number.middleTop) {
            this.drawLyingShape(x + this.length + this.margin, y);
        }
        if (number.middleMiddle) {
            this.drawLyingShape(x + this.length + this.margin, y + this.length + this.length * this.multiplier + 2 * this.margin);
        }
        if (number.middleBottom) {
            this.drawLyingShape(x + this.length + this.margin, y + 2 * this.length + 2 * this.length * this.multiplier + 4 * this.margin);
        }

        if (number.rightTop) {
            this.drawStandingShape(x + 2 * this.length + this.length * this.multiplier + 2 * this.margin, y + this.length + this.margin);
        }
        if (number.rightBottom) {
            this.drawStandingShape(x + 2 * this.length + this.length * this.multiplier + 2 * this.margin, y + 2 * this.length + this.margin + this.length * this.multiplier + 2 * this.margin);
        }
    }
}

shapes = {
    1: {
        leftTop: false,
        leftBottom: false,
        middleTop: false,
        middleMiddle: false,
        middleBottom: false,
        rightTop: true,
        rightBottom: true
    },
    2: {
        leftTop: false,
        leftBottom: true,
        middleTop: true,
        middleMiddle: true,
        middleBottom: true,
        rightTop: true,
        rightBottom: false
    }, 
    3: {
        leftTop: false,
        leftBottom: false,
        middleTop: true,
        middleMiddle: true,
        middleBottom: true,
        rightTop: true,
        rightBottom: true
    },
    4: {
        leftTop: true,
        leftBottom: false,
        middleTop: false,
        middleMiddle: true,
        middleBottom: false,
        rightTop: true,
        rightBottom: true
    },
    5: {
        leftTop: true,
        leftBottom: false,
        middleTop: true,
        middleMiddle: true,
        middleBottom: true,
        rightTop: false,
        rightBottom: true
    },
    6: {
        leftTop: true,
        leftBottom: true,
        middleTop: true,
        middleMiddle: true,
        middleBottom: true,
        rightTop: false,
        rightBottom: true
    },
    7: {
        leftTop: false,
        leftBottom: false,
        middleTop: true,
        middleMiddle: false,
        middleBottom: false,
        rightTop: true,
        rightBottom: true
    },
    8: {
        leftTop: true,
        leftBottom: true,
        middleTop: true,
        middleMiddle: true,
        middleBottom: true,
        rightTop: true,
        rightBottom: true
    },
    9: {
        leftTop: true,
        leftBottom: false,
        middleTop: true,
        middleMiddle: true,
        middleBottom: true,
        rightTop: true,
        rightBottom: true
    },
    0: {
        leftTop: true,
        leftBottom: true,
        middleTop: true,
        middleMiddle: false,
        middleBottom: true,
        rightTop: true,
        rightBottom: true
    }
}
