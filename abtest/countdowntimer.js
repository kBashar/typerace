/**
 * This countdowntimer is from a stacoverflow answer.
 * Stackoverflow url: http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
 * Question-by: Bartek [http://stackoverflow.com/users/3104868/bartek] 
 * Answer-by: robbmj [http://stackoverflow.com/users/2126755/robbmj] 
 */

function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
  this.startTime;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  this.startTime = Date.now(); 
  var start = this.startTime,
      that = this,
      diff, obj, timePassed;

  (function timer() {
    if(!that.running) {
      return;
    }
    diff = that.duration - (((Date.now() - start) / 1000) | 0);
    timePassed = (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    obj.timePassed = timePassed;
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this,obj);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.prototype.stop = function() {
  this.running = false;
}

CountDownTimer.prototype.timePassed = function() {
  return (((Date.now() - this.startTime) / 1000) | 0)
}

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};