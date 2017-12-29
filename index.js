class Timer {
  constructor(hh, mm, ss) {
    this.sound = new Audio('./assets/foghorn-daniel_simon.mp3');
    this.interval;
    this.animate = false;

    this.displayEl = document.querySelector('#display');

    this.container = document.querySelector('#container');

    this.hoursDisplay = document.querySelector('#hoursValue');
    this.minutesDisplay = document.querySelector('#minutesValue');
    this.secondsDisplay = document.querySelector('#secondsValue');

    this.canvas = document.querySelector('#timer');
    this.ctx = this.canvas.getContext('2d');

    this.time = hh * 3600 + mm * 60 + ss;
    this.currentTime = this.time;

    this.startControl = {
      x: 132,
      y: 300,
      height: 40,
      width: 35,
    };
    this.stopControl = {
      x: 132,
      y: 300,
      height: 40,
      width: 35,
    };
    this.resetControl = {
      x: 232,
      y: 300,
      height: 40,
      width: 40,
    };
  }

  init() {
    this.canvas.onclick = this.handleClick.bind(this);

    this.container.onclick = this.modifyTime.bind(this);

    this.showTime();
    this.render();
  }

  handleClick(e) {
    switch (true) {
      case this.isClickWithin(e, this.startControl):
        this.startStop();
        break;
      case this.isClickWithin(e, this.resetControl):
        this.reset();
        break;
    }
  }

  startStop() {
    if (this.animate) {
      this.pause();
    } else {
      this.start();
    }
  }

  modifyTime(event) {
    const modify = JSON.parse(event.target.getAttribute('data-modify-time'));
    if (modify === null) {
      return;
    }
    let value = 1;
    switch (modify.type) {
      case 'hours':
        value = 3600;
        break;
      case 'minutes':
        value = 60;
        break;
    }
    if (modify.direction === 'down') {
      value *= -1;
      if (this.time + value < 0 || this.currentTime + value < 0) {
        return;
      }
    }
    this.time += value;
    this.currentTime += value;
    this.showTime();
  }

  drawCircle() {
    const angle = this.currentTime * 360 / this.time;
    const start = 270;
    const diameter = 400;
    const radius = diameter / 2;
    const offset = 5;

    this.ctx.clearRect(0, 0, diameter, diameter);
    this.ctx.beginPath();
    this.ctx.arc(
      radius,
      radius,
      radius - offset,
      Math.PI / 180 * start,
      Math.PI / 180 * (start + angle),
    );
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = '#40ff00';
    this.ctx.stroke();
  }

  drawStartControl(x, y, height, width) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#40ff00';
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y + height / 2);
    this.ctx.lineTo(x, y + height);
    this.ctx.lineTo(x, y);
    this.ctx.fill();
  }

  drawStopControl(x, y, height, width) {
    const innerWidth = Math.floor(width / 3);
    this.ctx.beginPath();
    this.ctx.fillStyle = '#40ff00';
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + innerWidth, y);
    this.ctx.lineTo(x + innerWidth, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.lineTo(x, y);
    this.ctx.fill();

    this.ctx.moveTo(x + 2 * innerWidth, y);
    this.ctx.lineTo(x + 2 * innerWidth + innerWidth, y);
    this.ctx.lineTo(x + 2 * innerWidth + innerWidth, y + height);
    this.ctx.lineTo(x + 2 * innerWidth, y + height);
    this.ctx.lineTo(x + 2 * innerWidth, y);
    this.ctx.fill();
  }

  drawResetControl(x, y, height, width) {
    const temp = height / 2.25;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#40ff00';
    this.ctx.strokeStyle = '#40ff00';
    this.ctx.lineWidth = 4;
    const radius = height / 2 - temp / 2;
    this.ctx.arc(
      x + height / 2,
      y + width / 2,
      radius,
      Math.PI + Math.PI / 2,
      Math.PI,
    );
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x + width / 2, y);
    this.ctx.lineTo(x + width / 2, y + temp);
    this.ctx.lineTo(x + width / 2 - temp / 2, y + temp / 2);
    this.ctx.lineTo(x + width / 2, y);
    this.ctx.fill();
  }

  drawControls() {
    if (this.animate) {
      this.drawStopControl(132, 300, 40, 35);
    } else {
      this.drawStartControl(132, 300, 40, 35);
    }
    this.drawResetControl(232, 300, 40, 40);
  }

  isClickWithin(e, element) {
    return (
      e.offsetX >= element.x &&
      e.offsetX <= element.x + element.width &&
      e.offsetY >= element.y &&
      e.offsetY <= element.y + element.height
    );
  }

  showTime() {
    const hh = Math.floor(this.currentTime / 3600);
    const mm = Math.floor((this.currentTime - hh * 3600) / 60);
    const ss = Math.floor(this.currentTime - hh * 3600 - mm * 60);

    const el = document.getElementById('numbers');
    const context = el.getContext('2d');

    context.clearRect(0, 0, 200, 200);

    const time = '' + this.padLeft(hh) + this.padLeft(mm) + this.padLeft(ss);

    const number = new Numbers(context);
    context.fillStyle = number.color;
    number.drawNumber(shapes[time[0]], 10.5, 10.5);
    number.drawNumber(shapes[time[1]], 28.5, 10.5);
    context.fillRect(45.5, 17.5, 2, 2);
    context.fillRect(45.5, 25.5, 2, 2);
    number.drawNumber(shapes[time[2]], 51.5, 10.5);
    number.drawNumber(shapes[time[3]], 69.5, 10.5);
    context.fillRect(86.5, 17.5, 2, 2);
    context.fillRect(86.5, 25.5, 2, 2);
    number.drawNumber(shapes[time[4]], 92.5, 10.5);
    number.drawNumber(shapes[time[5]], 110.5, 10.5);
  }

  padLeft(value) {
    return parseInt(value) < 10 ? '0' + value : value;
  }

  toggleControls(visibility) {
    document.querySelectorAll('[data-modify-time]').forEach(el => {
      el.style.visibility = visibility;
    });
  }

  start() {
    this.toggleControls('hidden');
    this.interval = setInterval(() => {
      if (this.currentTime <= 0) {
        this.pause();
        this.sound.play();
        return;
      }
      this.currentTime -= 1;
      this.showTime();
      this.animate = true;
      requestAnimationFrame(() => {
        this.render();
      });
    }, 1000);
  }

  pause() {
    this.animate = false;
    this.toggleControls('visible');
    clearInterval(this.interval);
    this.render();
  }

  reset() {
    this.pause();
    this.currentTime = this.time;
    this.showTime();
    this.render();
  }

  render() {
    this.drawCircle();
    this.drawControls();
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    new Timer(0, 2, 0).init();
  }
};
