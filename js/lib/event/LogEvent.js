"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEvent_1 = require("./BaseEvent");
var Event;
(function (Event) {
    /**
     *
     */
    var LogEvent = (function (_super) {
        __extends(LogEvent, _super);
        /**
         *
         */
        function LogEvent(logString) {
            _super.call(this, { logString: logString });
            this.logString = logString;
        }
        /**
         *
         */
        LogEvent.prototype.valueOf = function () {
            return this.logString;
        };
        LogEvent.LOG = "logeventlog";
        return LogEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.LogEvent = LogEvent;
})(Event = exports.Event || (exports.Event = {}));

//# sourceMappingURL=../../maps/lib/event/LogEvent.js.map
