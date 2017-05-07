class SensorFake {
    constructor(probeValues) {
        this._probeValues = probeValues;
        this._currentIndex = 0;
    }

    probe() {
        return this.getNextProbeValue();
    }

    getNextProbeValue() {
        let probeValue = this._probeValues[this._currentIndex];
        this._currentIndex++; 

        if(this.isCurrentIndexBeyondValidRange()) {
            this._currentIndex = 0;
        }

        return probeValue;
    }

    isCurrentIndexBeyondValidRange() {
        return this._currentIndex >= this._probeValues.length;
    }
}

export default SensorFake;
