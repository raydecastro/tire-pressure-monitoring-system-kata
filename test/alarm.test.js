import { expect } from "chai";
import Alarm from "../source/alarm";
import PressureSensor from "../source/pressureSensor";
import FakeSensor from "./fakeSensor";
import PressureGauge from "../source/pressureGauge";
import AlarmBuilder from "./alarmBuilder";

describe("Tire Pressure Monitoring System", () => {
	describe("Alarm", () => {
		const MIN_PRESSURE = 17;
		const MAX_PRESSURE = 21;

		it("shall do something", () => {
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingPressureSensor()
				.build();

			alarm.check();
		});

		it("shall be off during initialization", () => {
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingPressureSensor()
				.build();

			expect(alarm.isOn()).to.be.false;
		});

		it("shall be on when psiPressureValue < _lowPressureTreshold", () => {
			const pressureValues = [16];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();

			alarm.check();

			expect(alarm.isOn()).to.be.true;
		});

		it("shall be off when psiPressureValue = _lowPressureTreshold", () => {
			const pressureValues = [17];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();

			alarm.check();

			expect(alarm.isOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _highPressureTreshold", () => {
			const pressureValues = [22];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();

			alarm.check();

			expect(alarm.isOn()).to.be.true;
		});

		it("shall be on when psiPressureValue = _highPressureTreshold", () => {
			const pressureValues = [21];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();
			
			alarm.check();

			expect(alarm.isOn()).to.be.false;
		});

		it("shall be on when psiPressureValue > _lowPressureTreshold and psiPressureValue < _highPressureTreshold", () => {
			const pressureValues = [20];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();

			alarm.check();

			expect(alarm.isOn()).to.be.false;
		});

		it("shall stay on when psiPressureValue < _lowPressureTreshold, and psiPressureValue  becomes > _lowPressureTreshold", () => {
			const pressureValues = [16, 18];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();
			
			alarm.check();

			expect(alarm.isOn()).to.be.true;

			alarm.check();

			expect(alarm.isOn()).to.be.true;
		});

		it("shall stay on when psiPressureValue > _highPressureTreshold, and psiPressureValue becomes < _highPressureTreshold", () => {
			const pressureValues = [22, 18];
			const alarm = new AlarmBuilder()
				.withPressureGauge(MIN_PRESSURE, MAX_PRESSURE)
				.usingFakeSensor(pressureValues)
				.build();

			alarm.check();

			expect(alarm.isOn()).to.be.true;

			alarm.check();

			expect(alarm.isOn()).to.be.true;
		});
	});
});
