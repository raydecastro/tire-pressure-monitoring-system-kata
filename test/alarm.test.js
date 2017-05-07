import { expect } from "chai";
import Alarm from "../source/alarm";
import AlarmFake from "./alarmFake";
import PressureSensor from "../source/pressureSensor";
import SensorFake from "./sensorFake";

describe("Tire Pressure Monitoring System", () => {
	describe("Alarm", () => {
		it("shall do something", () => {
			const alarm = new Alarm(new PressureSensor());
			alarm.check();
		});

		it("shall be off during initialization", () => {
			const alarm = new Alarm(new PressureSensor());

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue < _lowPressureTreshold", () => {
			const pressureValues = [16];
			const alarm = new Alarm(new SensorFake(pressureValues));

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall be off when psiPressureValue = _lowPressureTreshold", () => {
			const pressureValues = [17];
			const alarm = new Alarm(new SensorFake(pressureValues));

			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _highPressureTreshold", () => {
			const pressureValues = [22];
			const alarm = new Alarm(new SensorFake(pressureValues));

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall be on when psiPressureValue = _highPressureTreshold", () => {
			const pressureValues = [21];
			const alarm = new Alarm(new SensorFake(pressureValues));
			
			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _lowPressureTreshold and psiPressureValue < _highPressureTreshold", () => {
			const pressureValues = [20];
			const alarm = new Alarm(new SensorFake(pressureValues));

			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall stay on when psiPressureValue < _lowPressureTreshold, and psiPressureValue  becomes > _lowPressureTreshold", () => {
			const pressureValues = [16, 18];
			const alarm = new Alarm(new SensorFake(pressureValues));
			
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall stay on when psiPressureValue > _highPressureTreshold, and psiPressureValue becomes < _highPressureTreshold", () => {
			const pressureValues = [22, 18];
			const alarm = new Alarm(new SensorFake(pressureValues));

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});
	});
});
