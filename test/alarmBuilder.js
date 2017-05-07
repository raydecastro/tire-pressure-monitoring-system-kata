import PressureGauge from "../source/pressureGauge";
import PressureSensor from "../source/pressureSensor";
import SensorFake from "./sensorFake";
import Alarm from "../source/alarm";

class AlarmBuilder {
    constructor() {
        this._gauge = undefined;
        this._sensor = undefined;
    }

    withPressureGauge(minPressure, maxPressure) {
        this._gauge = new PressureGauge(minPressure, maxPressure);
        return this;
    }

    usingPressureSensor() {
        this._sensor = new PressureSensor();
        return this;
    }

    usingSensorFake(pressureValues) {
        this._sensor = new SensorFake(pressureValues);
        return this;
    }

    build() {
        return new Alarm(this._sensor, this._gauge);
    }
}

export default AlarmBuilder;
