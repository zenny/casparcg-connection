import { Callback as CallbackNS } from "./global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IStringCallback = CallbackNS.IStringCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;
/**
 *
 */
export declare namespace Options {
    /**
     *
     */
    enum QueueMode {
        SALVO = 1,
        SEQUENTIAL = 2,
        SMART = 3,
    }
}
/**
 *
 */
export interface IConnectionOptions {
    host?: string;
    port?: number;
    autoConnect?: boolean;
    autoReconnect?: boolean;
    autoReconnectInterval?: number;
    autoReconnectAttempts?: number;
    queueMode?: Options.QueueMode;
    debug?: boolean;
    onLog?: IStringCallback;
    onConnectionStatus?: ISocketStatusCallback;
    onConnectionChanged?: IBooleanCallback;
    onConnected?: IBooleanCallback;
    onDisconnected?: IBooleanCallback;
    onError?: IErrorCallback;
}
/**
 *
 */
export declare class ConnectionOptions implements IConnectionOptions {
    host: string;
    port: number;
    autoConnect: boolean;
    autoReconnect: boolean;
    autoReconnectInterval: number;
    autoReconnectAttempts: number;
    queueMode: Options.QueueMode;
    debug: boolean;
    onLog: IStringCallback;
    onConnectionStatus: ISocketStatusCallback;
    onConnectionChanged: IBooleanCallback;
    onConnected: IBooleanCallback;
    onDisconnected: IBooleanCallback;
    onError: IErrorCallback;
    /**
     *
     */
    constructor(options: IConnectionOptions);
    constructor(host?: string, port?: number);
}
