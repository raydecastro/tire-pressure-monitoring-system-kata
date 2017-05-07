import { expect } from "chai";
import Alarm from "../source/alarm";

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
	});
});
