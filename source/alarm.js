class Alarm {
	constructor(sensor, gauge) {
		this._sensor = sensor;
		this._gauge = gauge;
		this._alarmOn = false;
	}

	check() {
		if (this._gauge.isOutOfRange(this._sensor.probe())) {
			this._alarmOn = true;
		}
	}

	alarmOn() {
		 return this._alarmOn;
	}
}

export default Alarm;
