class WebSerialPort {
    constructor(
        runtime,
        deviceId,
        peripheralOptions,
        serialConfig,
        connectCallback,
        resetCallback
    ) {
        this._runtime = runtime;
        this.port;
        this.reader;
        this.inputDone = false;
        this.outputDone = false;
        this.baudRate;
        this.peripheralOptions = peripheralOptions;
        this.serialConfig = serialConfig;
        this._connectCallback = connectCallback;
    }

    async scan() {
        try {
            const filters = this.peripheralOptions;
            const serialConfig = this.serialConfig;
            const port = await navigator.serial.requestPort({ filters });
            await port.open({ baudRate: serialConfig.baudRate });
            const reader = port.readable.getReader();
            this.readData(reader);
            console.log(this._runtime);
            this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
            if (this._connectCallback) {
                this._connectCallback();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readData(reader) {
        while (true) {
            try {
                const { value, done } = await reader.read();
                if (done) {
                    reader.releaseLock();
                    break;
                }
                console.log("Menerima data:", value);
            } catch (error) {
                console.error("Gagal membaca data:", error);
            }
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
