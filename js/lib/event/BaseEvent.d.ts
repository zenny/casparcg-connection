import { EventFacade } from "hap";
export declare namespace Event {
    /**
     *
     */
    class BaseEvent extends EventFacade {
        /**
         *
         */
        constructor(params: Object);
        /**
         *
         */
        value: Object;
        /**
         *
         */
        valueOf(): Object;
    }
}
