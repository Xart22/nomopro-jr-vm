class WebSerialPort {
    constructor(
        runtime,
        deviceId,
        peripheralOptions,
        connectCallback = null,
        resetCallback = null
    ) {
        this.port = null;
        this.reader = null;
        this.inputDone = false;
        this.outputDone = false;
        this.baudRate;
        this.readLoop = this.readLoop.bind(this);
        this.peripheralOptions = peripheralOptions;
    }

    async scan() {
        console.log("Requesting port");
        console.log(this.peripheralOptions);
        const port = await navigator.serial.requestPort();

        console.log(port);
        return port;
    }

    async connect() {
        console.log("Requesting port");
        this.port = await navigator.serial.requestPort({
            filters: [this.peripheralOptions],
        });
        await this.port.open({ baudRate: 115200 });
        this.reader = this.port.readable.getReader();
        this.readLoop();
    }

    async readLoop() {
        while (true) {
            const { value, done } = await this.reader.read();
            if (done) {
                this.reader.releaseLock();
                break;
            }
            console.log(value);
        }
    }

    async write(data) {
        const writer = this.port.writable.getWriter();
        await writer.write(data);
        writer.releaseLock();
    }

    isConnected() {
        return this.port == null ? false : true;
    }

    disconnect() {
        this.port = null;
    }
}

module.exports = WebSerialPort;
