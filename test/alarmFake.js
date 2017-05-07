import Alarm from "../source/alarm";

class AlarmFake extends Alarm {
    constructor() {
        super();
        this.sensorReading = 16; 
    }

    getPressure() {
        return this.sensorReading;
    }
}

export default AlarmFake;
