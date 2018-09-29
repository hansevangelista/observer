'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

var observer = function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.events = [];
    this.init();
  }

  _createClass(Observer, [{
    key: 'init',
    value: function init() {
      var _this = this;

      eventer(messageEvent, function (e) {
        for (var i = 0; i < _this.events.length; i += 1) {
          if (e.data === _this.events[i].name || e.message === _this.events[i].name) {
            _this.events[i].callback();
          }
        }
      }, false);
    }
  }, {
    key: 'suscribe',
    value: function suscribe(name, callback) {
      this.events.push({
        name: name,
        callback: callback
      });
    }
  }], [{
    key: 'emit',
    value: function emit(name, s, object) {
      object.postMessage(name, s);
    }
  }]);

  return Observer;
}();

exports.default = observer;