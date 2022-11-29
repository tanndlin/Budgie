/* eslint-disable @typescript-eslint/no-unused-vars */
interface IBill extends IEvent {
    isPaid: Date[];
    frequency: Number;
    categoryId: Number;
}

interface IEvent {
    name: string;
    startDate: Date;
    endDate: Date;
    allDay?: boolean;
    resource?: any;
}
