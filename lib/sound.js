export class TimerSound {
  constructor(timer) {
    this.timer = timer;
    this.sound = document.getElementById('audio');
  }

  init() {
    this.timer.on('finish', () => this.playSound());
  }

  playSound() {
    if (this.sound) {
      this.sound.play();
    }
  }
}
