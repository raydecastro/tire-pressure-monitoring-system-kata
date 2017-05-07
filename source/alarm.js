import PressureSensor from "./pressureSensor";

class Alarm {
	constructor(sensor, gauge) {
		this._sensor = sensor;
		this._gauge = gauge;
		this._alarmOn = false;
	}

	check() {
		if (this._gauge.isOutOfRange(this.getPressure()))
		{
			this._alarmOn = true;
		}
	}

	getPressure() {
		return this._sensor.probe();
	}

	alarmOn() {
		 return this._alarmOn;
	}
}

export default Alarm;
