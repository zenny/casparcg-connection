import { EventEmitter } from "hap";
import { SocketState } from "./lib/CasparCGSocket";
import { Enum } from "./lib/ServerStateEnum";
import { IConnectionOptions, ConnectionOptions, Options as OptionsNS } from "./lib/AMCPConnectionOptions";
import QueueMode = OptionsNS.QueueMode;
import { Command as CommandNS } from "./lib/AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import { Param as ParamNS } from "./lib/ParamSignature";
import Param = ParamNS.Param;
import TemplateData = ParamNS.TemplateData;
import { Callback as CallbackNS } from "./lib/global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IStringCallback = CallbackNS.IStringCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;
/**
 * CasparCG Protocols
 */
export declare namespace CasparCGProtocols {
    /**
     * CasparCG Protocol version 2.1
     */
    namespace v2_1 {
        /**
         * AMCP version 2.1
         */
        interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
        }
        /**
         * AMCP Media-commands
         */
        interface IVideo {
            loadbg(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): IAMCPCommand;
            load(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): IAMCPCommand;
            play(channel: number, layer?: number, clip?: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): IAMCPCommand;
            pause(channel: number, layer?: number): IAMCPCommand;
            resume(channel: number, layer?: number): IAMCPCommand;
            stop(channel: number, layer?: number): IAMCPCommand;
        }
        /**
         * AMCP Template-commands
         */
        interface ICG {
            cgAdd(channel: number, layer: number, flashLayer: number, templateName: string, playOnLoad: boolean | number | string, data?: TemplateData): IAMCPCommand;
            cgPlay(channel: number, layer: number, flashLayer: number): IAMCPCommand;
            cgStop(channel: number, layer: number, flashLayer: number): IAMCPCommand;
            cgNext(channel: number, layer: number, flashLayer: number): IAMCPCommand;
            cgRemove(channel: number, layer: number, flashLayer: number): IAMCPCommand;
            cgClear(channel: number, layer?: number): IAMCPCommand;
            cgUpdate(channel: number, layer: number, flashLayer: number, data: TemplateData): IAMCPCommand;
            cgInvoke(channel: number, layer: number, flashLayer: number, methodName: string): IAMCPCommand;
        }
        /**
         * AMCP Mixer-commands
         */
        interface IMixer {
            mixerKeyer(channel: number, layer?: number, state?: number | boolean, defer?: boolean): IAMCPCommand;
            mixerKeyerDeferred(channel: number, layer?: number, state?: number | boolean): IAMCPCommand;
            getMixerStatusKeyer(channel: number, layer?: number): IAMCPCommand;
            mixerChroma(channel: number, layer?: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerChromaDeferred(channel: number, layer?: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusChroma(channel: number, layer?: number): IAMCPCommand;
            mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): IAMCPCommand;
            mixerBlendDeferred(channel: number, layer?: number, blendmode?: Enum.BlendMode | string): IAMCPCommand;
            getMixerStatusBlend(channel: number, layer?: number): IAMCPCommand;
            mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerOpacityDeferred(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusOpacity(channel: number, layer?: number): IAMCPCommand;
            mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerBrightnessDeferred(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusBrightness(channel: number, layer?: number): IAMCPCommand;
            mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerSaturationDeferred(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusSaturation(channel: number, layer?: number): IAMCPCommand;
            mixerBrightness(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerContrastDeferred(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusContrast(channel: number, layer?: number): IAMCPCommand;
            mixerLevels(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerLevelsDeferred(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusLevels(channel: number, layer?: number): IAMCPCommand;
            mixerFill(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerFillDeferred(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusFill(channel: number, layer?: number): IAMCPCommand;
            mixerClip(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerClipDeferred(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusClip(channel: number, layer?: number): IAMCPCommand;
            mixerAnchor(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerAnchorDeferred(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusAnchor(channel: number, layer?: number): IAMCPCommand;
            mixerCrop(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerCropDeferred(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusCrop(channel: number, layer?: number): IAMCPCommand;
            mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerRotationDeferred(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusRotation(channel: number, layer?: number): IAMCPCommand;
            mixerPerspective(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerPerspectiveDeferred(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusPerspective(channel: number, layer?: number): IAMCPCommand;
            mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): IAMCPCommand;
            mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): IAMCPCommand;
            getMixerStatusMipmap(channel: number, layer?: number): IAMCPCommand;
            mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerVolumeDeferred(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            getMixerStatusVolume(channel: number, layer?: number): IAMCPCommand;
            mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): IAMCPCommand;
            mixerMastervolumeDeferred(channel: number, mastervolume?: number): IAMCPCommand;
            getMixerStatusMastervolume(channel: number, layer?: number): IAMCPCommand;
            mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): IAMCPCommand;
            mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): IAMCPCommand;
            getMixerStatusStraightAlphaOutput(channel: number, layer?: number): IAMCPCommand;
            mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
            mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
            mixerCommit(channel: number): IAMCPCommand;
            mixerClear(channel: number, layer?: number): IAMCPCommand;
        }
        /**
         * AMCP Channel-commands
         */
        interface IChannel {
            clear(channel: number, layer?: number): IAMCPCommand;
            print(channel: number): IAMCPCommand;
            lock(channel: number, action: Enum.Lock | string, lockPhrase?: string): IAMCPCommand;
            channelGrid(): IAMCPCommand;
            glGC(): IAMCPCommand;
        }
        /**
         * AMCP Template Data-commands
         */
        interface IData {
            dataStore(fileName: string, data: TemplateData): IAMCPCommand;
            dataRetrieve(fileName: string): IAMCPCommand;
            dataList(): IAMCPCommand;
            dataRemove(fileName: string): IAMCPCommand;
        }
        /**
         * AMCP Thumbnail-commands
         */
        interface IThumbnail {
            thumbnailList(): IAMCPCommand;
            thumbnailRetrieve(fileName: string): IAMCPCommand;
            thumbnailGenerate(fileName: string): IAMCPCommand;
            thumbnailGenerateAll(): IAMCPCommand;
        }
        /**
         * AMCP Query-commands
         */
        interface IQuery {
            cinf(fileName: string): IAMCPCommand;
            cls(): IAMCPCommand;
            fls(): IAMCPCommand;
            tls(): IAMCPCommand;
            version(component?: Enum.Version): IAMCPCommand;
            info(channel?: number, layer?: number): IAMCPCommand;
            infoTemplate(template: string): IAMCPCommand;
            infoConfig(): IAMCPCommand;
            infoPaths(): IAMCPCommand;
            infoSystem(): IAMCPCommand;
            infoServer(): IAMCPCommand;
            infoQueues(): IAMCPCommand;
            infoThreads(): IAMCPCommand;
            infoDelay(channel: number, layer?: number): IAMCPCommand;
            cgInfo(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
            templateHostInfo(channel: number, layer?: number): any;
            glInfo(): IAMCPCommand;
            logLevel(level: Enum.LogLevel | string): IAMCPCommand;
            logCategory(category: Enum.LogCategory | string, enabled: boolean): IAMCPCommand;
            logCalltrace(enabled: boolean): IAMCPCommand;
            logCommunication(enabled: boolean): IAMCPCommand;
            diag(): IAMCPCommand;
            help(command?: Enum.Command | string): IAMCPCommand;
            getCommands(): IAMCPCommand;
            helpProducer(producer?: Enum.Producer | string): IAMCPCommand;
            getProducers(): IAMCPCommand;
            helpConsumer(consumer?: Enum.Consumer | string): IAMCPCommand;
            getConsumers(): IAMCPCommand;
        }
        /**
         * AMCP Operation-commands
         */
        interface IOperation {
            bye(): IAMCPCommand;
            kill(): IAMCPCommand;
            restart(): IAMCPCommand;
        }
    }
}
/**
 * CasparCG Interface
 */
export interface ICasparCGConnection {
    connectionOptions: ConnectionOptions;
    connected: boolean;
    connectionStatus: SocketState;
    commandQueue: Array<IAMCPCommand>;
    removeQueuedCommand(id: string): boolean;
    connect(options?: IConnectionOptions): void;
    disconnect(): void;
    do(command: IAMCPCommand): IAMCPCommand;
    do(commandString: string, ...params: (string | Param)[]): IAMCPCommand;
}
/**
 * The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 * It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 *
 * There is a single [[CasparCGSocket]] pr. `CasparCG` object.
 * `CasparCG` should be the only public interface to interact directly with.
 */
export declare class CasparCG extends EventEmitter implements ICasparCGConnection, ConnectionOptions, CasparCGProtocols.v2_1.AMCP {
    private _connected;
    private _host;
    private _port;
    private _autoReconnect;
    private _autoReconnectInterval;
    private _autoReconnectAttempts;
    private _socket;
    private _queuedCommands;
    private _sentCommands;
    /**
     * Try to connect upon creation.
     */
    autoConnect: boolean;
    /**b
     * @todo: document
     */
    queueMode: QueueMode;
    /**
     * Setting this to true will print out logging to the `Console`, in addition to the optinal [[onLog]] and [[LogEvent.LOG]].
     */
    debug: boolean;
    /**
     * Callback for all logging.
     */
    onLog: IStringCallback;
    /**
     * Callback for all status updates from the `CasparCGSocket`.
     */
    onConnectionStatus: ISocketStatusCallback;
    /**
     * Callback for status updates from the `CasparCGSocket` if the `connected` property changes value.
     */
    onConnectionChanged: IBooleanCallback;
    /**
     * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `true`.
     */
    onConnected: IBooleanCallback;
    /**
     * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `false`.
     */
    onDisconnected: IBooleanCallback;
    /**
     * Callback for general errors
     */
    onError: IErrorCallback;
    /**
     * If the constructor gets called with no parameters, all properties of the CasparCG object will match all default properties defined by [[IConnectionOptions]].
     *
     ```
     var con = new CasparCG();
     // host = 127.0.0.1, port = 5250, autoConnect = true ...
     
      con.play(1, 1, "amb");
      // you can interact with the server, but you have no knowledge of the conenction status until the onConnect event- or callback gets invoked
     // the `PlayCommand` will however be queued and fired when the connection gets established
     con.close();
     ```
     *
     * @param host		Defaults to `IConnectionOptions.host`
     * @param port		Defaults to `IConnectionOptions.host`
     * @param options	An object with combination of properties defined by `IConnectionOptions`. All properties not explicitly set will fall back to the defaults defined by `IConnectionOptions`.
     *
     * All callbacks including [[onConnected]] will be set prior trying to establish connection, so the `CasparCG` object will give back all events even if [[CasparCG.autoConnect]] is `true`.
     */
    constructor();
    /**
     * Set host/port directly in constructor:
     *
     ```
     var con = new CasparCG("192.168.0.1", 5251);
     // host = 192.168.0.1, port = 5251, autoConnect = true ...

     // change properties after the constructor
     con.debug = true;
     
     con.play(1, 1, "amb");
     con.close();
     ```
     *
     */
    constructor(host?: string, port?: number);
    /**
     * Callbacks and events after constructor:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", autoConnect: false});
     // host = 192.168.0.1, port = 5250, autoConnect = false ...
     
     // add onLog callback after constructor
     con.onLog = function(logMessage){ console.log(logMessage); };
     
     // add eventlistener to the conenction event before connecting
     con.on(CasparCGSocketStatusEvent.CONNECTED, onConnection(event));
     
     con.connect();
     ```
     * Callback in constructor:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", onConnect: onConnectedCallback});
     // Connection callbacks can be set in the constructor and will be registered before autoConnect invokes.
     // This ensures that you recieve all callbacks
     ```
     * Inline function syntax:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", onConnect: function(connected) {
            // do something once we get connected
            console.log("Are we conencted?", connected)
        }
    });
     ```
     * Inline fat arrow syntax:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", onConnect: (connected) => {
            // do something once we get connected
            console.log("Are we conencted?", connected)
        }
    });
     ```
     *
     */
    constructor(options?: IConnectionOptions);
    /**
     *
     */
    private _createNewSocket(options?, enforceRecreation?);
    /**
     * Creates a new [[CasparCGSocket]] and connects.
     *
     * @param options	Setting new [[ICasparCGConnection]] properties will override each individual property allready defined on the `CasparCG` object. Existing properties not overwritten by this `options` object will remain.
     */
    connect(options?: IConnectionOptions): void;
    /**
     * Disconnects and disposes the [[CasparCGSocket]] connection.
     */
    disconnect(): void;
    /**
     *
     */
    /**
     * Setting the `host` will create a new [[CasparCGSocket]] connection.
     *
     * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
     */
    host: string;
    /**
     *
     */
    /**
     * Setting the `port` will create a new [[CasparCGSocket]] connection.
     *
     * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
     */
    port: number;
    /**
     * Try to reconnect in case of unintentionally loss of connection, or in case of failed connection in the first place.
     */
    /**
     *
     */
    autoReconnect: boolean;
    /**
     * Timeout in milliseconds between each connection attempt during reconnection.
     */
    /**
     *
     */
    autoReconnectInterval: number;
    /**
     * Max number of attempts of connection during reconnection. This value resets once the reconnection is over (either in case of successfully reconnecting, changed connection properties such as `host` or `port` or by being manually cancelled).
     */
    /**
     *
     */
    autoReconnectAttempts: number;
    /**
     *
     */
    connectionOptions: ConnectionOptions;
    /**
     *
     */
    connected: boolean;
    /**
     *
     */
    connectionStatus: SocketState;
    /**
     *
     */
    private _onSocketStatusChange(socketStatus);
    /**
     *
     */
    commandQueue: Array<IAMCPCommand>;
    /**
     *
     */
    private _onSocketError(error);
    /**
     *
     */
    private _log(args);
    /**
     * @todo	implement
     * @todo	document
     */
    do(command: IAMCPCommand): IAMCPCommand;
    do(commandString: string, ...params: (string | Param)[]): IAMCPCommand;
    /**
     *
     */
    private _addQueuedCommand(command);
    /**
     * @todo: document
     */
    removeQueuedCommand(id: string): boolean;
    /**
     *
     */
    private _handleSocketResponse(socketResponse);
    /**
     *
     */
    private _expediteCommand();
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadbg(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    load(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
     */
    play(channel: number, layer?: number): IAMCPCommand;
    play(channel: number, layer: number, clip?: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PAUSE>
     */
    pause(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESUME>
     */
    resume(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#STOP>
     */
    stop(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_ADD>
     */
    cgAdd(channel: number, layer: number, flashLayer: number, templateName: string, playOnLoad?: boolean | number | string, data?: TemplateData): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_PLAY>
     */
    cgPlay(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_STOP>
     */
    cgStop(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_NEXT>
     */
    cgNext(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_REMOVE>
     */
    cgRemove(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_CLEAR>
     */
    cgClear(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_UPDATE>
     */
    cgUpdate(channel: number, layer: number, flashLayer: number, data: TemplateData): IAMCPCommand;
    cgInvoke(channel: number, layer: number, flashLayer: number, method: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    mixerKeyer(channel: number, layer?: number): IAMCPCommand;
    mixerKeyer(channel: number, layer: number, state: number | boolean, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    mixerKeyerDeferred(channel: number, layer: number, state?: number | boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    getMixerStatusKeyer(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    mixerChroma(channel: number, layer?: number): IAMCPCommand;
    mixerChroma(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerChroma(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerChroma(channel: number, layer: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    mixerChromaDeferred(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    mixerChromaDeferred(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    getMixerStatusChroma(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    mixerBlend(channel: number, layer?: number): IAMCPCommand;
    mixerBlend(channel: number, layer: number, blendmode: Enum.BlendMode, defer?: boolean): IAMCPCommand;
    mixerBlend(channel: number, layer: number, blendmode: string, defer?: boolean): IAMCPCommand;
    mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    mixerBlendDeferred(channel: number, layer: number, blendmode: Enum.BlendMode): IAMCPCommand;
    mixerBlendDeferred(channel: number, layer: number, blendmode: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    getMixerStatusBlend(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    mixerOpacity(channel: number, layer?: number): IAMCPCommand;
    mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    mixerOpacityDeferred(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    getMixerStatusOpacity(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    mixerBrightness(channel: number, layer?: number): IAMCPCommand;
    mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    mixerBrightnessDeferred(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    getMixerStatusBrightness(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    mixerSaturation(channel: number, layer?: number): IAMCPCommand;
    mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    mixerSaturationDeferred(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    getMixerStatusSaturation(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    mixerContrast(channel: number, layer?: number): IAMCPCommand;
    mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerContrast(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    mixerContrastDeferred(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    getMixerStatusContrast(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    mixerLevels(channel: number, layer?: number): IAMCPCommand;
    mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    mixerLevelsDeferred(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    getMixerStatusLevels(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    mixerFill(channel: number, layer?: number): IAMCPCommand;
    mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    mixerFillDeferred(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    getMixerStatusFill(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    mixerClip(channel: number, layer?: number): IAMCPCommand;
    mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    mixerClipDeferred(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    getMixerStatusClip(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    mixerAnchor(channel: number, layer?: number): IAMCPCommand;
    mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    mixerAnchorDeferred(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    getMixerStatusAnchor(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    mixerCrop(channel: number, layer?: number): IAMCPCommand;
    mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    mixerCropDeferred(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    getMixerStatusCrop(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    mixerRotation(channel: number, layer?: number): IAMCPCommand;
    mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    mixerRotationDeferred(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    getMixerStatusRotation(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    mixerPerspective(channel: number, layer?: number): IAMCPCommand;
    mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottmLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottmLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottmLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    mixerPerspectiveDeferred(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    getMixerStatusPerspective(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    mixerMipmap(channel: number, layer?: number): IAMCPCommand;
    mixerMipmap(channel: number, layer: number, state: number | boolean, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    getMixerStatusMipmap(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    mixerVolume(channel: number, layer?: number): IAMCPCommand;
    mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    mixerVolumeDeferred(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    getMixerStatusVolume(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    mixerMastervolume(channel: number): IAMCPCommand;
    mixerMastervolume(channel: number, mastervolume: number, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    mixerMastervolumeDeferred(channel: number, mastervolume?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    getMixerStatusMastervolume(channel: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    mixerStraightAlphaOutput(channel: number, layer?: number): IAMCPCommand;
    mixerStraightAlphaOutput(channel: number, layer: number, state: number | boolean, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    getMixerStatusStraightAlphaOutput(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
     */
    mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
    mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
    mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
     */
    mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_COMMIT>
     */
    mixerCommit(channel: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLEAR>
     */
    mixerClear(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLEAR>
     */
    clear(channel: number, layer?: number): IAMCPCommand;
    /**
     * @todo	implement
     * @todo	document
     */
    call(channel: number, layer?: number): IAMCPCommand;
    /**
     * @todo	implement
     * @todo	document
     */
    swap(): IAMCPCommand;
    /**
     * @todo	implement
     * @todo	document
     */
    add(channel: number): IAMCPCommand;
    /**
     * @todo	implement
     * @todo	document
     */
    remove(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PRINT>
     */
    print(channel: number): IAMCPCommand;
    /**
     * @todo	implement
     * @todo	document
     */
    set(channel: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOCK>
     */
    lock(channel: number, action: Enum.Lock, lockPhrase?: string): IAMCPCommand;
    lock(channel: number, action: string, lockPhrase?: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CHANNEL_GRID>
     */
    channelGrid(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_GC>
     */
    glGC(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_STORE>
     */
    dataStore(fileName: string, data: TemplateData): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_RETRIEVE>
     */
    dataRetrieve(fileName: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_LIST>
     */
    dataList(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_REMOVE>
     */
    dataRemove(fileName: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_LIST>
     */
    thumbnailList(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_RETRIEVE>
     */
    thumbnailRetrieve(fileName: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE>
     */
    thumbnailGenerate(fileName: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE_ALL>
     */
    thumbnailGenerateAll(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CINF>
     */
    cinf(fileName: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLS>
     */
    cls(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#FLS>
     */
    fls(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#TLS>
     */
    tls(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#VERSION>
     */
    version(component?: Enum.Version): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO>
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_2>
     */
    info(channel?: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_TEMPLATE>
     */
    infoTemplate(template: string): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_CONFIG>
     */
    infoConfig(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_PATHS>
     */
    infoPaths(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SYSTEM>
     */
    infoSystem(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SERVER>
     */
    infoServer(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_QUEUES>
     */
    infoQueues(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_THREADS>
     */
    infoThreads(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_DELAY>
     */
    infoDelay(channel: number, layer?: number): IAMCPCommand;
    /**
     * Retrieves information about a running template or the templatehost.
     *
     * Calling `infoDelay` without `flashLayer` parameter is the same as calling the convenience method [[templateHostInfo]].
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     *
     * @param flashLayer	If not specified, information about the `TemplateHost` will be returned.
     */
    cgInfo(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
    /**
     * Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     */
    templateHostInfo(channel: number, layer?: number): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_INFO>
     */
    glInfo(): IAMCPCommand;
    /**
     * @param level		Loglevel set by using [[LogLevel]] enum.
     */
    logLevel(level: Enum.LogLevel): IAMCPCommand;
    /**
     * @param level		LogLevel set by string.
     */
    logLevel(level: string): IAMCPCommand;
    /**
     * Enabling or disabling logging for a given [[LogCategory]].
     *
     * Convenience methods [[logCalltrace]] and [[logCommunication]] are available.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_CATEGORY>
     */
    logCategory(category: Enum.LogCategory, enabled: boolean): IAMCPCommand;
    logCategory(category: string, enabled: boolean): IAMCPCommand;
    /**
     * Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
     */
    logCalltrace(enabled: boolean): IAMCPCommand;
    /**
     * Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
     */
    logCommunication(enabled: boolean): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DIAG>
     */
    diag(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
     */
    help(): IAMCPCommand;
    help(command?: Enum.Command): IAMCPCommand;
    help(commandName?: string): IAMCPCommand;
    /**
     * Convenience method for calling [[help]] with no parameters.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
     */
    getCommands(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
     */
    helpProducer(): IAMCPCommand;
    helpProducer(producer: Enum.Producer): IAMCPCommand;
    helpProducer(producerName: string): IAMCPCommand;
    /**
     * Convenience method for calling [[helpProducer]] with no parameters.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
     */
    getProducers(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
     */
    helpConsumer(): IAMCPCommand;
    helpConsumer(consumer: Enum.Consumer): IAMCPCommand;
    helpConsumer(consumerName: string): IAMCPCommand;
    /**
     * Convenience method for calling [[helpConsumer]] with no parameters.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
     */
    getConsumers(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#BYE>
     */
    bye(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#KILL>
     */
    kill(): IAMCPCommand;
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESTART>
     */
    restart(): IAMCPCommand;
}
