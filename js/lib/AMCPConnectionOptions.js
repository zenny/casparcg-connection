"use strict";
/**
 *
 */
var Options;
(function (Options) {
    /**
     *
     */
    (function (QueueMode) {
        QueueMode[QueueMode["SALVO"] = 1] = "SALVO";
        QueueMode[QueueMode["SEQUENTIAL"] = 2] = "SEQUENTIAL";
        QueueMode[QueueMode["SMART"] = 3] = "SMART";
    })(Options.QueueMode || (Options.QueueMode = {}));
    var QueueMode = Options.QueueMode;
})(Options = exports.Options || (exports.Options = {}));
/**
 *
 */
var ConnectionOptions = (function () {
    function ConnectionOptions(hostOrOptions, port) {
        this.host = "localhost";
        this.port = 5250;
        this.autoConnect = true;
        this.autoReconnect = true;
        this.autoReconnectInterval = 1000;
        this.autoReconnectAttempts = Infinity;
        this.queueMode = Options.QueueMode.SEQUENTIAL; // @todo: change to SALVO once server has command UIDs https://github.com/CasparCG/Server/issues/475
        this.debug = false;
        this.onLog = undefined;
        this.onConnectionStatus = undefined;
        this.onConnected = undefined;
        this.onDisconnected = undefined;
        this.onError = undefined;
        // if object
        if (hostOrOptions && typeof hostOrOptions === "object") {
            if (hostOrOptions.hasOwnProperty("host")) {
                var dnsValidation = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions["host"]);
                if (dnsValidation) {
                    delete hostOrOptions["host"];
                    // host
                    if (!!dnsValidation[1]) {
                        this.host = dnsValidation[1];
                    }
                    // port
                    if (!!dnsValidation[2]) {
                        this.port = parseInt(dnsValidation[2], 10);
                    }
                }
            }
            // @todo: object assign
            for (var key in hostOrOptions) {
                if (!hostOrOptions.hasOwnProperty(key)) {
                    continue;
                }
                if (this.hasOwnProperty(key)) {
                    this[key] = hostOrOptions[key];
                }
            }
            return;
        }
        // else
        if (typeof hostOrOptions === "string") {
            var dnsValidation = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions.toString());
            if (dnsValidation) {
                // host
                if (!!dnsValidation[1]) {
                    this.host = dnsValidation[1];
                }
                // port
                if (!!dnsValidation[2]) {
                    this.port = parseInt(dnsValidation[2], 10);
                }
            }
            if (port) {
                this.port = port;
            }
        }
    }
    return ConnectionOptions;
}());
exports.ConnectionOptions = ConnectionOptions;

//# sourceMappingURL=../maps/lib/AMCPConnectionOptions.js.map
