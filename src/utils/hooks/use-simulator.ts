import { useRef, useState } from "react"
import { SensorConfigData } from "../../dto";

enum QualityType {
    Alarm = 'Alarm',
    Normal = 'Normal',
    Warning = 'Warning',
}

export type SimulatorOutput = {
    output: string;
    start: (freqeuncy?: number) => void;
    stop: () => void;
    getIntervalID: () => number | null;
}

export const useSimulator = (data: Partial<SensorConfigData>): SimulatorOutput => {
    let encoderType: string = '';
    // in HZ
    let frequency: number = 0;
    let id: number = 0;
    let maxValue: number = 0;
    let minValue: number = 0;
    let sensorTypeName: string = '';

    const intervalID = useRef<null | number>(null);
    //to powinna byc zmienna stanowa, ktora sie odswieza
    const [outputSignal, setOutputSignal] = useState('')

    const assessQuality = (sensorValue: number) => {
        const rangeOfValues = maxValue - minValue
        // Zakres: 120 - 300
        // rangeOfValues = 180
        // value = 270
        // 270 - 120 = 150 (sensorValue - minValue)
        // 150 na 180
        // --> 0.88 * 100 = ok. 88
        const normalizedValue = (sensorValue - minValue) / rangeOfValues;

        const isOfAlarmQuality = (val: number) => val <= 0.1 || val >= 0.9
        const isOfNormalQuality = (val: number) => val < 0.75 && val > 0.25
        const isOfWarningQuality = (val: number) => val > 0.1 && val <= 0.25 || val < 0.9 && val >= 0.75

        switch (true) {
            case isOfAlarmQuality(normalizedValue):
                return QualityType.Alarm;
            case isOfNormalQuality(normalizedValue):
                return QualityType.Normal;
            case isOfWarningQuality(normalizedValue):
                return QualityType.Warning;
            default:
                break
        }


    }

    //$FIX, 3, Speed, 192, Normal*
    // formatResponse
    const formatCurrentSensorResponse = (sensorVal: number) => {
        //console.log(`$FIX, ${id}, ${sensorTypeName}, ${sensorVal}, ${assessQuality(sensorVal)}`)
        return `${'$FIX'}, ${id}, ${sensorTypeName}, ${sensorVal}, ${assessQuality(sensorVal)}`
    }

    // generateRandomValue
    const generateRandomValue = (): number => {
        //    generateRandomValue() wodotrysk
        // upewnic sie co do przedzialow wartosci 
        // console.log(Math.random(), Math.random() * maxValue, Math.random() * (maxValue) + minValue )

        const randomVal = Math.floor(Math.random() * (maxValue) + minValue);
        return randomVal
    }

    //'constructor'
    const mapSensorConfigDataToSimulator = () => {
        encoderType = data.EncoderType ?? '';
        frequency = data.Frequency ?? 0;
        id = data.ID ?? 0;
        maxValue = data.MaxValue ?? 0;
        minValue = data.MinValue ?? 0;
        sensorTypeName = data.Type ?? '';
    }

    const startSignalGeneration = (inputfrequency?: number) => {
        const signalFrequency = inputfrequency ?? frequency;


        console.log("start");
        if (intervalID.current) return;
        const id = setInterval(() => {
            //console.log('test', outputSignal)
            const newValue = generateRandomValue()
            setOutputSignal(formatCurrentSensorResponse(newValue))
        }, signalFrequency * 1000); //example, add frequency
        intervalID.current = id;
    }

    const stopSignalGeneration = () => {
        console.log("stop");
        if (!intervalID.current) return;

        clearInterval(intervalID.current);
        intervalID.current = null;
    }

    const getIntervalID = () => {
        return intervalID.current;
    };





    // IFEE 'constructor'
    mapSensorConfigDataToSimulator()

    return {
        output: outputSignal,
        start: startSignalGeneration,
        stop: stopSignalGeneration,
        getIntervalID,
    }
}
