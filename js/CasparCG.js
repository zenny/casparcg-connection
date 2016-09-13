"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hap_1 = require("hap");
var CasparCGSocket_1 = require("./lib/CasparCGSocket");
var AMCP_1 = require("./lib/AMCP");
var ServerStateEnum_1 = require("./lib/ServerStateEnum");
var AMCPConnectionOptions_1 = require("./lib/AMCPConnectionOptions");
// Options NS
var QueueMode = AMCPConnectionOptions_1.Options.QueueMode;
// Command NS
var AbstractCommand_1 = require("./lib/AbstractCommand");
var isIAMCPCommand = AbstractCommand_1.Command.isIAMCPCommand;
var IAMCPStatus = AbstractCommand_1.Command.IAMCPStatus;
var AMCPResponse = AbstractCommand_1.Command.AMCPResponse;
// Event NS
var Events_1 = require("./lib/event/Events");
/**
 * The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 * It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 *
 * There is a single [[CasparCGSocket]] pr. `CasparCG` object.
 * `CasparCG` should be the only public interface to interact directly with.
 */
var CasparCG = (function (_super) {
    __extends(CasparCG, _super);
    function CasparCG(hostOrOptions, port) {
        _super.call(this);
        this._queuedCommands = new Array();
        this._sentCommands = new Array();
        /**
         * Try to connect upon creation.
         */
        this.autoConnect = undefined;
        /**b
         * @todo: document
         */
        this.queueMode = undefined;
        /**
         * Setting this to true will print out logging to the `Console`, in addition to the optinal [[onLog]] and [[LogEvent.LOG]].
         */
        this.debug = undefined;
        /**
         * Callback for all logging.
         */
        this.onLog = undefined;
        /**
         * Callback for all status updates from the `CasparCGSocket`.
         */
        this.onConnectionStatus = undefined;
        /**
         * Callback for status updates from the `CasparCGSocket` if the `connected` property changes value.
         */
        this.onConnectionChanged = undefined;
        /**
         * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `true`.
         */
        this.onConnected = undefined;
        /**
         * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `false`.
         */
        this.onDisconnected = undefined;
        /**
         * Callback for general errors
         */
        this.onError = undefined;
        var options = new AMCPConnectionOptions_1.ConnectionOptions(hostOrOptions, port);
        // if both options and port specified, port overrides options
        if (port && (port !== options.port)) {
            options.port = port;
        }
        this._createNewSocket(options);
        if (this.autoConnect) {
            this.connect();
        }
    }
    /**
     *
     */
    CasparCG.prototype._createNewSocket = function (options, enforceRecreation) {
        var _this = this;
        if (enforceRecreation === void 0) { enforceRecreation = false; }
        var hasNewOptions = false;
        for (var key in options) {
            // @todo: object.assign
            if (!options.hasOwnProperty(key)) {
                continue;
            }
            if (this.hasOwnProperty(key) || CasparCG.prototype.hasOwnProperty(key)) {
                // only update new options
                if (this[key] !== options[key]) {
                    this[key] = options[key];
                    hasNewOptions = true;
                }
            }
        }
        // dont recreate if exising socket, same options + host + port
        if (this._socket && (this._socket.host !== this.host)) {
            hasNewOptions = true;
        }
        if (this._socket && (this._socket.port !== this.port)) {
            hasNewOptions = true;
        }
        if (this._socket && !hasNewOptions && !enforceRecreation) {
            return;
        }
        // clean up if existing socket
        if (this._socket) {
            this._socket.dispose();
            delete this._socket;
        }
        this._socket = new CasparCGSocket_1.CasparCGSocket(this.host, this.port, this.autoReconnect, this.autoReconnectInterval, this.autoReconnectAttempts);
        this.setParent(this._socket);
        this._socket.on("error", function (error) { return _this._onSocketError(error); });
        this.on(Events_1.CasparCGSocketStatusEvent.STATUS, function (event) { return _this._onSocketStatusChange(event); });
        this.on(Events_1.CasparCGSocketResponseEvent.RESPONSE, function (event) { return _this._handleSocketResponse(event.response); });
        // inherit log method
        this._socket.log = function (args) { return _this._log(args); };
    };
    /**
     * Creates a new [[CasparCGSocket]] and connects.
     *
     * @param options	Setting new [[ICasparCGConnection]] properties will override each individual property allready defined on the `CasparCG` object. Existing properties not overwritten by this `options` object will remain.
     */
    CasparCG.prototype.connect = function (options) {
        // recreate socket if new options
        if (options) {
            this._createNewSocket(options);
        }
        if (this._socket) {
            this._socket.connect();
        }
    };
    /**
     * Disconnects and disposes the [[CasparCGSocket]] connection.
     */
    CasparCG.prototype.disconnect = function () {
        if (this._socket) {
            this._socket.disconnect();
        }
    };
    Object.defineProperty(CasparCG.prototype, "host", {
        /**
         *
         */
        get: function () {
            return this._host;
        },
        /**
         * Setting the `host` will create a new [[CasparCGSocket]] connection.
         *
         * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
         */
        set: function (host) {
            if (this._host !== host) {
                this._host = host;
                if (this._socket != null) {
                    var shouldReconnect = (this.connected || ((this._socket.socketStatus & CasparCGSocket_1.SocketState.reconnecting) === CasparCGSocket_1.SocketState.reconnecting));
                    this._createNewSocket();
                    if (shouldReconnect) {
                        this.connect();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "port", {
        /**
         *
         */
        get: function () {
            return this._port;
        },
        /**
         * Setting the `port` will create a new [[CasparCGSocket]] connection.
         *
         * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
         */
        set: function (port) {
            if (this._port !== port) {
                this._port = port;
                if (this._socket != null) {
                    var shouldReconnect = (this.connected || ((this._socket.socketStatus & CasparCGSocket_1.SocketState.reconnecting) === CasparCGSocket_1.SocketState.reconnecting));
                    this._createNewSocket();
                    if (shouldReconnect) {
                        this.connect();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "autoReconnect", {
        /**
         * Try to reconnect in case of unintentionally loss of connection, or in case of failed connection in the first place.
         */
        get: function () {
            return this._autoReconnect;
        },
        /**
         *
         */
        set: function (autoReconnect) {
            this._autoReconnect = autoReconnect;
            if (this._socket) {
                this._socket.autoReconnect = this._autoReconnect;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "autoReconnectInterval", {
        /**
         * Timeout in milliseconds between each connection attempt during reconnection.
         */
        get: function () {
            return this._autoReconnectInterval;
        },
        /**
         *
         */
        set: function (autoReconnectInterval) {
            this._autoReconnectInterval = autoReconnectInterval;
            if (this._socket) {
                this._socket.autoReconnectInterval = this._autoReconnectInterval;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "autoReconnectAttempts", {
        /**
         * Max number of attempts of connection during reconnection. This value resets once the reconnection is over (either in case of successfully reconnecting, changed connection properties such as `host` or `port` or by being manually cancelled).
         */
        get: function () {
            return this._autoReconnectAttempts;
        },
        /**
         *
         */
        set: function (autoReconnectAttempts) {
            this._autoReconnectAttempts = autoReconnectAttempts;
            if (this._socket) {
                this._socket.autoReconnectAttempts = this._autoReconnectAttempts;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "connectionOptions", {
        /**
         *
         */
        get: function () {
            var options = new AMCPConnectionOptions_1.ConnectionOptions();
            for (var key in options) {
                if (this.hasOwnProperty(key) || CasparCG.prototype.hasOwnProperty(key)) {
                    options[key] = this[key];
                }
            }
            return options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "connected", {
        /**
         *
         */
        get: function () {
            return this._connected || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCG.prototype, "connectionStatus", {
        /**
         *
         */
        get: function () {
            return this._socket.socketStatus;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCG.prototype._onSocketStatusChange = function (socketStatus) {
        var connected = (socketStatus.valueOf() & CasparCGSocket_1.SocketState.connected) === CasparCGSocket_1.SocketState.connected;
        if (this.onConnectionStatus) {
            this.onConnectionStatus(socketStatus.valueOf());
        }
        if (connected !== this._connected) {
            this._connected = connected;
            this.fire(Events_1.CasparCGSocketStatusEvent.STATUS_CHANGED, socketStatus);
            if (this.onConnectionChanged) {
                this.onConnectionChanged(this._connected);
            }
            if (this._connected) {
                this.fire(Events_1.CasparCGSocketStatusEvent.CONNECTED, socketStatus);
                if (this.onConnected) {
                    this.onConnected(this._connected);
                }
                this._expediteCommand();
            }
            if (!this._connected) {
                this.fire(Events_1.CasparCGSocketStatusEvent.DISCONNECTED, socketStatus);
                if (this.onDisconnected) {
                    this.onDisconnected(this._connected);
                }
            }
        }
    };
    Object.defineProperty(CasparCG.prototype, "commandQueue", {
        /**
         *
         */
        get: function () {
            return this._queuedCommands;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCG.prototype._onSocketError = function (error) {
        this._log(error);
    };
    /**
     *
     */
    CasparCG.prototype._log = function (args) {
        if (args instanceof Error) {
            console.error(args);
            if (this.onError) {
                this.onError(args);
                // re-emit error if there's any listener
                if (this.listenerCount("error") > 0) {
                    this.fire("error", args);
                }
                return;
            }
        }
        if (this.debug) {
            console.log(args);
        }
        if (this.onLog) {
            this.onLog(args);
        }
        this.fire(Events_1.LogEvent.LOG, new Events_1.LogEvent(args));
    };
    CasparCG.prototype.do = function (commandOrString) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var command;
        if (isIAMCPCommand(commandOrString)) {
            command = commandOrString;
        }
        else if (typeof commandOrString === "string") {
            if (AMCP_1.AMCP.hasOwnProperty(commandOrString)) {
                // @todo: typechecking with fallback
                command = Object.create(AMCP_1.AMCP[commandOrString]["prototype"]);
                // @todo: typechecking with fallback
                command.constructor.apply(command, params);
            }
        }
        else {
            // @todo: Handle, return?
            throw new Error("Invalid command or commandstring");
        }
        // validate command and params
        if (!command.validateParams()) {
            // handle error, return??
            return null;
        }
        return this._addQueuedCommand(command);
    };
    /**
     *
     */
    CasparCG.prototype._addQueuedCommand = function (command) {
        this._queuedCommands.push(command);
        command.status = IAMCPStatus.Queued;
        this._expediteCommand();
        return command;
    };
    /**
     * @todo: document
     */
    CasparCG.prototype.removeQueuedCommand = function (id) {
        var removed;
        for (var i = 0; i < this._queuedCommands.length; i++) {
            var o = this._queuedCommands[i];
            if (o.id === id) {
                removed = this._queuedCommands.splice(i, 1);
                break;
            }
        }
        return typeof Object.prototype.toString.call(removed) === "[object Array]" && removed.length > 0;
    };
    /**
     *
     */
    CasparCG.prototype._handleSocketResponse = function (socketResponse) {
        /*100 [action] - Information about an event.
        101 [action] - Information about an event. A line of data is being returned.
        200 [command] OK	- The command has been executed and several lines of data (seperated by \r\n) are being returned (terminated with an additional \r\n)
        201 [command] OK	- The command has been executed and data (terminated by \r\n) is being returned.
        202 [command] OK	- The command has been executed.
        400 ERROR	- Command not understood
        401 [command] ERROR	- Illegal video_channel
        402 [command] ERROR	- Parameter missing
        403 [command] ERROR	- Illegal parameter
        404 [command] ERROR	- Media file not found*/
        var currentCommand = this._sentCommands.shift();
        if (!(currentCommand.response instanceof AMCPResponse)) {
            currentCommand.response = new AMCPResponse();
        }
        // valid?
        // fail?
        if (socketResponse.statusCode >= 400 && socketResponse.statusCode <= 599) {
            currentCommand.response.raw = socketResponse.responseString;
            currentCommand.response.code = socketResponse.statusCode;
            currentCommand.status = IAMCPStatus.Failed;
        }
        // success?
        if (socketResponse.statusCode > 0 && socketResponse.statusCode < 400) {
            // valid success???
            currentCommand.response.raw = socketResponse.responseString;
            currentCommand.response.code = socketResponse.statusCode;
            currentCommand.status = IAMCPStatus.Suceeded;
        }
        this.fire(Events_1.CasparCGSocketCommandEvent.RESPONSE, new Events_1.CasparCGSocketCommandEvent(currentCommand));
        this._expediteCommand();
    };
    /**
     *
     */
    CasparCG.prototype._expediteCommand = function () {
        if (this.connected) {
            // @todo add TTL for cleanup on stuck commands
            // salvo mode
            if (this.queueMode === QueueMode.SALVO) {
                if (this._queuedCommands.length > 0) {
                    var nextCommand = this._queuedCommands.shift();
                    this._sentCommands.push(nextCommand);
                    this._socket.executeCommand(nextCommand);
                }
            }
            // sequential mode
            if (this.queueMode === QueueMode.SEQUENTIAL) {
                if (this._queuedCommands.length > 0 && this._sentCommands.length === 0) {
                    var nextCommand = this._queuedCommands.shift();
                    this._sentCommands.push(nextCommand);
                    this._socket.executeCommand(nextCommand);
                }
            }
        }
    };
    ///*********************////
    ///***		API		****////
    ///*********************///
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    CasparCG.prototype.loadbg = function (channel, layer, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter, auto) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.LoadbgCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    CasparCG.prototype.load = function (channel, layer, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter, auto) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.LoadCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto }));
    };
    CasparCG.prototype.play = function (channel, layer, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter, auto) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.PlayCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PAUSE>
     */
    CasparCG.prototype.pause = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.PauseCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESUME>
     */
    CasparCG.prototype.resume = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.ResumeCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#STOP>
     */
    CasparCG.prototype.stop = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.StopCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_ADD>
     */
    CasparCG.prototype.cgAdd = function (channel, layer, flashLayer, templateName, playOnLoad, data) {
        if (layer === void 0) { layer = undefined; }
        if (flashLayer === void 0) { flashLayer = undefined; }
        return this.do(new AMCP_1.AMCP.CGAddCommand({ channel: channel, layer: layer, flashLayer: flashLayer, templateName: templateName, playOnLoad: playOnLoad, data: data }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_PLAY>
     */
    CasparCG.prototype.cgPlay = function (channel, layer, flashLayer) {
        return this.do(new AMCP_1.AMCP.CGPlayCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_STOP>
     */
    CasparCG.prototype.cgStop = function (channel, layer, flashLayer) {
        return this.do(new AMCP_1.AMCP.CGStopCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_NEXT>
     */
    CasparCG.prototype.cgNext = function (channel, layer, flashLayer) {
        return this.do(new AMCP_1.AMCP.CGNextCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_REMOVE>
     */
    CasparCG.prototype.cgRemove = function (channel, layer, flashLayer) {
        return this.do(new AMCP_1.AMCP.CGRemoveCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_CLEAR>
     */
    CasparCG.prototype.cgClear = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.CGClearCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_UPDATE>
     */
    CasparCG.prototype.cgUpdate = function (channel, layer, flashLayer, data) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.CGUpdateCommand({ channel: channel, layer: layer, flashLayer: flashLayer, data: data }));
    };
    /*
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INVOKE
     */
    CasparCG.prototype.cgInvoke = function (channel, layer, flashLayer, method) {
        return this.do(new AMCP_1.AMCP.CGRemoveCommand({ channel: channel, layer: layer, flashLayer: flashLayer, method: method }));
    };
    CasparCG.prototype.mixerKeyer = function (channel, layer, state, defer) {
        return this.do(new AMCP_1.AMCP.MixerKeyerCommand({ channel: channel, layer: layer, keyer: state, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    CasparCG.prototype.mixerKeyerDeferred = function (channel, layer, state) {
        return this.mixerKeyer(channel, layer, state, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    CasparCG.prototype.getMixerStatusKeyer = function (channel, layer) {
        return this.mixerKeyer(channel, layer);
    };
    CasparCG.prototype.mixerChroma = function (channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = 0; }
        return this.do(new AMCP_1.AMCP.MixerChromaCommand({ channel: channel, layer: layer, keyer: keyer, threshold: threshold, softness: softness, spill: spill, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    CasparCG.prototype.mixerChromaDeferred = function (channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = 0; }
        return this.mixerChroma(channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    CasparCG.prototype.getMixerStatusChroma = function (channel, layer) {
        return this.mixerChroma(channel, layer);
    };
    CasparCG.prototype.mixerBlend = function (channel, layer, blendmode, defer) {
        return this.do(new AMCP_1.AMCP.MixerBlendCommand({ channel: channel, layer: layer, blendmode: blendmode, defer: defer }));
    };
    CasparCG.prototype.mixerBlendDeferred = function (channel, layer, blendmode) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerBlend(channel, layer, blendmode, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    CasparCG.prototype.getMixerStatusBlend = function (channel, layer) {
        return this.mixerBlend(channel, layer);
    };
    CasparCG.prototype.mixerOpacity = function (channel, layer, opacity, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerOpacityCommand({ channel: channel, layer: layer, opacity: opacity, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    CasparCG.prototype.mixerOpacityDeferred = function (channel, layer, opacity, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerOpacity(channel, layer, opacity, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    CasparCG.prototype.getMixerStatusOpacity = function (channel, layer) {
        return this.mixerOpacity(channel, layer);
    };
    CasparCG.prototype.mixerBrightness = function (channel, layer, brightness, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerBrightnessCommand({ channel: channel, layer: layer, brightness: brightness, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    CasparCG.prototype.mixerBrightnessDeferred = function (channel, layer, brightness, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerBrightness(channel, layer, brightness, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    CasparCG.prototype.getMixerStatusBrightness = function (channel, layer) {
        return this.mixerBrightness(channel, layer);
    };
    CasparCG.prototype.mixerSaturation = function (channel, layer, saturation, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerSaturationCommand({ channel: channel, layer: layer, saturation: saturation, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    CasparCG.prototype.mixerSaturationDeferred = function (channel, layer, saturation, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerSaturation(channel, layer, saturation, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    CasparCG.prototype.getMixerStatusSaturation = function (channel, layer) {
        return this.mixerSaturation(channel, layer);
    };
    CasparCG.prototype.mixerContrast = function (channel, layer, contrast, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerContrastCommand({ channel: channel, layer: layer, contrast: contrast, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    CasparCG.prototype.mixerContrastDeferred = function (channel, layer, contrast, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerContrast(channel, layer, contrast, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    CasparCG.prototype.getMixerStatusContrast = function (channel, layer) {
        return this.mixerContrast(channel, layer);
    };
    CasparCG.prototype.mixerLevels = function (channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.MixerLevelsCommand({ channel: channel, layer: layer, minInput: minInput, maxInput: maxInput, gamma: gamma, minOutput: minOutput, maxOutput: maxOutput, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    CasparCG.prototype.mixerLevelsDeferred = function (channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerLevels(channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    CasparCG.prototype.getMixerStatusLevels = function (channel, layer) {
        return this.mixerLevels(channel, layer);
    };
    CasparCG.prototype.mixerFill = function (channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.MixerFillCommand({ channel: channel, layer: layer, x: x, y: y, xScale: xScale, yScale: yScale, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /*
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    CasparCG.prototype.mixerFillDeferred = function (channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerFill(channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    CasparCG.prototype.getMixerStatusFill = function (channel, layer) {
        return this.mixerFill(channel, layer);
    };
    CasparCG.prototype.mixerClip = function (channel, layer, x, y, width, height, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.MixerClipCommand({ channel: channel, layer: layer, x: x, y: y, width: width, height: height, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    CasparCG.prototype.mixerClipDeferred = function (channel, layer, x, y, width, height, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerClip(channel, layer, x, y, width, height, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    CasparCG.prototype.getMixerStatusClip = function (channel, layer) {
        return this.mixerClip(channel, layer);
    };
    CasparCG.prototype.mixerAnchor = function (channel, layer, x, y, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.MixerAnchorCommand({ channel: channel, layer: layer, x: x, y: y, ransition: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    CasparCG.prototype.mixerAnchorDeferred = function (channel, layer, x, y, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerAnchor(channel, layer, x, y, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    CasparCG.prototype.getMixerStatusAnchor = function (channel, layer) {
        return this.mixerAnchor(channel, layer);
    };
    CasparCG.prototype.mixerCrop = function (channel, layer, left, top, right, bottom, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.MixerCropCommand({ channel: channel, layer: layer, left: left, top: top, right: right, bottom: bottom, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    CasparCG.prototype.mixerCropDeferred = function (channel, layer, left, top, right, bottom, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerCrop(channel, layer, left, top, right, bottom, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    CasparCG.prototype.getMixerStatusCrop = function (channel, layer) {
        return this.mixerCrop(channel, layer);
    };
    CasparCG.prototype.mixerRotation = function (channel, layer, rotation, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerRotationCommand({ channel: channel, layer: layer, rotation: rotation, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    CasparCG.prototype.mixerRotationDeferred = function (channel, layer, rotation, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerRotation(channel, layer, rotation, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    CasparCG.prototype.getMixerStatusRotation = function (channel, layer) {
        return this.mixerRotation(channel, layer);
    };
    CasparCG.prototype.mixerPerspective = function (channel, layer, topLeftX, topLeftY, topRightx, topRightY, bottomRightX, bottomRightY, bottmLeftX, bottomLeftY, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.do(new AMCP_1.AMCP.MixerPerspectiveCommand({ channel: channel, layer: layer, topLeftX: topLeftX, topLeftY: topLeftY, topRightx: topRightx, topRightY: topRightY, bottomRightX: bottomRightX, bottomRightY: bottomRightY, bottmLeftX: bottmLeftX, bottomLeftY: bottomLeftY, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    CasparCG.prototype.mixerPerspectiveDeferred = function (channel, layer, topLeftX, topLeftY, topRightx, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, defer) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerPerspective(channel, layer, topLeftX, topLeftY, topRightx, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    CasparCG.prototype.getMixerStatusPerspective = function (channel, layer) {
        return this.mixerPerspective(channel, layer);
    };
    CasparCG.prototype.mixerMipmap = function (channel, layer, state, defer) {
        return this.do(new AMCP_1.AMCP.MixerMipmapCommand({ channel: channel, layer: layer, keyer: state, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    CasparCG.prototype.mixerMipmapDeferred = function (channel, layer, state) {
        return this.mixerMipmap(channel, layer, state, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    CasparCG.prototype.getMixerStatusMipmap = function (channel, layer) {
        return this.mixerMipmap(channel, layer);
    };
    CasparCG.prototype.mixerVolume = function (channel, layer, volume, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerVolumeCommand({ channel: channel, layer: layer, volume: volume, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    CasparCG.prototype.mixerVolumeDeferred = function (channel, layer, volume, transitionDuration, transitionEasing) {
        if (layer === void 0) { layer = undefined; }
        return this.mixerVolume(channel, layer, volume, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    CasparCG.prototype.getMixerStatusVolume = function (channel, layer) {
        return this.mixerVolume(channel, layer);
    };
    CasparCG.prototype.mixerMastervolume = function (channel, mastervolume, defer) {
        return this.do(new AMCP_1.AMCP.MixerMastervolumeCommand({ channel: channel, mastervolume: mastervolume, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    CasparCG.prototype.mixerMastervolumeDeferred = function (channel, mastervolume) {
        return this.mixerMastervolume(channel, mastervolume, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    CasparCG.prototype.getMixerStatusMastervolume = function (channel) {
        return this.mixerMastervolume(channel);
    };
    CasparCG.prototype.mixerStraightAlphaOutput = function (channel, layer, state, defer) {
        return this.do(new AMCP_1.AMCP.MixerKeyerCommand({ channel: channel, layer: layer, keyer: state, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    CasparCG.prototype.mixerStraightAlphaOutputDeferred = function (channel, layer, state) {
        return this.mixerStraightAlphaOutput(channel, layer, state, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    CasparCG.prototype.getMixerStatusStraightAlphaOutput = function (channel, layer) {
        return this.mixerStraightAlphaOutput(channel, layer);
    };
    CasparCG.prototype.mixerGrid = function (channel, resolution, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP_1.AMCP.MixerGridCommand({ channel: channel, resolution: resolution, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
     */
    CasparCG.prototype.mixerGridDeferred = function (channel, resolution, transitionDuration, transitionEasing) {
        return this.mixerGrid(channel, resolution, transitionDuration, transitionEasing, true);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_COMMIT>
     */
    CasparCG.prototype.mixerCommit = function (channel) {
        return this.do(new AMCP_1.AMCP.MixerCommitCommand({ channel: channel }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLEAR>
     */
    CasparCG.prototype.mixerClear = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.MixerClearCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLEAR>
     */
    CasparCG.prototype.clear = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.ClearCommand({ channel: channel, layer: layer }));
    };
    /**
     * @todo	implement
     * @todo	document
     */
    CasparCG.prototype.call = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.CallCommand({ channel: channel, layer: layer }));
    };
    /**
     * @todo	implement
     * @todo	document
     */
    CasparCG.prototype.swap = function () {
        // @todo: overloading of origin/destination pairs
        return this.do(new AMCP_1.AMCP.SwapCommand());
    };
    /**
     * @todo	implement
     * @todo	document
     */
    CasparCG.prototype.add = function (channel) {
        // remember index /layer
        // i suggest duplicating abstractchannelorlayer to avoid problems if the address logic changes for layers and not indicies
        // consumer factoruies parses "consumer"-string parameter
        return this.do(new AMCP_1.AMCP.AddCommand({ channel: channel }));
    };
    /**
     * @todo	implement
     * @todo	document
     */
    CasparCG.prototype.remove = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.RemoveCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PRINT>
     */
    CasparCG.prototype.print = function (channel) {
        return this.do(new AMCP_1.AMCP.PrintCommand({ channel: channel }));
    };
    /**
     * @todo	implement
     * @todo	document
     */
    CasparCG.prototype.set = function (channel) {
        // @todo:  param enum (only MODE and CHANNEL_LAYOUT for now)
        // @todo: switchable second parameter based on what to set:
        // mode = enum modes.......
        // layer = enum layouts..........
        return this.do(new AMCP_1.AMCP.SetCommand({ channel: channel }));
    };
    CasparCG.prototype.lock = function (channel, action, lockPhrase) {
        return this.do(new AMCP_1.AMCP.LockCommand({ channel: channel, action: action, phrase: lockPhrase }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CHANNEL_GRID>
     */
    CasparCG.prototype.channelGrid = function () {
        return this.do(new AMCP_1.AMCP.ChannelGridCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_GC>
     */
    CasparCG.prototype.glGC = function () {
        return this.do(new AMCP_1.AMCP.GlGCCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_STORE>
     */
    CasparCG.prototype.dataStore = function (fileName, data) {
        return this.do(new AMCP_1.AMCP.DataStoreCommand({ fileName: fileName, data: data }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_RETRIEVE>
     */
    CasparCG.prototype.dataRetrieve = function (fileName) {
        return this.do(new AMCP_1.AMCP.DataRetrieveCommand({ fileName: fileName }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_LIST>
     */
    CasparCG.prototype.dataList = function () {
        return this.do(new AMCP_1.AMCP.DataListCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_REMOVE>
     */
    CasparCG.prototype.dataRemove = function (fileName) {
        return this.do(new AMCP_1.AMCP.DataRemoveCommand({ fileName: fileName }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_LIST>
     */
    CasparCG.prototype.thumbnailList = function () {
        return this.do(new AMCP_1.AMCP.ThumbnailListCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_RETRIEVE>
     */
    CasparCG.prototype.thumbnailRetrieve = function (fileName) {
        return this.do(new AMCP_1.AMCP.ThumbnailRetrieveCommand({ fileName: fileName }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE>
     */
    CasparCG.prototype.thumbnailGenerate = function (fileName) {
        return this.do(new AMCP_1.AMCP.ThumbnailGenerateCommand({ fileName: fileName }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE_ALL>
     */
    CasparCG.prototype.thumbnailGenerateAll = function () {
        return this.do(new AMCP_1.AMCP.ThumbnailGenerateAllCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CINF>
     */
    CasparCG.prototype.cinf = function (fileName) {
        return this.do(new AMCP_1.AMCP.CinfCommand({ fileName: fileName }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLS>
     */
    CasparCG.prototype.cls = function () {
        return this.do(new AMCP_1.AMCP.ClsCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#FLS>
     */
    CasparCG.prototype.fls = function () {
        return this.do(new AMCP_1.AMCP.FlsCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#TLS>
     */
    CasparCG.prototype.tls = function () {
        return this.do(new AMCP_1.AMCP.TlsCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#VERSION>
     */
    CasparCG.prototype.version = function (component) {
        return this.do(new AMCP_1.AMCP.VersionCommand({ component: component }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO>
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_2>
     */
    CasparCG.prototype.info = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.InfoCommand({ channel: channel, layer: layer }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_TEMPLATE>
     */
    CasparCG.prototype.infoTemplate = function (template) {
        return this.do(new AMCP_1.AMCP.InfoTemplateCommand({ template: template }));
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_CONFIG>
     */
    CasparCG.prototype.infoConfig = function () {
        return this.do(new AMCP_1.AMCP.InfoConfigCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_PATHS>
     */
    CasparCG.prototype.infoPaths = function () {
        return this.do(new AMCP_1.AMCP.InfoPathsCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SYSTEM>
     */
    CasparCG.prototype.infoSystem = function () {
        return this.do(new AMCP_1.AMCP.InfoSystemCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SERVER>
     */
    CasparCG.prototype.infoServer = function () {
        return this.do(new AMCP_1.AMCP.InfoServerCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_QUEUES>
     */
    CasparCG.prototype.infoQueues = function () {
        return this.do(new AMCP_1.AMCP.InfoQueuesCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_THREADS>
     */
    CasparCG.prototype.infoThreads = function () {
        return this.do(new AMCP_1.AMCP.InfoThreadsCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_DELAY>
     */
    CasparCG.prototype.infoDelay = function (channel, layer) {
        return this.do(new AMCP_1.AMCP.InfoDelayCommand({ channel: channel, layer: layer }));
    };
    /**
     * Retrieves information about a running template or the templatehost.
     *
     * Calling `infoDelay` without `flashLayer` parameter is the same as calling the convenience method [[templateHostInfo]].
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     *
     * @param flashLayer	If not specified, information about the `TemplateHost` will be returned.
     */
    CasparCG.prototype.cgInfo = function (channel, layer, flashLayer) {
        return this.do(new AMCP_1.AMCP.CGInfoCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    };
    /**
     * Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     */
    CasparCG.prototype.templateHostInfo = function (channel, layer) {
        return this.cgInfo(channel, layer);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_INFO>
     */
    CasparCG.prototype.glInfo = function () {
        return this.do(new AMCP_1.AMCP.GlInfoCommand());
    };
    /**
     * Sets the server's [[LogLevel]].
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_LEVEL>
     */
    CasparCG.prototype.logLevel = function (enumOrString) {
        return this.do(new AMCP_1.AMCP.LogLevelCommand({ level: enumOrString }));
    };
    CasparCG.prototype.logCategory = function (category, enabled) {
        var params = {};
        params[category.toString().toLowerCase()] = enabled;
        return this.do(new AMCP_1.AMCP.LogCategoryCommand(params));
    };
    /**
     * Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
     */
    CasparCG.prototype.logCalltrace = function (enabled) {
        return this.logCategory(ServerStateEnum_1.Enum.LogCategory.CALLTRACE, enabled);
    };
    /**
     * Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
     */
    CasparCG.prototype.logCommunication = function (enabled) {
        return this.logCategory(ServerStateEnum_1.Enum.LogCategory.COMMUNICATION, enabled);
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DIAG>
     */
    CasparCG.prototype.diag = function () {
        return this.do(new AMCP_1.AMCP.DiagCommand());
    };
    CasparCG.prototype.help = function (commandOrName) {
        var param = {};
        if (commandOrName) {
            param["command"] = commandOrName;
        }
        return this.do(new AMCP_1.AMCP.HelpCommand(param));
    };
    /**
     * Convenience method for calling [[help]] with no parameters.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
     */
    CasparCG.prototype.getCommands = function () {
        return this.help();
    };
    CasparCG.prototype.helpProducer = function (producerOrName) {
        var param = {};
        if (producerOrName) {
            param["producer"] = producerOrName;
        }
        return this.do(new AMCP_1.AMCP.HelpProducerCommand(param));
    };
    /**
     * Convenience method for calling [[helpProducer]] with no parameters.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
     */
    CasparCG.prototype.getProducers = function () {
        return this.helpProducer();
    };
    CasparCG.prototype.helpConsumer = function (consumerOrName) {
        var param = {};
        if (consumerOrName) {
            param["consumer"] = consumerOrName;
        }
        return this.do(new AMCP_1.AMCP.HelpConsumerCommand(param));
    };
    /**
     * Convenience method for calling [[helpConsumer]] with no parameters.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
     */
    CasparCG.prototype.getConsumers = function () {
        return this.helpConsumer();
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#BYE>
     */
    CasparCG.prototype.bye = function () {
        return this.do(new AMCP_1.AMCP.ByeCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#KILL>
     */
    CasparCG.prototype.kill = function () {
        return this.do(new AMCP_1.AMCP.KillCommand());
    };
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESTART>
     */
    CasparCG.prototype.restart = function () {
        return this.do(new AMCP_1.AMCP.RestartCommand());
    };
    return CasparCG;
}(hap_1.EventEmitter));
exports.CasparCG = CasparCG;
var foo = new CasparCG({ host: "52.208.248.56", onConnected: function () {
        foo.do(new AMCP_1.AMCP.LoadbgCommand({ channel: 1, layer: 0, clip: "amb", length: null }));
    } });

//# sourceMappingURL=maps/CasparCG.js.map
