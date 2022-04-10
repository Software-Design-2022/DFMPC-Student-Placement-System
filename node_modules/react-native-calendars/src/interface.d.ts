/// <reference types="xdate" />
export declare function padNumber(n: number): string | number;
export declare function xdateToData(d: XDate): {
    year: number;
    month: number;
    day: number;
    timestamp: any;
    dateString: string;
};
export declare function parseDate(d?: any): any;
export declare function toMarkingFormat(d: XDate): string;
