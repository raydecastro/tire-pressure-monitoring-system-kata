import { expect } from "chai";
import Alarm from "../source/alarm";
import PressureSensor from "../source/pressureSensor";
import SensorFake from "./sensorFake";
import PressureGauge from "../source/pressureGauge";

describe("Tire Pressure Monitoring System", () => {
	describe("Alarm", () => {
		it("shall do something", () => {
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const sensor = new PressureSensor();
			const alarm = new Alarm(sensor, gauge);
			alarm.check();
		});

		it("shall be off during initialization", () => {
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const sensor = new PressureSensor();
			const alarm = new Alarm(sensor, gauge);

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue < _lowPressureTreshold", () => {
			const pressureValues = [16];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall be off when psiPressureValue = _lowPressureTreshold", () => {
			const pressureValues = [17];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);

			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _highPressureTreshold", () => {
			const pressureValues = [22];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall be on when psiPressureValue = _highPressureTreshold", () => {
			const pressureValues = [21];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);
			
			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _lowPressureTreshold and psiPressureValue < _highPressureTreshold", () => {
			const pressureValues = [20];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);

			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall stay on when psiPressureValue < _lowPressureTreshold, and psiPressureValue  becomes > _lowPressureTreshold", () => {
			const pressureValues = [16, 18];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);
			
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall stay on when psiPressureValue > _highPressureTreshold, and psiPressureValue becomes < _highPressureTreshold", () => {
			const pressureValues = [22, 18];
			const sensor = new SensorFake(pressureValues);
			const minPressure = 17;
			const maxPressure = 21;
			const gauge = new PressureGauge(minPressure, maxPressure);
			const alarm = new Alarm(sensor, gauge);

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});
	});
});
