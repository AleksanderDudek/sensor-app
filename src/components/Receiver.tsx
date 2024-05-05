import { SensorConfigData } from "../dto";
import {ProgressBar} from "./ProgressBar";

export type ReceiverProps = SensorConfigData

const Receiver = (sensorData: ReceiverProps) => {
    // TODO: Inactive state - shadow, etc.
    

    return <ProgressBar value={0.4} />;
}

export default Receiver