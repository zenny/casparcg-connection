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
    var CasparCGSocketStatusEvent = (function (_super) {
        __extends(CasparCGSocketStatusEvent, _super);
        /**
         *
         */
        function CasparCGSocketStatusEvent(socketStatus) {
            _super.call(this, { socketStatus: socketStatus });
            this.socketStatus = socketStatus;
        }
        /**
         *
         */
        CasparCGSocketStatusEvent.prototype.valueOf = function () {
            return this.socketStatus;
        };
        CasparCGSocketStatusEvent.STATUS = "casparcgsocketconnectioneventstatus";
        CasparCGSocketStatusEvent.STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
        CasparCGSocketStatusEvent.CONNECTED = "casparcgsocketconnectioneventstatusconnected";
        CasparCGSocketStatusEvent.DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
        return CasparCGSocketStatusEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.CasparCGSocketStatusEvent = CasparCGSocketStatusEvent;
})(Event = exports.Event || (exports.Event = {}));

//# sourceMappingURL=../../maps/lib/event/CasparCGSocketStatusEvent.js.map
