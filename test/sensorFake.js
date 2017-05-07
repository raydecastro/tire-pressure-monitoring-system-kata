import Sensor from "../source/sensor";

class SensorFake extends Sensor {
    constructor(probeValue) {
        super();
        this._probeValue = probeValue;
    }

    probe() {
        return this._probeValue;
    }
}

export default SensorFake;
