class Alarm {
	constructor(sensor, gauge) {
		this._sensor = sensor;
		this._gauge = gauge;
		this._isOn = false;
	}

	check() {
		if (this._gauge.isOutOfRange(this._sensor.probe())) {
			this._isOn = true;
		}
	}

	isOn() {
		 return this._isOn;
	}
}

export default Alarm;
