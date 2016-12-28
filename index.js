class Timer {

    constructor(hh, mm, ss) {
        this.interval;
        this.animate = false;

        this.displayEl = document.querySelector('#display');
        this.startBtn = document.querySelector('#start');
        this.pauseBtn = document.querySelector('#pause');
        this.resetBtn = document.querySelector('#reset');

        const canvas = document.querySelector('#timer');
        this.ctx = canvas.getContext('2d');

        this.time = hh * 3600 + mm * 60 + ss;
        this.currentTime = this.time;
    }

    init() {
        this.startBtn.onclick = this.start.bind(this);
        this.pauseBtn.onclick = this.pause.bind(this);
        this.resetBtn.onclick = this.reset.bind(this);
        this.render();
    }

    render() {
        this.displayEl.innerHTML = this.getFormattedTime();
    }

    drawCircle() {
        const angle = this.currentTime * 360 / this.time;
        const start = 270;
        const diameter = 400;
        const radius = diameter / 2;
        const offset = 5;

        this.ctx.clearRect(0, 0, diameter, diameter);
        this.ctx.beginPath();
        this.ctx.arc(radius, radius, radius - offset, Math.PI / 180 * start, Math.PI / 180 * (start + angle));
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

        if (this.currentTime > 0 && this.animate) {
            requestAnimationFrame(this.drawCircle.bind(this));
        } else {
            this.animate = false;
        }
    }

    getFormattedTime() {
        const hh = Math.floor(this.currentTime / 3600);
        const mm = Math.floor((this.currentTime - hh * 3600) / 60);
        const ss = Math.floor(this.currentTime - hh * 3600 - mm * 60);
        return `${this.padLeft(hh)}:${this.padLeft(mm)}:${this.padLeft(ss)}`;
    }

    padLeft(value) {
        return (parseInt(value) < 10) ? '0' + value : value;
    }

    start() {
        this.interval = setInterval(() => {
            this.currentTime -= 1;
            this.render();
            this.animate = true;
            requestAnimationFrame(this.drawCircle.bind(this));
            if (this.currentTime <= 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    pause() {
        this.animate = false;
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.currentTime = this.time;
        this.render();
    }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    (new Timer(0, 20, 0)).init();
  }
};