import XDate from 'xdate';
import React, { Component } from 'react';
import { FlatList, ViewStyle, LayoutChangeEvent, FlatListProps } from 'react-native';
import { CalendarProps } from '../calendar';
export interface CalendarListProps extends CalendarProps, Omit<FlatListProps<any>, 'data' | 'renderItem'> {
    /** Max amount of months allowed to scroll to the past. Default = 50 */
    pastScrollRange?: number;
    /** Max amount of months allowed to scroll to the future. Default = 50 */
    futureScrollRange?: number;
    /** Used when calendar scroll is horizontal, default is device width, pagination should be disabled */
    calendarWidth?: number;
    /** Dynamic calendar height */
    calendarHeight?: number;
    /** Style for the List item (the calendar) */
    calendarStyle?: ViewStyle;
    /** Whether to use static header that will not scroll with the list (horizontal only) */
    staticHeader?: boolean;
    /** Enable or disable vertical / horizontal scroll indicator. Default = false */
    showScrollIndicator?: boolean;
    /** Whether to animate the auto month scroll */
    animateScroll?: boolean;
    /** Enable or disable scrolling of calendar list */
    scrollEnabled?: boolean;
    /** When true, the calendar list scrolls to top when the status bar is tapped. Default = true */
    scrollsToTop?: boolean;
    /** Enable or disable paging on scroll */
    pagingEnabled?: boolean;
    /** Whether the scroll is horizontal */
    horizontal?: boolean;
    /** Should Keyboard persist taps */
    keyboardShouldPersistTaps?: 'never' | 'always' | 'handled';
    /** A custom key extractor for the generated calendar months */
    keyExtractor?: (item: any, index: number) => string;
    /** How far from the end to trigger the onEndReached callback */
    onEndReachedThreshold?: number;
    /** Called once when the scroll position gets within onEndReachedThreshold */
    onEndReached?: () => void;
    /** onLayout event */
    onLayout?: (event: LayoutChangeEvent) => void;
    removeClippedSubviews?: boolean;
    testID?: string;
}
declare type XDateAndBump = XDate & {
    propBump?: number;
};
declare type State = {
    rows: Array<XDateAndBump>;
    texts: Array<string>;
    openDate: XDate;
    currentMonth: XDate;
};
/**
 * @description: Calendar List component for both vertical and horizontal calendars
 * @extends: Calendar
 * @extendslink: docs/Calendar
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/calendarsList.js
 * @gif: https://github.com/wix/react-native-calendars/blob/master/demo/assets/calendar-list.gif
 */
declare class CalendarList extends Component<CalendarListProps, State> {
    static displayName: string;
    static propTypes: any;
    static defaultProps: {
        calendarWidth: number;
        calendarHeight: number;
        pastScrollRange: number;
        futureScrollRange: number;
        showScrollIndicator: boolean;
        horizontal: boolean;
        scrollsToTop: boolean;
        scrollEnabled: boolean;
        removeClippedSubviews: boolean;
        keyExtractor: (_: any, index: number) => string;
    };
    style: any;
    list: React.RefObject<FlatList>;
    viewabilityConfig: {
        itemVisiblePercentThreshold: number;
    };
    constructor(props: CalendarListProps);
    componentDidUpdate(prevProps: CalendarListProps): void;
    static getDerivedStateFromProps(_: CalendarListProps, prevState: State): {
        rows: (string | XDate)[];
    };
    scrollToDay(d: XDate, offset: number, animated: boolean): void;
    scrollToMonth: (m: XDate) => void;
    getItemLayout: (_: Array<XDateAndBump> | undefined | null, index: number) => {
        length: number;
        offset: number;
        index: number;
    };
    getMonthIndex(month: XDate): number;
    addMonth: (count: number) => void;
    updateMonth(day: XDate): void;
    onViewableItemsChanged: ({ viewableItems }: any) => void;
    renderItem: ({ item }: any) => JSX.Element;
    renderStaticHeader(): JSX.Element | undefined;
    render(): JSX.Element;
}
export default CalendarList;
