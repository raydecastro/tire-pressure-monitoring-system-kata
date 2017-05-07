import Gauge from "./interfaces/gauge";

class PressureGauge extends Gauge {
    constructor(minPressure, maxPressure) {
        super();
        this._minPressure = minPressure;
        this._maxPressure = maxPressure;
    }

    isOutOfRange(value) {
        return (this.isBelowMinimum(value) || this.isAboveMaximum(value));
    }

    isBelowMinimum(value) {
        return value < this._minPressure;
    }

    isAboveMaximum(value) {
        return value > this._maxPressure;
    }
}

export default PressureGauge;
