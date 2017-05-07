import PressureSensor from "./pressureSensor";

class Alarm {
	constructor(sensor) {
		this._lowPressureTreshold = 17;
		this._highPressureTreshold = 21;
		this._sensor = sensor;
		this._alarmOn = false;
	}

	check() {
		let psiPressureValue = this.getPressure();

		if (psiPressureValue < this._lowPressureTreshold || this._highPressureTreshold < psiPressureValue)
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
