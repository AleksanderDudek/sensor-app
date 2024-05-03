import type { SensorConfigData } from "./dto";

enum EncoderType {
    Fixed = 'fixed',
}

enum QualityType {
    Alarm = 'Alarm',
    Normal = 'Normal',
    Warning = 'Warning',
}



class Simulator {
    private encoderType: string = '';
    private frequency: number = 0;
    private id: number = 0;
    private maxValue: number = 0;
    private minValue: number = 0;
    private sensorTypeName: string = '';
   


    constructor(data: Partial<SensorConfigData> = {}) {
        this.mapSensorConfigDataToSimulator(data)
    }

    assessQuality = (value: number) => {
        // min / max 
    }

    //$FIX, 3, Speed, 192, Normal*
    // formatResponse
    formatResponse = () => {
        return `$FIX, ${this.id}, ${(this.sensorTypeName)} `
    }

    // generateRandomValue
    generateRandomValue = () : number => {
    //    this.generateRandomValue() wodotrysk
    // upewnic sie co do przedzialow wartosci 
       const randomVal = Math.floor(Math.random() * (this.maxValue - this.minValue) + this.minValue);
       return randomVal
    }

    mapSensorConfigDataToSimulator = (data: Partial<SensorConfigData>) => {
        this.encoderType = data.EncoderType ?? '';
        this.frequency = data.Frequency ?? 0;
        this.id = data.ID ?? 0;
        this.maxValue = data.MaxValue ?? 0;
        this.minValue = data.MinValue ?? 0;
        this.sensorTypeName = data.Type ?? '';
    }
    

    // ^...$
    //$FIX, 3, Speed, 192, Normal*
    
}



// ./src/app --> folder
// ./src/App --> komponent
// SelectInput --> select-input.utils.ts --> select-input.utils

type ObserverFn<TData = any, TResult = any> = (data: TData) => TResult

// any -> illegal, TResult -> moze być 'any', ale po cichu
// <TX = any>

// (data: any)
type X = ObserverFn<string, number>

class Observer<TData = any, TResult = any> {
    private subscribers: ObserverFn<TData, TResult>[]; 

    constructor(baseSubscribers?: ObserverFn<TData, TResult>[]) {
        this.subscribers = [...(baseSubscribers ?? [])]
    }

    subscribe = (newSubscriber: ObserverFn<TData, TResult>) => { 
        this.subscribers.push(newSubscriber)
    }

    unsubscribe = (subscriber: ObserverFn<TData, TResult>) => { 
        this.subscribers = this.subscribers.filter((subscriberItem) => subscriberItem !== subscriber)
    }

    notifySubscribers = (data: TData) => {
        //forEach vs map --> map jest szybszy w wykonaniu
        this.subscribers.map((subscriber) => subscriber(data))
    }
}

// const x = (data: TData) => {...; return result;}
// type ObserverFn<TData, TResult> = (data: TData) => TResult
// x === ObserverFn
// <TData, TResult> -> typy generyczne, my ustalamy co tu moze się znaleźć
// (data) === (data: TData) -> definicja parametrów funkcji
// => {...} === => TResult -> typ wynikowy (wynik/rezultat) funkcji