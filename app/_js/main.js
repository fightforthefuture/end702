(function (doc, win) {
    "use strict";


    function Countdown() {
        this.date = new Date(Date.UTC(2015, 12, 21, 15, 30, 0)).getTime();
        this.interval = null;
        this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
        this.targets = {};
        this.tick = this.tick.bind(this);
        this.curTick = false;
        this.start();
    }

    Countdown.prototype.constants = {
        day: (1000 * 60 * 60 * 24),
        hour: (1000 * 60 * 60),
        minute: (1000 * 60),
        second: (1000)
    };

    Countdown.prototype.padNumber = function(number) {
        if (number > 9) {
            return number;
        } else {
            return '0' + number;
        }
    };

    Countdown.prototype.requestAnimationFrame = function() {
        var request = window.requestAnimationFrame || setTimeout;
        request(this.tick);
    };

    Countdown.prototype.start = function() {
        this.stop();
        this.requestAnimationFrame();
        this.interval = setInterval(this.requestAnimationFrame, 1000);
    };

    Countdown.prototype.stop = function() {
        clearInterval(this.interval);
    };

    Countdown.prototype.tick = function() {
        var now = Date.now();
        var difference = this.date - now;

        this.updateDates(difference);

        if (difference < 0) {
            this.stop();
            document.getElementById('remaining').textContent = '00.00:00:00';
        }
    };

    Countdown.prototype.updateDates = function(difference) {

        this.curTick = !this.curTick;
        var c = this.curTick;

        var days = Math.floor(difference / this.constants.day);
        difference -= days * this.constants.day;

        var hours = Math.floor(difference / this.constants.hour);
        difference -= hours * this.constants.hour;

        var minutes = Math.floor(difference / this.constants.minute);
        difference -= minutes * this.constants.minute;

        var seconds = Math.floor(difference / this.constants.second);
        difference -= seconds * this.constants.second;

        /*
        var str =   this.padNumber(days)
                    +(c ? '.' : '.')+this.padNumber(hours)
                    +(c ? ':' : ' ')+this.padNumber(minutes)
                    +(c ? ':' : ' ')+this.padNumber(seconds);
        */
        var str =   this.padNumber(days)
                    +'.'+this.padNumber(hours)
                    +':'+this.padNumber(minutes)
                    +':'+this.padNumber(seconds);

        document.getElementById('remaining').textContent = str;
    };


    new Countdown();

    document.getElementById('banner').addEventListener('click', function() {
        window.location.href = 'https://www.decidethefuture.org';
    });

})(document, window);
