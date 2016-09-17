import { AMCPUtil as AMCPUtilNS } from "./AMCP";
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
import { Response as ResponseNS } from "./ResponseSignature";
import ResponseSignature = ResponseNS.ResponseSignature;
import { Param as ParamNS } from "./ParamSignature";
import PayloadVO = ParamNS.PayloadVO;
import Param = ParamNS.Param;
import IParamSignature = ParamNS.IParamSignature;
import { Protocol as ProtocolNS } from "./ProtocolLogic";
import IProtocolLogic = ProtocolNS.IProtocolLogic;
import { Callback as CallbackNS } from "./global/Callback";
import ICommandStatusCallback = CallbackNS.ICommandStatusCallback;
/**
 *
 */
export declare namespace Command {
    /**
     *
     */
    interface IAMCPResponse {
        code: number;
        raw: string;
        toString(): string;
        data: Object;
    }
    /**
     *
     */
    class AMCPResponse implements IAMCPResponse {
        code: number;
        raw: string;
        data: Object;
        toString(): string;
    }
    /**
     *
     */
    enum IAMCPStatus {
        Invalid = -1,
        New = 0,
        Initialized = 1,
        Queued = 2,
        Sent = 3,
        Suceeded = 4,
        Failed = 5,
        Timeout = 6,
    }
    /**
     *
     */
    interface IAMCPCommandData {
        address: string;
        channel: number;
        layer: number;
        payload: PayloadVO;
        response: IAMCPResponse;
        status: IAMCPStatus;
        id: string;
    }
    /**
     *
     */
    interface IAMCPCommandVO extends IAMCPCommandData {
        _commandName: string;
        _objectParams: Param;
        _stringParamsArray: Array<string>;
    }
    /**
     *
     */
    interface IAMCPCommand extends IAMCPCommandData {
        validateParams(): boolean;
        validateResponse(response: CasparCGSocketResponse): boolean;
        serialize(): IAMCPCommandVO;
        populate(cmdVo: IAMCPCommandVO, id: string): void;
        paramProtocol: Array<IParamSignature>;
        protocolLogic: Array<IProtocolLogic>;
        responseProtocol: ResponseSignature;
        resolve?: any;
        reject?: any;
        onStatusChanged: ICommandStatusCallback;
    }
    /**
     *
     */
    function isIAMCPCommand(object: Object): object is IAMCPCommand;
    /**
     *
     */
    abstract class AbstractCommand implements IAMCPCommand {
        response: IAMCPResponse;
        paramProtocol: Array<IParamSignature>;
        responseProtocol: ResponseSignature;
        onStatusChanged: ICommandStatusCallback;
        private _status;
        protected _channel: number;
        protected _layer: number;
        protected _id: string;
        protected _payload: PayloadVO;
        protected _stringParamsArray: Array<string>;
        protected _objectParams: Param;
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        validateParams(): boolean;
        /**
         *
         */
        protected validateParam(signature: IParamSignature): boolean;
        /**
         *
         */
        protected validateProtocolLogic(): boolean;
        /**
         *
         */
        validateResponse(response: CasparCGSocketResponse): boolean;
        /**
         *
         */
        payload: PayloadVO;
        /**
         *
         */
        id: string;
        /**
         *
         */
        protected validateChannel(override?: number): number;
        /**
         *
         */
        protected validateLayer(override?: number): number;
        /**
         *
         */
        protocolLogic: Array<IProtocolLogic>;
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
        /**
         *
         */
        /**
         *
         */
        status: IAMCPStatus;
        /**
         *
         */
        serialize(): IAMCPCommandVO;
        /**
         *
         */
        populate(cmdVo: IAMCPCommandVO, id: any): void;
        /**
         *
         */
        toString(): string;
    }
    /**
     *
     */
    abstract class AbstractOrChannelOrLayerCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
    }
    /**
     *
     */
    abstract class AbstractChannelCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
    }
    /**
     *
     */
    abstract class AbstractLayerCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
    }
    /**
     *
     */
    abstract class AbstractChannelOrLayerCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
    }
    /**
     *
     */
    abstract class AbstractLayerWithFallbackCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
    }
    /**
     *
     */
    abstract class AbstractLayerWithCgFallbackCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
        /**
         *
         */
        channel: number;
        /**
         *
         */
        layer: number;
        /**
         *
         */
        address: string;
    }
}
