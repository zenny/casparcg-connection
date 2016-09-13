/**
 *
 */
export declare namespace Enum {
    /**
     *
     */
    abstract class AbstractEnum {
        value: string;
        /**
         *
         */
        constructor(value: string);
        /**
         *
         */
        toString(): string;
    }
    /**
     *
     */
    class Command extends AbstractEnum {
        static LOADBG: Command;
        static LOAD: Command;
        static PLAY: Command;
        static PAUSE: Command;
        static RESUME: Command;
        static STOP: Command;
        static CLEAR: Command;
        static CALL: Command;
        static SWAP: Command;
        static ADD: Command;
        static REMOVE: Command;
        static PRINT: Command;
        static LOG_LEVEL: Command;
        static LOG_CATEGORY: Command;
        static SET: Command;
        static LOCK: Command;
        static DATA_STORE: Command;
        static DATA_RETRIEVE: Command;
        static DATA_LIST: Command;
        static DATA_REMOVE: Command;
        static CG_ADD: Command;
        static CG_PLAY: Command;
        static CG_STOP: Command;
        static CG_NEXT: Command;
        static CG_REMOVE: Command;
        static CG_CLEAR: Command;
        static CG_UPDATE: Command;
        static CG_INVOKE: Command;
        static CG_INFO: Command;
        static MIXER_KEYER: Command;
        static MIXER_CHROMA: Command;
        static MIXER_BLEND: Command;
        static MIXER_OPACITY: Command;
        static MIXER_BRIGHTNESS: Command;
        static MIXER_SATURATION: Command;
        static MIXER_CONTRAST: Command;
        static MIXER_LEVELS: Command;
        static MIXER_FILL: Command;
        static MIXER_CLIP: Command;
        static MIXER_ANCHOR: Command;
        static MIXER_CROP: Command;
        static MIXER_ROTATION: Command;
        static MIXER_PERSPECTIVE: Command;
        static MIXER_MIPMAP: Command;
        static MIXER_VOLUME: Command;
        static MIXER_MASTERVOLUME: Command;
        static MIXER_STRAIGHT_ALPHA_OUTPUT: Command;
        static MIXER_GRID: Command;
        static MIXER_COMMIT: Command;
        static MIXER_CLEAR: Command;
        static CHANNEL_GRID: Command;
        static THUMBNAIL_LIST: Command;
        static THUMBNAIL_RETRIEVE: Command;
        static THUMBNAIL_GENERATE: Command;
        static THUMBNAIL_GENERATE_ALL: Command;
        static CINF: Command;
        static CLS: Command;
        static FLS: Command;
        static TLS: Command;
        static VERSION: Command;
        static INFO: Command;
        static INFO_TEMPLATE: Command;
        static INFO_CONFIG: Command;
        static INFO_PATHS: Command;
        static INFO_SYSTEM: Command;
        static INFO_SERVER: Command;
        static INFO_QUEUES: Command;
        static INFO_THREADS: Command;
        static INFO_DELAY: Command;
        static DIAG: Command;
        static GL_INFO: Command;
        static GL_GC: Command;
        static BYE: Command;
        static KILL: Command;
        static RESTART: Command;
        static HELP: Command;
        static HELP_PRODUCER: Command;
        static HELP_CONSUMER: Command;
    }
    /**
     *
     */
    class Producer extends AbstractEnum {
        static FFMPEG: Producer;
        static DECKLINK: Producer;
        static HTML: Producer;
        static PSD: Producer;
        static FLASH: Producer;
        static FLASH_CT: Producer;
        static FLASH_SWF: Producer;
        static IMAGE_SCROLL: Producer;
        static IMAGE: Producer;
        static REROUTE: Producer;
        static TEXT: Producer;
        static SCENE: Producer;
        static COLOR: Producer;
    }
    /**
     *
     */
    class Consumer extends AbstractEnum {
        static FFMPEG: Consumer;
        static STREAMING: Consumer;
        static ADUIO: Consumer;
        static BLUEFISH: Consumer;
        static DECKLINK: Consumer;
        static SCREEN: Consumer;
        static IVGA: Consumer;
        static IMAGE: Consumer;
    }
    /**
     *
     *
     */
    class Version extends AbstractEnum {
        static SERVER: Version;
        static FLASH: Version;
        static TEMPLATEHOST: Version;
        static CEF: Version;
    }
    /**
     *
     *
     */
    class Lock extends AbstractEnum {
        static ACQUIRE: Lock;
        static RELEASE: Lock;
        static CLEAR: Lock;
    }
    /**
     *
     *
     */
    class LogCategory extends AbstractEnum {
        static CALLTRACE: LogCategory;
        static COMMUNICATION: LogCategory;
    }
    /**
     *
     *
     */
    class Chroma extends AbstractEnum {
        static NONE: Chroma;
        static GREEN: Chroma;
        static BLUE: Chroma;
    }
    /**
     *
     *
     */
    class LogLevel extends AbstractEnum {
        static TRACE: LogLevel;
        static DEBUG: LogLevel;
        static INFO: LogLevel;
        static WARNING: LogLevel;
        static ERROR: LogLevel;
        static FATAL: LogLevel;
    }
    /**
     *
     *
     */
    class Transition extends AbstractEnum {
        static CUT: Transition;
        static MIX: Transition;
        static PUSH: Transition;
        static WIPE: Transition;
        static SLIDE: Transition;
    }
    /**
     *
     *
     */
    class Direction extends AbstractEnum {
        static LEFT: Direction;
        static RIGHT: Direction;
    }
    /**
     *
     */
    class BlendMode extends AbstractEnum {
        static NORMAL: BlendMode;
        static LIGHTEN: BlendMode;
        static DARKEN: BlendMode;
        static MULTIPLY: BlendMode;
        static AVERAGE: BlendMode;
        static ADD: BlendMode;
        static SUBTRACT: BlendMode;
        static DIFFERENCE: BlendMode;
        static NEGATION: BlendMode;
        static EXCLUSION: BlendMode;
        static SCREEN: BlendMode;
        static OVERLAY: BlendMode;
        static SOFT_LIGHT: BlendMode;
        static HARD_LIGHT: BlendMode;
        static COLOR_DODGE: BlendMode;
        static COLOR_BURN: BlendMode;
        static LINEAR_DODGE: BlendMode;
        static LINEAR_BURN: BlendMode;
        static LINEAR_LIGHT: BlendMode;
        static VIVID_LIGH: BlendMode;
        static PIN_LIGHT: BlendMode;
        static HARD_MIX: BlendMode;
        static REFLECT: BlendMode;
        static GLOW: BlendMode;
        static PHOENIX: BlendMode;
        static CONTRAST: BlendMode;
        static SATURATION: BlendMode;
        static COLOR: BlendMode;
        static LUMINOSITY: BlendMode;
    }
    /**
     *
     */
    class Ease extends AbstractEnum {
        static LINEAR: Ease;
        private static EASELINEAR;
        static NONE: Ease;
        private static EASENONE;
        static IN_QUAD: Ease;
        private static EASEINQUAD;
        static OUT_QUAD: Ease;
        private static EASEOUTQUAD;
        static IN_OUT_QUAD: Ease;
        private static EASEINOUTQUAD;
        static OUT_IN_QUAD: Ease;
        private static EASEOUTINQUAD;
        static IN_CUBIC: Ease;
        private static EASEINCUBIC;
        static OUT_CUBIC: Ease;
        private static EASEOUTCUBIC;
        static IN_OUT_CUBIC: Ease;
        private static EASEINOUTCUBIC;
        static OUT_IN_CUBIC: Ease;
        private static EASEOUTINCUBIC;
        static IN_QUART: Ease;
        private static EASEINQUART;
        static OUT_QUART: Ease;
        private static EASEOUTQUART;
        static IN_OUT_QUART: Ease;
        private static EASEINOUTQUART;
        static OUT_IN_QUART: Ease;
        private static EASEOUTINQUART;
        static IN_QUINT: Ease;
        private static EASEINQUINT;
        static OUT_QUINT: Ease;
        private static EASEOUTQUINT;
        static IN_OUT_QUINT: Ease;
        private static EASEINOUTQUINT;
        static OUT_IN_QUINT: Ease;
        private static EASEOUTINQUINT;
        static IN_SINE: Ease;
        private static EASEINSINE;
        static OUT_SINE: Ease;
        private static EASEOUTSINE;
        static IN_OUT_SINE: Ease;
        private static EASEINOUTSINE;
        static OUT_IN_SINE: Ease;
        private static EASEOUTINSINE;
        static IN_EXPO: Ease;
        private static EASEINEXPO;
        static OUT_EXPO: Ease;
        private static EASEOUTEXPO;
        static IN_OUT_EXPO: Ease;
        private static EASEINOUTEXPO;
        static OUT_IN_EXPO: Ease;
        private static EASEOUTINEXPO;
        static IN_CIRC: Ease;
        private static EASEINCIRC;
        static OUT_CIRC: Ease;
        private static EASEOUTCIRC;
        static IN_OUT_CIRC: Ease;
        private static EASEINOUTCIRC;
        static OUT_IN_CIRC: Ease;
        private static EASEOUTINCIRC;
        static IN_ELASTIC: Ease;
        private static EASEINELASTIC;
        static OUT_ELASTIC: Ease;
        private static EASEOUTELASTIC;
        static IN_OUT_ELASTIC: Ease;
        private static EASEINOUTELASTIC;
        static OUT_IN_ELASTIC: Ease;
        private static EASEOUTINELASTIC;
        static IN_BACK: Ease;
        private static EASEINBACK;
        static OUT_BACK: Ease;
        private static EASEOUTBACK;
        static IN_OUT_BACK: Ease;
        private static EASEINOUTBACK;
        static OUT_IN_BACK: Ease;
        private static EASEOUTINBACK;
        static OUT_BOUNCE: Ease;
        private static EASEOUTBOUNCE;
        static IN_BOUNCE: Ease;
        private static EASEINBOUNCE;
        static IN_OUT_BOUNCE: Ease;
        private static EASEINOUTBOUNCE;
        static OUT_IN_BOUNCE: Ease;
        private static EASEOUTINBOUNCE;
    }
}
