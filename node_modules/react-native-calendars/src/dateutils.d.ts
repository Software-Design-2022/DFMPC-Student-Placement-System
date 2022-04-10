/// <reference types="xdate" />
export declare function sameMonth(a?: XDate, b?: XDate): boolean;
export declare function sameDate(a?: XDate, b?: XDate): boolean;
export declare function sameWeek(a: string, b: string, firstDayOfWeek: number): boolean | undefined;
export declare function isPastDate(date: string): boolean;
export declare function isToday(date?: XDate): boolean;
export declare function isGTE(a: XDate, b: XDate): boolean;
export declare function isLTE(a: XDate, b: XDate): boolean;
export declare function formatNumbers(date: any): any;
export declare function fromTo(a: XDate, b: XDate): XDate[];
export declare function month(date: XDate): import("xdate")[];
export declare function weekDayNames(firstDayOfWeek?: number): any;
export declare function page(date: XDate, firstDayOfWeek?: number, showSixWeeks?: boolean): import("xdate")[];
export declare function isDateNotInTheRange(minDate: XDate, maxDate: XDate, date: XDate): boolean;
export declare function getWeekDates(date: string, firstDay?: number, format?: string): any[] | undefined;
export declare function generateDay(originDate: string, daysOffset?: number): any;
