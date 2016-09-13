"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hap_1 = require("hap");
var Event;
(function (Event) {
    /**
     *
     */
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        /**
         *
         */
        function BaseEvent(params) {
            _super.call(this, params);
            this.val(params);
        }
        Object.defineProperty(BaseEvent.prototype, "value", {
            /**
             *
             */
            get: function () {
                return this.valueOf();
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         */
        BaseEvent.prototype.valueOf = function () {
            return this.val();
        };
        return BaseEvent;
    }(hap_1.EventFacade));
    Event.BaseEvent = BaseEvent;
})(Event = exports.Event || (exports.Event = {}));

//# sourceMappingURL=../../maps/lib/event/BaseEvent.js.map
