/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.

 Copyright (C) 2015 Fight for the Future

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/
(function (doc, win) {
    "use strict";


    function Countdown() {
        this.date = new Date(Date.UTC(2017, 12, 31, 15, 30, 0)).getTime();
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
        window.location.href = '#';
    });

})(document, window);

//# sourceMappingURL=core.js.map