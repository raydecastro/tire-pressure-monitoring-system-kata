import { expect } from "chai";
import Alarm from "../source/alarm";
import AlarmFake from "./alarmFake";

describe("Tire Pressure Monitoring System", () => {
	describe("Alarm", () => {
		it("shall do something", () => {
			const target = new Alarm();
			target.check();
		});

		it("shall be off during initialization", () => {
			const alarm = new Alarm();

			expect(alarm.alarmOn()).to.be.false;
		});

		it("shall be on when psiPressureValue < _lowPressureTreshold", () => {
			const alarm = new AlarmFake();
			alarm.check();

			expect(alarm.alarmOn()).to.be.true;
		});
	});
});
