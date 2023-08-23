const formatMessage = require("format-message");

const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const ProgramModeType = require("../../extension-support/program-mode-type");

const CommonPeripheral = require("../common/common-peripheral");

/**
 * The list of USB device filters.
 * @readonly
 */
const PNPID_LIST = [
    // CH340
    "USB\\VID_1A86&PID_7523",
];

/**
 * Configuration of serialport
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    rts: false,
    dtr: false,
};

/**
 * Configuration for arduino-cli.
 * @readonly
 */
const DIVECE_OPT = {
    type: "arduino",
    fqbn: {
        darwin: "esp32:esp32:esp32:UploadSpeed=460800,PSRAM=enable",
        linux: "esp32:esp32:esp32:UploadSpeed=460800,PSRAM=enable",
        win32: "esp32:esp32:esp32:JTAGAdapter=default,PSRAM=enabled,PartitionScheme=default,CPUFreq=240,FlashMode=qio,FlashFreq=80,FlashSize=4M,UploadSpeed=921600,LoopCore=1,EventsCore=1,DebugLevel=none,EraseFlash=none",
    },
};

const Pins = {
    IO0: "0",
    IO1: "1",
    IO2: "2",
    IO3: "3",
    IO4: "4",
    IO12: "12",
    IO13: "13",
    IO14: "14",
    IO15: "15",
    IO16: "16",
};

const Level = {
    High: "HIGH",
    Low: "LOW",
};

const Channels = {
    CH0: "0",
    CH1: "1",
    CH2: "2",
    CH3: "3",
    CH4: "4",
    CH5: "5",
    CH6: "6",
    CH7: "7",
    CH8: "8",
    CH9: "9",
    CH10: "10",
    CH11: "11",
    CH12: "12",
    CH13: "13",
    CH14: "14",
    CH15: "15",
};

const SerialNo = {
    Serial0: "0",
    Serial1: "1",
    Serial2: "2",
};

const Buadrate = {
    B4800: "4800",
    B9600: "9600",
    B19200: "19200",
    B38400: "38400",
    B57600: "57600",
    B76800: "76800",
    B115200: "115200",
};

const Eol = {
    Warp: "warp",
    NoWarp: "noWarp",
};

const Mode = {
    Input: "INPUT",
    Output: "OUTPUT",
    InputPullup: "INPUT_PULLUP",
    InputPulldown: "INPUT_PULLDOWN",
};

const InterrupMode = {
    Rising: "RISING",
    Falling: "FALLING",
    Change: "CHANGE",
    LowLevel: "LOW",
    HighLevel: "HIGH",
};

const DataType = {
    Integer: "INTEGER",
    Decimal: "DECIMAL",
    String: "STRING",
};

/**
 * Manage communication with a Arduino esp32 peripheral over a OpenBlock Link client socket.
 */
class ArduinoEsp32Cam extends CommonPeripheral {
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the OpenBlock runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor(runtime, deviceId, originalDeviceId) {
        super(
            runtime,
            deviceId,
            originalDeviceId,
            PNPID_LIST,
            SERIAL_CONFIG,
            DIVECE_OPT
        );
    }
}

/**
 * OpenBlock blocks to interact with a Arduino esp32 peripheral.
 */
class OpenBlockArduinoEsp32CamDevice {
    /**
     * @return {string} - the ID of this extension.
     */
    get DEVICE_ID() {
        return "arduinoEsp32Cam";
    }

    get PINS_MENU() {
        return [
            {
                text: "IO0",
                value: Pins.IO0,
            },
            {
                text: "IO1",
                value: Pins.IO1,
            },
            {
                text: "IO2",
                value: Pins.IO2,
            },
            {
                text: "IO3",
                value: Pins.IO3,
            },
            {
                text: "IO4",
                value: Pins.IO4,
            },
            // Pins 6 to 11 are used by the ESP32 Flash, not recommended for general use.
            // {
            //     text: 'IO6',
            //     value: Pins.IO6
            // },
            // {
            //     text: 'IO7',
            //     value: Pins.IO7
            // },
            // {
            //     text: 'IO8',
            //     value: Pins.IO8
            // },
            // {
            //     text: 'IO9',
            //     value: Pins.IO9
            // },
            // {
            //     text: 'IO10',
            //     value: Pins.IO10
            // },
            // {
            //     text: 'IO11',
            //     value: Pins.IO11
            // },
            {
                text: "IO12",
                value: Pins.IO12,
            },
            {
                text: "IO13",
                value: Pins.IO13,
            },
            {
                text: "IO14",
                value: Pins.IO14,
            },
            {
                text: "IO15",
                value: Pins.IO15,
            },
            {
                text: "IO16",
                value: Pins.IO16,
            },
        ];
    }

    get OUT_PINS_MENU() {
        return [
            {
                text: "IO0",
                value: Pins.IO0,
            },
            {
                text: "IO1",
                value: Pins.IO1,
            },
            {
                text: "IO2",
                value: Pins.IO2,
            },
            {
                text: "IO3",
                value: Pins.IO3,
            },
            {
                text: "IO4",
                value: Pins.IO4,
            },

            // Pins 6 to 11 are used by the ESP32 Flash, not recommended for general use.
            // {
            //     text: 'IO6',
            //     value: Pins.IO6
            // },
            // {
            //     text: 'IO7',
            //     value: Pins.IO7
            // },
            // {
            //     text: 'IO8',
            //     value: Pins.IO8
            // },
            // {
            //     text: 'IO9',
            //     value: Pins.IO9
            // },
            // {
            //     text: 'IO10',
            //     value: Pins.IO10
            // },
            // {
            //     text: 'IO11',
            //     value: Pins.IO11
            // },
            {
                text: "IO12",
                value: Pins.IO12,
            },
            {
                text: "IO13",
                value: Pins.IO13,
            },
            {
                text: "IO14",
                value: Pins.IO14,
            },
            {
                text: "IO15",
                value: Pins.IO15,
            },
            {
                text: "IO16",
                value: Pins.IO16,
            },
        ];
    }

    get MODE_MENU() {
        return [
            {
                text: formatMessage({
                    id: "arduinoEsp32.modeMenu.input",
                    default: "input",
                    description: "label for input pin mode",
                }),
                value: Mode.Input,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.modeMenu.output",
                    default: "output",
                    description: "label for output pin mode",
                }),
                value: Mode.Output,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.modeMenu.inputPullup",
                    default: "input-pullup",
                    description: "label for input-pullup pin mode",
                }),
                value: Mode.InputPullup,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.modeMenu.inputPulldown",
                    default: "input-pulldown",
                    description: "label for input-pulldown pin mode",
                }),
                value: Mode.InputPulldown,
            },
        ];
    }

    get ANALOG_PINS_MENU() {
        return [
            {
                text: "IO0",
                value: Pins.IO0,
            },
            {
                text: "IO2",
                value: Pins.IO2,
            },
            {
                text: "IO4",
                value: Pins.IO4,
            },
            {
                text: "IO12",
                value: Pins.IO12,
            },
            {
                text: "IO13",
                value: Pins.IO13,
            },
            {
                text: "IO14",
                value: Pins.IO14,
            },
            {
                text: "IO15",
                value: Pins.IO15,
            },
        ];
    }

    get LEVEL_MENU() {
        return [
            {
                text: formatMessage({
                    id: "arduinoEsp32.levelMenu.high",
                    default: "high",
                    description: "label for high level",
                }),
                value: Level.High,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.levelMenu.low",
                    default: "low",
                    description: "label for low level",
                }),
                value: Level.Low,
            },
        ];
    }

    get LEDC_CHANNELS_MENU() {
        return [
            {
                text: "CH0 (LT0)",
                value: Channels.CH0,
            },
            {
                text: "CH1 (LT0)",
                value: Channels.CH1,
            },
            {
                text: "CH2 (LT1)",
                value: Channels.CH2,
            },
            {
                text: "CH3 (LT1)",
                value: Channels.CH3,
            },
            {
                text: "CH4 (LT2)",
                value: Channels.CH4,
            },
            {
                text: "CH5 (LT2)",
                value: Channels.CH5,
            },
            {
                text: "CH6 (LT3)",
                value: Channels.CH6,
            },
            {
                text: "CH7 (LT3)",
                value: Channels.CH7,
            },
            {
                text: "CH8 (HT0)",
                value: Channels.CH8,
            },
            {
                text: "CH9 (HT0)",
                value: Channels.CH9,
            },
            {
                text: "CH10 (HT1)",
                value: Channels.CH10,
            },
            {
                text: "CH11 (HT1)",
                value: Channels.CH11,
            },
            {
                text: "CH12 (HT2)",
                value: Channels.CH12,
            },
            {
                text: "CH13 (HT2)",
                value: Channels.CH13,
            },
            {
                text: "CH14 (HT3)",
                value: Channels.CH14,
            },
            {
                text: "CH15 (HT3)",
                value: Channels.CH15,
            },
        ];
    }

    get TOUCH_PINS_MENU() {
        return [
            {
                text: "IO0",
                value: Pins.IO0,
            },
            {
                text: "IO2",
                value: Pins.IO2,
            },
            {
                text: "IO4",
                value: Pins.IO4,
            },
            {
                text: "IO12",
                value: Pins.IO12,
            },
            {
                text: "IO13",
                value: Pins.IO13,
            },
            {
                text: "IO14",
                value: Pins.IO14,
            },
            {
                text: "IO15",
                value: Pins.IO15,
            },
        ];
    }

    get INTERRUP_MODE_MENU() {
        return [
            {
                text: formatMessage({
                    id: "arduinoEsp32.InterrupModeMenu.risingEdge",
                    default: "rising edge",
                    description: "label for rising edge interrup",
                }),
                value: InterrupMode.Rising,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.InterrupModeMenu.fallingEdge",
                    default: "falling edge",
                    description: "label for falling edge interrup",
                }),
                value: InterrupMode.Falling,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.InterrupModeMenu.changeEdge",
                    default: "change edge",
                    description: "label for change edge interrup",
                }),
                value: InterrupMode.Change,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.InterrupModeMenu.low",
                    default: "low level",
                    description: "label for low level interrup",
                }),
                value: InterrupMode.LowLevel,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.InterrupModeMenu.high",
                    default: "high level",
                    description: "label for high level interrup",
                }),
                value: InterrupMode.HighLevel,
            },
        ];
    }

    get SERIAL_NO_MENU() {
        return [
            {
                text: "0",
                value: SerialNo.Serial0,
            },
            // Usually IO9/10 is reserved for flash chip.
            // {
            //     text: '1',
            //     value: SerialNo.Serial1
            // },
            {
                text: "2",
                value: SerialNo.Serial2,
            },
        ];
    }

    get BAUDTATE_MENU() {
        return [
            {
                text: "4800",
                value: Buadrate.B4800,
            },
            {
                text: "9600",
                value: Buadrate.B9600,
            },
            {
                text: "19200",
                value: Buadrate.B19200,
            },
            {
                text: "38400",
                value: Buadrate.B38400,
            },
            {
                text: "57600",
                value: Buadrate.B57600,
            },
            {
                text: "76800",
                value: Buadrate.B76800,
            },
            {
                text: "115200",
                value: Buadrate.B115200,
            },
        ];
    }

    get EOL_MENU() {
        return [
            {
                text: formatMessage({
                    id: "arduinoEsp32.eolMenu.warp",
                    default: "warp",
                    description: "label for warp print",
                }),
                value: Eol.Warp,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.eolMenu.noWarp",
                    default: "no-warp",
                    description: "label for no warp print",
                }),
                value: Eol.NoWarp,
            },
        ];
    }

    get DATA_TYPE_MENU() {
        return [
            {
                text: formatMessage({
                    id: "arduinoEsp32.dataTypeMenu.integer",
                    default: "integer",
                    description: "label for integer",
                }),
                value: DataType.Integer,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.dataTypeMenu.decimal",
                    default: "decimal",
                    description: "label for decimal number",
                }),
                value: DataType.Decimal,
            },
            {
                text: formatMessage({
                    id: "arduinoEsp32.dataTypeMenu.string",
                    default: "string",
                    description: "label for string",
                }),
                value: DataType.String,
            },
        ];
    }

    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the OpenBlock runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor(runtime, originalDeviceId) {
        /**
         * The OpenBlock runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino esp32 peripheral instance
        this._peripheral = new ArduinoEsp32Cam(
            this.runtime,
            this.DEVICE_ID,
            originalDeviceId
        );
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
    getInfo() {
        return [
            {
                id: "pin",
                name: formatMessage({
                    id: "arduinoEsp32.category.pins",
                    default: "Pins",
                    description:
                        "The name of the esp32 arduino device pin category",
                }),
                color1: "#4C97FF",
                color2: "#3373CC",
                color3: "#3373CC",

                blocks: [
                    {
                        opcode: "setPinMode",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.setPinMode",
                            default: "set pin [PIN] mode [MODE]",
                            description: "arduinoEsp32 set pin mode",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "outPins",
                                defaultValue: Pins.IO2,
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: "mode",
                                defaultValue: Mode.Input,
                            },
                        },
                    },
                    {
                        opcode: "setDigitalOutput",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.setDigitalOutput",
                            default: "set digital pin [PIN] out [LEVEL]",
                            description: "arduinoEsp32 set digital pin out",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "outPins",
                                defaultValue: Pins.IO2,
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: "level",
                                defaultValue: Level.High,
                            },
                        },
                    },
                    {
                        opcode: "esp32SetPwmOutput",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.esp32SetPwmOutput",
                            default:
                                "set pwm pin [PIN] use channel [CH] out [OUT]",
                            description: "arduinoEsp32 set pwm pin out",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "outPins",
                                defaultValue: Pins.IO2,
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: "255",
                            },
                            CH: {
                                type: ArgumentType.NUMBER,
                                menu: "ledcChannels",
                                defaultValue: Channels.CH0,
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "readDigitalPin",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.readDigitalPin",
                            default: "read digital pin [PIN]",
                            description: "arduinoEsp32 read digital pin",
                        }),
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "pins",
                                defaultValue: Pins.IO2,
                            },
                        },
                    },
                    {
                        opcode: "readAnalogPin",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.readAnalogPin",
                            default: "read analog pin [PIN]",
                            description: "arduinoEsp32 read analog pin",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "analogPins",
                                defaultValue: Pins.IO2,
                            },
                        },
                    },
                    {
                        opcode: "esp32ReadTouchPin",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.esp32ReadTouchPin",
                            default: "read touch pin [PIN]",
                            description: "arduinoEsp32 read touch pin",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "touchPins",
                                defaultValue: Pins.IO2,
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "esp32SetServoOutput",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.setServoOutput",
                            default:
                                "set servo pin [PIN] use channel [CH] out [OUT]",
                            description: "arduinoEsp32 set servo pin out",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "outPins",
                                defaultValue: Pins.IO2,
                            },
                            OUT: {
                                type: ArgumentType.HALF_ANGLE,
                                defaultValue: "90",
                            },
                            CH: {
                                type: ArgumentType.NUMBER,
                                menu: "ledcChannels",
                                defaultValue: Channels.CH0,
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "esp32AttachInterrupt",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.esp32AttachInterrupt",
                            default:
                                "attach interrupt pin [PIN] mode [MODE] executes",
                            description: "arduinoEsp32 attach interrupt",
                        }),
                        blockType: BlockType.CONDITIONAL,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "pins",
                                defaultValue: Pins.IO2,
                            },
                            MODE: {
                                type: ArgumentType.STRING,
                                menu: "interruptMode",
                                defaultValue: InterrupMode.Rising,
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "esp32DetachInterrupt",
                        text: formatMessage({
                            id: "arduinoEsp32.pins.esp32DetachInterrupt",
                            default: "detach interrupt pin [PIN]",
                            description: "arduinoEsp32 detach interrupt",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: "pins",
                                defaultValue: Pins.IO2,
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU,
                    },
                    outPins: {
                        items: this.OUT_PINS_MENU,
                    },
                    mode: {
                        items: this.MODE_MENU,
                    },
                    analogPins: {
                        items: this.ANALOG_PINS_MENU,
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU,
                    },
                    ledcChannels: {
                        items: this.LEDC_CHANNELS_MENU,
                    },
                    touchPins: {
                        items: this.TOUCH_PINS_MENU,
                    },
                    interruptMode: {
                        items: this.INTERRUP_MODE_MENU,
                    },
                },
            },
            {
                id: "serial",
                name: formatMessage({
                    id: "arduinoEsp32.category.serial",
                    default: "Serial",
                    description:
                        "The name of the arduino esp32 device serial category",
                }),
                color1: "#9966FF",
                color2: "#774DCB",
                color3: "#774DCB",

                blocks: [
                    {
                        opcode: "multiSerialBegin",
                        text: formatMessage({
                            id: "arduinoEsp32.serial.multiSerialBegin",
                            default: "serial [NO] begin baudrate [VALUE]",
                            description: "arduinoEsp32 multi serial begin",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: "serialNo",
                                defaultValue: SerialNo.Serial0,
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                menu: "baudrate",
                                defaultValue: Buadrate.B115200,
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "multiSerialPrint",
                        text: formatMessage({
                            id: "arduinoEsp32.serial.multiSerialPrint",
                            default: "serial [NO] print [VALUE] [EOL]",
                            description: "arduinoEsp32 multi serial print",
                        }),
                        blockType: BlockType.COMMAND,
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: "serialNo",
                                defaultValue: SerialNo.Serial0,
                            },
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: "Hello Nomokit",
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: "eol",
                                defaultValue: Eol.Warp,
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "multiSerialAvailable",
                        text: formatMessage({
                            id: "arduinoEsp32.serial.multiSerialAvailable",
                            default: "serial [NO] available data length",
                            description:
                                "arduinoEsp32 multi serial available data length",
                        }),
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: "serialNo",
                                defaultValue: SerialNo.Serial0,
                            },
                        },
                        blockType: BlockType.REPORTER,
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "multiSerialReadAByte",
                        text: formatMessage({
                            id: "arduinoEsp32.serial.multiSerialReadAByte",
                            default: "serial [NO] read a byte",
                            description:
                                "arduinoEsp32 multi serial read a byte",
                        }),
                        arguments: {
                            NO: {
                                type: ArgumentType.NUMBER,
                                menu: "serialNo",
                                defaultValue: SerialNo.Serial0,
                            },
                        },
                        blockType: BlockType.REPORTER,
                        programMode: [ProgramModeType.UPLOAD],
                    },
                ],
                menus: {
                    baudrate: {
                        items: this.BAUDTATE_MENU,
                    },
                    serialNo: {
                        items: this.SERIAL_NO_MENU,
                    },
                    eol: {
                        items: this.EOL_MENU,
                    },
                },
            },
            {
                id: "data",
                name: formatMessage({
                    id: "arduinoEsp32.category.data",
                    default: "Data",
                    description:
                        "The name of the arduino esp32 device data category",
                }),
                color1: "#CF63CF",
                color2: "#C94FC9",
                color3: "#BD42BD",

                blocks: [
                    {
                        opcode: "dataMap",
                        text: formatMessage({
                            id: "arduinoEsp32.data.dataMap",
                            default:
                                "map [DATA] from ([ARG0], [ARG1]) to ([ARG2], [ARG3])",
                            description: "arduinoEsp32 data map",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "50",
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "1",
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "100",
                            },
                            ARG2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "1",
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "1000",
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "dataConstrain",
                        text: formatMessage({
                            id: "arduinoEsp32.data.dataConstrain",
                            default:
                                "constrain [DATA] between ([ARG0], [ARG1])",
                            description: "arduinoEsp32 data constrain",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "50",
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "1",
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "100",
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    "---",
                    {
                        opcode: "dataConvert",
                        text: formatMessage({
                            id: "arduinoEsp32.data.dataConvert",
                            default: "convert [DATA] to [TYPE]",
                            description: "arduinoEsp32 data convert",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: "123",
                            },
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: "dataType",
                                defaultValue: DataType.Integer,
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "dataConvertASCIICharacter",
                        text: formatMessage({
                            id: "arduinoEsp32.data.dataConvertASCIICharacter",
                            default: "convert [DATA] to ASCII character",
                            description:
                                "arduinoEsp32 data convert to ASCII character",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "97",
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                    {
                        opcode: "dataConvertASCIINumber",
                        text: formatMessage({
                            id: "arduinoEsp32.data.dataConvertASCIINumber",
                            default: "convert [DATA] to ASCII nubmer",
                            description:
                                "arduinoEsp32 data convert to ASCII nubmer",
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.STRING,
                                defaultValue: "a",
                            },
                        },
                        programMode: [ProgramModeType.UPLOAD],
                    },
                ],
                menus: {
                    dataType: {
                        items: this.DATA_TYPE_MENU,
                    },
                },
            },
        ];
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin mode is done.
     */
    setPinMode(args) {
        this._peripheral.setPinMode(args.PIN, args.MODE);
        return Promise.resolve();
    }

    /**
     * Set pin digital out level.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
     */
    setDigitalOutput(args) {
        this._peripheral.setDigitalOutput(args.PIN, args.LEVEL);
        return Promise.resolve();
    }

    /**
     * Set pin pwm out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
     */
    setPwmOutput(args) {
        this._peripheral.setPwmOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Read pin digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
    readDigitalPin(args) {
        return this._peripheral.readDigitalPin(args.PIN);
    }

    /**
     * Read analog pin.
     * @param {object} args - the block's arguments.
     * @return {number} - analog value fo the pin.
     */
    readAnalogPin(args) {
        return this._peripheral.readAnalogPin(args.PIN);
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    setServoOutput(args) {
        this._peripheral.setServoOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }
}

module.exports = OpenBlockArduinoEsp32CamDevice;