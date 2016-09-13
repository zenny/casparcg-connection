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
    var CasparCGSocketCommandEvent = (function (_super) {
        __extends(CasparCGSocketCommandEvent, _super);
        /**
         *
         */
        function CasparCGSocketCommandEvent(command) {
            _super.call(this, { command: command });
            this.command = command;
        }
        /**
         *
         */
        CasparCGSocketCommandEvent.prototype.valueOf = function () {
            return this.command;
        };
        CasparCGSocketCommandEvent.RESPONSE = "casparcgsocketcommandeventresponse";
        return CasparCGSocketCommandEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.CasparCGSocketCommandEvent = CasparCGSocketCommandEvent;
    /**
     *
     */
    var CasparCGSocketResponseEvent = (function (_super) {
        __extends(CasparCGSocketResponseEvent, _super);
        /**
         *
         */
        function CasparCGSocketResponseEvent(response) {
            _super.call(this, { response: response });
            this.response = response;
        }
        /**
         *
         */
        CasparCGSocketResponseEvent.prototype.valueOf = function () {
            return this.response;
        };
        CasparCGSocketResponseEvent.RESPONSE = "casparcgsocketresponseeventresponse";
        return CasparCGSocketResponseEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.CasparCGSocketResponseEvent = CasparCGSocketResponseEvent;
})(Event = exports.Event || (exports.Event = {}));

//# sourceMappingURL=../../maps/lib/event/CasparCGSocketCommandEvent.js.map
