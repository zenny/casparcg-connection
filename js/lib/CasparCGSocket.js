"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var net = require("net");
var _ = require("highland");
var hap_1 = require("hap");
var AMCP_1 = require("./AMCP");
// Command NS
var AbstractCommand_1 = require("./AbstractCommand");
var IAMCPStatus = AbstractCommand_1.Command.IAMCPStatus;
// Event NS
var Events_1 = require("./event/Events");
(function (SocketState) {
    SocketState[SocketState["unconfigured"] = 0] = "unconfigured";
    SocketState[SocketState["configured"] = 1] = "configured";
    SocketState[SocketState["hostFound"] = 2] = "hostFound";
    SocketState[SocketState["connectionAttempt"] = 4] = "connectionAttempt";
    SocketState[SocketState["connected"] = 8] = "connected";
    SocketState[SocketState["disconnected"] = 16] = "disconnected";
    SocketState[SocketState["lostConnection"] = 32] = "lostConnection";
    SocketState[SocketState["reconnecting"] = 64] = "reconnecting";
})(exports.SocketState || (exports.SocketState = {}));
var SocketState = exports.SocketState;
/**
 *
 */
var CasparCGSocket = (function (_super) {
    __extends(CasparCGSocket, _super);
    /**
     *
     */
    function CasparCGSocket(host, port, autoReconnect, autoReconnectInterval, autoReconnectAttempts) {
        var _this = this;
        _super.call(this);
        this._reconnectAttempt = 0;
        this._commandTimeout = 5000; // @todo make connectionOption!
        this._socketStatus = SocketState.unconfigured;
        this._host = host;
        this._port = port;
        this._reconnectDelay = autoReconnectInterval;
        this._autoReconnect = autoReconnect;
        this._reconnectAttempts = autoReconnectAttempts;
        this._client = new net.Socket();
        this._client.on("lookup", function () { return _this._onLookup(); });
        this._client.on("connect", function () { return _this._onConnected(); });
        this._client.on("error", function (error) { return _this._onError(error); });
        this._client.on("drain", function () { return _this._onDrain(); });
        this._client.on("close", function (hadError) { return _this._onClose(hadError); });
        _(this._client)["splitBy"](/(?=\r\n)/).errors(function (error) { return _this._onError(error); }).each(function (i) { return _this._parseResponseGroups(i); }); // @todo: ["splitBy] hack due to missing type
        this.socketStatus = SocketState.configured;
    }
    Object.defineProperty(CasparCGSocket.prototype, "autoReconnect", {
        /**
         *
         */
        set: function (autoReconnect) {
            this._autoReconnect = autoReconnect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "autoReconnectInterval", {
        /**
         *
         */
        set: function (autoReconnectInterval) {
            this._reconnectDelay = autoReconnectInterval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "autoReconnectAttempts", {
        /**
         *
         */
        set: function (autoReconnectAttempts) {
            this._reconnectAttempts = autoReconnectAttempts;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCGSocket.prototype.connect = function () {
        var _this = this;
        this.socketStatus |= SocketState.connectionAttempt; // toggles triedConnection on
        this.socketStatus &= ~SocketState.lostConnection; // toggles triedConnection on
        this._client.connect(this._port, this._host);
        if (this._reconnectAttempt === 0) {
            this._reconnectInterval = global.setInterval(function () { return _this._autoReconnection(); }, this._reconnectDelay);
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype.disconnect = function () {
        if (this._client !== undefined) {
            this.dispose();
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype._startReconnection = function () {
        var _this = this;
        // create interval if doesn't exist
        if (!this._reconnectInterval) {
            // @todo: create event telling reconection is in action with interval time
            this.socketStatus |= SocketState.reconnecting;
            this._reconnectInterval = global.setInterval(function () { return _this._autoReconnection(); }, this._reconnectDelay);
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype._autoReconnection = function () {
        if (this._autoReconnect) {
            if (this._reconnectAttempts > 0) {
                if ((this._reconnectAttempt >= this._reconnectAttempts)) {
                    // reset reconnection behaviour
                    this._clearReconnectInterval();
                    return;
                }
                // new attempt
                this.log("Socket attempting reconnection");
                this._reconnectAttempt++;
                this.connect();
            }
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype._clearReconnectInterval = function () {
        // @todo create event telling reconnection ended with result: true/false
        // only in reconnectio intervall is true
        this._reconnectAttempt = 0;
        global.clearInterval(this._reconnectInterval);
        this.socketStatus &= ~SocketState.reconnecting;
        delete this._reconnectInterval;
    };
    Object.defineProperty(CasparCGSocket.prototype, "host", {
        /**
         *
         */
        get: function () {
            if (this._client) {
                return this._host;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "port", {
        /**
         *
         */
        get: function () {
            if (this._client) {
                return this._port;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "socketStatus", {
        /**
         *
         */
        get: function () {
            return this._socketStatus;
        },
        /**
         *
         */
        set: function (statusMask) {
            if (this._socketStatus !== statusMask) {
                this._socketStatus = statusMask;
                this.fire(Events_1.CasparCGSocketStatusEvent.STATUS, new Events_1.CasparCGSocketStatusEvent(this._socketStatus));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCGSocket.prototype.dispose = function () {
        this._clearReconnectInterval();
        this._client.destroy();
    };
    /**
     *
     */
    CasparCGSocket.prototype.log = function (args) {
        // fallback, this method will be remapped to CasparCG.log by CasparCG on instantiation of socket oject
        console.log(args);
    };
    Object.defineProperty(CasparCGSocket.prototype, "connected", {
        /**
         */
        set: function (connected) {
            this.socketStatus = connected ? this.socketStatus | SocketState.connected : this.socketStatus &= ~SocketState.connected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCGSocket.prototype.executeCommand = function (command) {
        var _this = this;
        var commandString = command.constructor["commandString"] + (command.address ? " " + command.address : "");
        for (var i in command.payload) {
            var payload = command.payload[i];
            commandString += (commandString.length > 0 ? " " : "");
            commandString += (payload.key ? payload.key + " " : "") + payload.value;
        }
        this._commandTimeoutTimer = global.setTimeout(function () { return _this._onTimeout(); }, this._commandTimeout);
        this._client.write(commandString + "\r\n");
        command.status = IAMCPStatus.Sent;
        this.log(commandString);
        return command;
    };
    /**
     *
     */
    CasparCGSocket.prototype._onTimeout = function () {
        global.clearTimeout(this._commandTimeoutTimer);
        this.fire(Events_1.CasparCGSocketStatusEvent.TIMEOUT, new Events_1.CasparCGSocketStatusEvent(this.socketStatus));
    };
    /**
     * @todo:::
     */
    CasparCGSocket.prototype._onLookup = function () {
        this.log("Socket event lookup");
    };
    /**
     *
     */
    CasparCGSocket.prototype._onConnected = function () {
        this._clearReconnectInterval();
        this.connected = true;
    };
    /**
     *
     */
    CasparCGSocket.prototype._parseResponseGroups = function (i) {
        global.clearTimeout(this._commandTimeoutTimer);
        i = (i.length > 2 && i.slice(0, 2) === "\r\n") ? i.slice(2) : i;
        if (AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 200) {
            this._parsedResponse = new AMCP_1.AMCPUtil.CasparCGSocketResponse(i);
            return;
        }
        else if (this._parsedResponse && this._parsedResponse.statusCode === 200) {
            if (i !== "\r\n") {
                this._parsedResponse.items.push(i);
                return;
            }
            else {
                this.fire(Events_1.CasparCGSocketResponseEvent.RESPONSE, new Events_1.CasparCGSocketResponseEvent(this._parsedResponse));
                this._parsedResponse = null;
                return;
            }
        }
        if (AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 201 || AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 400 || AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 101) {
            this._parsedResponse = new AMCP_1.AMCPUtil.CasparCGSocketResponse(i);
            return;
        }
        else if (this._parsedResponse && this._parsedResponse.statusCode === 201 || this._parsedResponse && this._parsedResponse.statusCode === 400 || this._parsedResponse && this._parsedResponse.statusCode === 101) {
            this._parsedResponse.items.push(i);
            this.fire(Events_1.CasparCGSocketResponseEvent.RESPONSE, new Events_1.CasparCGSocketResponseEvent(this._parsedResponse));
            this._parsedResponse = null;
            return;
        }
        else {
            this.fire(Events_1.CasparCGSocketResponseEvent.RESPONSE, new Events_1.CasparCGSocketResponseEvent(new AMCP_1.AMCPUtil.CasparCGSocketResponse(i)));
            return;
        }
    };
    /**
     * @todo:::
     */
    CasparCGSocket.prototype._onError = function (error) {
        // dispatch error!!!!!
        this.log("Socket event error: " + error.message);
    };
    /**
     * @todo:::
     */
    CasparCGSocket.prototype._onDrain = function () {
        // @todo: implement
        this.log("Socket event drain");
    };
    /**
     *
     */
    CasparCGSocket.prototype._onClose = function (hadError) {
        this.connected = false;
        if (hadError) {
            this.socketStatus |= SocketState.lostConnection;
            // error message, not "log"
            // dispatch (is it done through error handler first????)
            this.log("Socket close with error: " + hadError);
            if (this._autoReconnect) {
                this._startReconnection();
            }
        }
        else {
            this._clearReconnectInterval();
        }
    };
    return CasparCGSocket;
}(hap_1.EventEmitter));
exports.CasparCGSocket = CasparCGSocket;

//# sourceMappingURL=../maps/lib/CasparCGSocket.js.map
