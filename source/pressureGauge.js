class PressureGauge {
    constructor(minPressure, maxPressure) {
        this._minPressure = minPressure;
        this._maxPressure = maxPressure;
    }

    isOutOfRange(value) {
        if (value < this._minPressure || 
            value > this._maxPressure) {
                return true;
            }
		
        return false;
    }
}

export default PressureGauge;
