class Timer {

    constructor(hh, mm, ss) {
        this.interval;

        this.displayEl = document.querySelector('#display');
        this.startBtn = document.querySelector('#start');
        this.pauseBtn = document.querySelector('#pause');
        this.resetBtn = document.querySelector('#reset');

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
        }, 1000);
    }

    pause() {
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
    (new Timer(1, 2, 3)).init();
  }
};