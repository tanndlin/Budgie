/* eslint-disable @typescript-eslint/no-unused-vars */
interface IBill extends IEvent {
    lastPaidDate: Date;
    frequency: Number;
    categoryID: Number;
}

interface IEvent {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
}
