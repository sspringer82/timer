import { StartControl } from './shapes/start';
import { StopControl } from './shapes/stop';
import { ResetControl } from './shapes/reset';
import { UpArrow } from './shapes/up-arrow';
import { DownArrow } from './shapes/down-arrow';
import { shapes, Numbers } from './numbers';
import { TimerNotification } from './notification';

class Timer {
  constructor(hh, mm, ss) {
    this.events = {};
    this.sound = new Audio('./assets/foghorn-daniel_simon.mp3');
    this.interval;
    this.animate = false;

    this.canvas = document.querySelector('#timer');
    this.ctx = this.canvas.getContext('2d');

    this.time = hh * 3600 + mm * 60 + ss;
    this.currentTime = this.time;

    this.startControl = new StartControl(this.ctx, 132, 300, 40, 35);
    this.stopControl = new StopControl(this.ctx, 132, 300, 40, 35);
    this.resetControl = new ResetControl(this.ctx, 232, 300, 40, 40);
    this.increaseHours = new UpArrow(this.ctx, 146, 165, 10, 20);
    this.increaseMinutes = new UpArrow(this.ctx, 186, 165, 10, 20);
    this.increaseSeconds = new UpArrow(this.ctx, 227, 165, 10, 20);
    this.decreaseHours = new DownArrow(this.ctx, 146, 235, 10, 20);
    this.decreaseMinutes = new DownArrow(this.ctx, 186, 235, 10, 20);
    this.decreaseSeconds = new DownArrow(this.ctx, 227, 235, 10, 20);
  }

  init() {
    const notification = new TimerNotification(this);
    notification.init();
    this.canvas.onclick = this.handleClick.bind(this);
    this.showTime();
    this.render();
  }

  handleClick(e) {
    switch (true) {
      case this.startControl.isClickWithin(e):
        this.startStop();
        break;
      case this.resetControl.isClickWithin(e):
        this.reset();
        break;
      case this.increaseHours.isClickWithin(e):
        this.modifyTime(3600);
        break;
      case this.increaseMinutes.isClickWithin(e):
        this.modifyTime(60);
        break;
      case this.increaseSeconds.isClickWithin(e):
        this.modifyTime(1);
        break;
      case this.decreaseHours.isClickWithin(e):
        this.modifyTime(-3600);
        break;
      case this.decreaseMinutes.isClickWithin(e):
        this.modifyTime(-60);
        break;
      case this.decreaseSeconds.isClickWithin(e):
        this.modifyTime(-1);
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

  modifyTime(seconds) {
    if (this.time + seconds < 0 || this.currentTime + seconds < 0) {
      return;
    }
    this.time += seconds;
    this.currentTime += seconds;
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

  drawControls() {
    if (this.animate) {
      this.stopControl.render();
    } else {
      this.startControl.render();
    }
    this.resetControl.render();

    if (!this.animate) {
      this.increaseHours.render();
      this.increaseMinutes.render();
      this.increaseSeconds.render();

      this.decreaseHours.render();
      this.decreaseMinutes.render();
      this.decreaseSeconds.render();
    }
  }

  showTime() {
    const hh = Math.floor(this.currentTime / 3600);
    const mm = Math.floor((this.currentTime - hh * 3600) / 60);
    const ss = Math.floor(this.currentTime - hh * 3600 - mm * 60);

    const time = '' + this.padLeft(hh) + this.padLeft(mm) + this.padLeft(ss);

    const number = new Numbers(this.ctx);
    this.ctx.fillStyle = number.color;
    const x = 132;
    const y = 184;
    this.ctx.clearRect(x, y, 130, 40);
    number.drawNumber(shapes[time[0]], x + 10.5, y + 10.5);
    number.drawNumber(shapes[time[1]], x + 28.5, y + 10.5);
    this.ctx.fillRect(x + 45.5, y + 17.5, 2, 2);
    this.ctx.fillRect(x + 45.5, y + 25.5, 2, 2);
    number.drawNumber(shapes[time[2]], x + 51.5, y + 10.5);
    number.drawNumber(shapes[time[3]], x + 69.5, y + 10.5);
    this.ctx.fillRect(x + 86.5, y + 17.5, 2, 2);
    this.ctx.fillRect(x + 86.5, y + 25.5, 2, 2);
    number.drawNumber(shapes[time[4]], x + 92.5, y + 10.5);
    number.drawNumber(shapes[time[5]], x + 110.5, y + 10.5);
  }

  padLeft(value) {
    return parseInt(value) < 10 ? '0' + value : value;
  }

  start() {
    this.clockTick();
    this.interval = setInterval(() => this.clockTick(), 1000);
  }

  clockTick() {
    if (this.currentTime <= 0) {
      this.pause();
      //this.sound.play();
      this.trigger('finish');
      return;
    }
    this.currentTime -= 1;
    this.animate = true;
    requestAnimationFrame(() => {
      this.render();
    });
  }

  pause() {
    this.animate = false;
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
    this.showTime();
    this.drawControls();
  }

  on(event, cb) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].push(cb);
    } else {
      this.events[event] = [cb];
    }
  }

  trigger(event, payload) {
    if (this.events.hasOwnProperty(event) && this.events[event].length > 0) {
      this.events[event].forEach(cb => cb(payload));
    }
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    new Timer(0, 2, 0).init();
  }
};
