import Sensor from "./sensor";

class Alarm {
	constructor() {
		this._lowPressureTreshold = 17;
		this._highPressureTreshold = 21;
		this._sensor = new Sensor();
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
		return this._sensor.popNextPressurePsiValue();
	}

	alarmOn() {
		 return this._alarmOn;
	}
}

export default Alarm;
