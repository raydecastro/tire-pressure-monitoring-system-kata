import Alarm from "../source/alarm";

class AlarmFake extends Alarm {
    getPressure() {
        return 16;
    }
}

export default AlarmFake;
