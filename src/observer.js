const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
const eventer = window[eventMethod];
const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

const observer = class Observer {
  constructor() {
    this.events = [];
    this.init();
  }
  init() {
    eventer(messageEvent, (e) => {
      for (let i = 0; i < this.events.length; i += 1) {
        if (e.data === this.events[i].name || e.message === this.events[i].name) {
          this.events[i].callback();
        }
      }
    }, false);
  }
  suscribe(name, callback) {
    this.events.push({
      name,
      callback,
    });
  }
  static emit(name, s, object) {
    object.postMessage(name, s);
  }
};

export default observer;
