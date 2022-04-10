import XDate from 'xdate';
import React, { Component } from 'react';
import { Animated, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { DateData, AgendaSchedule } from '../types';
import { CalendarListProps } from '../calendar-list';
import ReservationList, { ReservationListProps } from './reservation-list';
export declare type AgendaProps = CalendarListProps & ReservationListProps & {
    /** the list of items that have to be displayed in agenda. If you want to render item as empty date
    the value of date key kas to be an empty array []. If there exists no value for date key it is
    considered that the date in question is not yet loaded */
    items?: AgendaSchedule;
    /** callback that gets called when items for a certain month should be loaded (month became visible) */
    loadItemsForMonth?: (data: DateData) => void;
    /** callback that fires when the calendar is opened or closed */
    onCalendarToggled?: (enabled: boolean) => void;
    /** callback that gets called when day changes while scrolling agenda list */
    onDayChange?: (data: DateData) => void;
    /** specify how agenda knob should look like */
    renderKnob?: () => JSX.Element;
    /** initially selected day */
    selected?: string;
    /** Hide knob button. Default = false */
    hideKnob?: boolean;
    /** Whether the knob should always be visible (when hideKnob = false) */
    showClosingKnob?: boolean;
};
declare type State = {
    scrollY: Animated.Value;
    calendarIsReady: boolean;
    calendarScrollable: boolean;
    firstReservationLoad: boolean;
    selectedDay: XDate;
    topDay: XDate;
};
/**
 * @description: Agenda component
 * @extends: CalendarList
 * @extendslink: docs/CalendarList
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/agenda.js
 * @gif: https://github.com/wix/react-native-calendars/blob/master/demo/assets/agenda.gif
 */
export default class Agenda extends Component<AgendaProps, State> {
    static displayName: string;
    static propTypes: any;
    private style;
    private viewHeight;
    private viewWidth;
    private scrollTimeout?;
    private headerState;
    private currentMonth;
    private knobTracker;
    private _isMounted;
    private scrollPad;
    private calendar;
    private knob;
    list: React.RefObject<ReservationList>;
    constructor(props: AgendaProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: AgendaProps, prevState: State): void;
    static getDerivedStateFromProps(nextProps: AgendaProps): {
        firstReservationLoad: boolean;
    } | null;
    getSelectedDate(selected?: string): any;
    calendarOffset(): number;
    initialScrollPadPosition: () => number;
    setScrollPadPosition: (y: number, animated: boolean) => void;
    toggleCalendarPosition: (open: boolean) => void;
    enableCalendarScrolling(enable?: boolean): void;
    loadReservations(props: AgendaProps): void;
    onDayPress: (d: DateData) => void;
    chooseDay(d: DateData, optimisticScroll: boolean): void;
    generateMarkings: (this: any, selectedDay: any, markedDates: any, items: any) => any;
    onScrollPadLayout: () => void;
    onCalendarListLayout: () => void;
    onLayout: (event: LayoutChangeEvent) => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onStartDrag: () => void;
    onSnapAfterDrag: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onVisibleMonthsChange: (months: DateData[]) => void;
    onDayChange: (day: XDate) => void;
    renderReservations(): JSX.Element;
    renderCalendarList(): JSX.Element;
    renderKnob(): JSX.Element | null;
    renderWeekDaysNames: () => JSX.Element;
    renderWeekNumbersSpace: () => false | JSX.Element | undefined;
    render(): JSX.Element;
}
export {};
