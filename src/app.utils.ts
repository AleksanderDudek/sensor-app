// this part should be mentioned during task talk
// enum EncoderType {
//     Fixed = 'fixed',
// }

enum QualityType {
    Alarm = 'Alarm',
    Normal = 'Normal',
    Warning = 'Warning',
}

export type HumanReadableSensorData = {
    id: number,
    sensorTypeName: string,
    value: number,
    signalQualityType: QualityType
}

export const formatSimulatorToHumanReadable = (simulatorTelegram: string = '$FIX, 3, Speed, 192, Normal*'): HumanReadableSensorData => {
    if(simulatorTelegram[0] != '$' || simulatorTelegram[-1] != '*') throw 'Format of the telegram is incorrect'

    const splitStringArray = (simulatorTelegram.slice(0)).replace(/\s/g, '').replace(/[\*\$]/g, '').split(',');

    const humanReadableData: HumanReadableSensorData = {
        id: Number(splitStringArray[1]),
        sensorTypeName: splitStringArray[2],
        value: Number(splitStringArray[3]),
        signalQualityType: QualityType[splitStringArray[4] as keyof typeof QualityType]
    }

    return humanReadableData;
}

// export class Simulator {
//     private encoderType: string = '';
//     // in HZ
//     private frequency: number = 0; 
//     private id: number = 0;
//     private maxValue: number = 0;
//     private minValue: number = 0;
//     private sensorTypeName: string = '';
   
//     private intervalID: number | undefined = undefined;
//     public outputSignal: string

//     constructor(data: Partial<SensorConfigData> = {}) {
//         this.outputSignal = '0'
//         this.mapSensorConfigDataToSimulator(data)
//     }

//     assessQuality = (sensorValue: number) => {
//         const rangeOfValues = this.maxValue - this.minValue
//     // Zakres: 120 - 300
//     // rangeOfValues = 180
//     // value = 270
//     // 270 - 120 = 150 (sensorValue - this.minValue)
//     // 150 na 180
//     // --> 0.88 * 100 = ok. 88
//         const normalizedValue = (sensorValue - this.minValue)/rangeOfValues;

//         const isOfAlarmQuality = (val: number) => val <= 0.1 || val >= 0.9
//         const isOfNormalQuality = (val: number) => val < 0.75 && val > 0.25
//         const isOfWarningQuality = (val: number) => val > 0.1 && val <= 0.25 || val < 0.9 && val >= 0.75

//         switch(true) {
//             case isOfAlarmQuality(normalizedValue):
//                 return QualityType.Alarm;
//             case isOfNormalQuality(normalizedValue):
//                 return QualityType.Normal;
//             case isOfWarningQuality(normalizedValue):
//                 return QualityType.Warning;
//             default:
//                 break
//         }


//     }

//     //$FIX, 3, Speed, 192, Normal*
//     // formatResponse
//     public formatCurrentSensorResponse = (sensorVal: number) => {
//         //console.log(`$FIX, ${this.id}, ${this.sensorTypeName}, ${sensorVal}, ${this.assessQuality(sensorVal)}`)
//         return `${'$FIX'}, ${this.id}, ${this.sensorTypeName}, ${sensorVal}, ${this.assessQuality(sensorVal)}`
//     }

//     // generateRandomValue
//     public generateRandomValue = () : number => {
//     //    this.generateRandomValue() wodotrysk
//     // upewnic sie co do przedzialow wartosci 
//         // console.log(Math.random(), Math.random() * this.maxValue, Math.random() * (this.maxValue) + this.minValue )

//        const randomVal = Math.floor(Math.random() * (this.maxValue) + this.minValue );
//        return randomVal
//     }

//     public getOutput = () => {
//         return this.outputSignal
//     }

//     startSignalGeneration = (frequency?: number)  => { 
//         const signalFrequency = frequency ?? this.frequency;
//         const id = setInterval(() => {
//             //console.log('test', this.outputSignal)
//             const newValue = this.generateRandomValue()
//             this.outputSignal = this.formatCurrentSensorResponse(newValue)
//         }, signalFrequency*1000); //example, add frequency
//         this.intervalID = id;
//     }

//     stopSignalGeneration = () => {
//         if (!this.intervalID) {
//             return
//         }

//         clearInterval(this.intervalID);
//         this.intervalID = undefined;
//     }

//     mapSensorConfigDataToSimulator = (data: Partial<SensorConfigData>) => {
//         this.encoderType = data.EncoderType ?? '';
//         this.frequency = data.Frequency ?? 0;
//         this.id = data.ID ?? 0;
//         this.maxValue = data.MaxValue ?? 0;
//         this.minValue = data.MinValue ?? 0;
//         this.sensorTypeName = data.Type ?? '';
//     }
// }



// // ./src/app --> folder
// // ./src/App --> komponent
// // SelectInput --> select-input.utils.ts --> select-input.utils

// type ObserverFn<TData = any, TResult = any> = (data: TData) => TResult

// // any -> illegal, TResult -> moze być 'any', ale po cichu
// // <TX = any>

// // (data: any)
// type X = ObserverFn<string, number>

// export class Observer<TData = any, TResult = any> {
//     private subscribers: ObserverFn<TData, TResult>[]; 

//     constructor(baseSubscribers?: ObserverFn<TData, TResult>[]) {
//         this.subscribers = [...(baseSubscribers ?? [])]
//     }

//     subscribe = (newSubscriber: ObserverFn<TData, TResult>) => { 
//         this.subscribers.push(newSubscriber)
//     }

//     unsubscribe = (subscriber: ObserverFn<TData, TResult>) => { 
//         this.subscribers = this.subscribers.filter((subscriberItem) => subscriberItem !== subscriber)
//     }

//     notifySubscribers = (data: TData) => {
//         //forEach vs map --> map jest szybszy w wykonaniu
//         this.subscribers.map((subscriber) => subscriber(data))
//     }
// }

// // const x = (data: TData) => {...; return result;}
// // type ObserverFn<TData, TResult> = (data: TData) => TResult
// // x === ObserverFn
// // <TData, TResult> -> typy generyczne, my ustalamy co tu moze się znaleźć
// // (data) === (data: TData) -> definicja parametrów funkcji
// // => {...} === => TResult -> typ wynikowy (wynik/rezultat) funkcji