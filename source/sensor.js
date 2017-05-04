class Sensor {
	static Offset() {
		return 16; 
	}

	static SamplePressure() {
		// placeholder implementation that simulate a real sensor in a real tire

		let pressureTelemetryValue = Math.floor(6 * Math.random() * Math.random());
		return pressureTelemetryValue;
	}

	popNextPressurePsiValue() {
		let pressureTelemetryValue = Sensor.SamplePressure();

		return Sensor.Offset() + pressureTelemetryValue;
	}
}

export default Sensor;
