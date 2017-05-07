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
			const alarm = new Alarm(new SensorFake(16));

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall be off when psiPressureValue = _lowPressureTreshold", () => {
			const alarm = new Alarm(new SensorFake(17));

			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _highPressureTreshold", () => {
			const alarm = new Alarm(new SensorFake(22));

			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall be on when psiPressureValue = _highPressureTreshold", () => {
			const alarm = new Alarm(new SensorFake(21));
			
			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _lowPressureTreshold and psiPressureValue < _highPressureTreshold", () => {
			const alarm = new Alarm(new SensorFake(20));

			alarm.check();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall stay on when psiPressureValue < _lowPressureTreshold, and psiPressureValue  becomes > _lowPressureTreshold", () => {
			const alarm = new AlarmFake();
			
			alarm.sensorReading = 16; 
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;

			alarm.sensorReading = 18; 
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});

		it("shall stay on when psiPressureValue > _highPressureTreshold, and psiPressureValue becomes < _highPressureTreshold", () => {
			const alarm = new AlarmFake();
			
			alarm.sensorReading = 22; 
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;

			alarm.sensorReading = 18; 
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});
	});
});
