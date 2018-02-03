const GRANTED = 'granted';

export class TimerNotification {
  constructor(timer) {
    this.permissionGranted = false;
    this.timer = timer;
  }

  init() {
    if (window.hasOwnProperty('Notification')) {
      this.permissionGranted = Notification.permissionGranted === GRANTED;
      if (!this.permissionGranted) {
        Notification.requestPermission(permission => {
          this.permissionGranted = permission === GRANTED;
        });
      }
    }

    this.timer.on('finish', () => this.sendNotification());
  }

  sendNotification() {
    if (this.permissionGranted) {
      new Notification("Time's up");
    }
  }
}
