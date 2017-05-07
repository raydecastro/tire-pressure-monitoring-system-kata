class PressureSensor {
    probe() {
        return this.popNextPressurePsiValue();
    }

    static Offset() {
		return 16; 
	}

	static SamplePressure() {
		// placeholder implementation that simulate a real sensor in a real tire

		let pressureTelemetryValue = Math.floor(6 * Math.random() * Math.random());
		return pressureTelemetryValue;
	}

	popNextPressurePsiValue() {
		let pressureTelemetryValue = PressureSensor.SamplePressure();

		return PressureSensor.Offset() + pressureTelemetryValue;
	}
}

export default PressureSensor;
