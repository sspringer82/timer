class Timer {

    constructor(hh, mm, ss) {
        this.interval;
        this.animate = false;

        this.displayEl = document.querySelector('#display');
        this.startBtn = document.querySelector('#start');
        this.pauseBtn = document.querySelector('#pause');
        this.resetBtn = document.querySelector('#reset');

        this.container = document.querySelector('#container');

        this.hoursDisplay = document.querySelector('#hoursValue');
        this.minutesDisplay = document.querySelector('#minutesValue');
        this.secondsDisplay = document.querySelector('#secondsValue');

        const canvas = document.querySelector('#timer');
        this.ctx = canvas.getContext('2d');

        this.time = hh * 3600 + mm * 60 + ss;
        this.currentTime = this.time;
    }

    init() {
        this.startBtn.onclick = this.start.bind(this);
        this.pauseBtn.onclick = this.pause.bind(this);
        this.resetBtn.onclick = this.reset.bind(this);
        
        this.container.onclick = this.modifyTime.bind(this);

        this.showTime();
        this.drawCircle();
    }

    modifyTime(event) {
        const modify = JSON.parse(event.target.getAttribute('data-modify-time'));
        if (modify === null ) {
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
        this.ctx.arc(radius, radius, radius - offset, Math.PI / 180 * start, Math.PI / 180 * (start + angle));
        this.ctx.lineWidth = 10;
        this.ctx.stroke();

        if (this.currentTime > 0 && this.animate) {
            requestAnimationFrame(this.drawCircle.bind(this));
        } else {
            this.animate = false;
        }
    }

    showTime() {
        const hh = Math.floor(this.currentTime / 3600);
        const mm = Math.floor((this.currentTime - hh * 3600) / 60);
        const ss = Math.floor(this.currentTime - hh * 3600 - mm * 60);

        this.hoursDisplay.innerHTML = this.padLeft(hh);
        this.minutesDisplay.innerHTML = this.padLeft(mm);
        this.secondsDisplay.innerHTML = this.padLeft(ss);
    }

    padLeft(value) {
        return (parseInt(value) < 10) ? '0' + value : value;
    }

    toggleControls(visibility) {
        document.querySelectorAll('[data-modify-time]').forEach((el) => {
            el.style.visibility = visibility;
        });
    }

    start() {
        this.toggleControls('hidden');
        this.interval = setInterval(() => {
            if (this.currentTime <= 0) {
                clearInterval(this.interval);
                return;
            }
            this.currentTime -= 1;
            this.showTime();
            this.animate = true;
            requestAnimationFrame(this.drawCircle.bind(this));
        }, 1000);
    }

    pause() {
        this.animate = false;
        this.toggleControls('visible');
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.currentTime = this.time;
        this.showTime();
        this.drawCircle();
    }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    (new Timer(0, 0, 0)).init();
  }
};