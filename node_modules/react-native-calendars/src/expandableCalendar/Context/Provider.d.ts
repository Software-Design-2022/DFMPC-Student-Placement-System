/// <reference types="react" />
import PropTypes from 'prop-types';
import { ViewStyle, ViewProps, StyleProp } from 'react-native';
import { Theme, DateData } from '../../types';
import { UpdateSources } from '../commons';
export interface CalendarContextProviderProps extends ViewProps {
    /** Specify theme properties to override specific styles for calendar parts */
    theme?: Theme;
    /** Specify style for calendar container element */
    style?: StyleProp<ViewStyle>;
    /** Initial date in 'yyyy-MM-dd' format. Default = now */
    date: string;
    /** Callback for date change event */
    onDateChanged?: (date: string, updateSource: UpdateSources) => void;
    /** Callback for month change event */
    onMonthChange?: (date: DateData, updateSource: UpdateSources) => void;
    /** Whether to show the today button */
    showTodayButton?: boolean;
    /** Today button's top position */
    todayBottomMargin?: number;
    /** Today button's style */
    todayButtonStyle?: ViewStyle;
    /** The opacity for the disabled today button (0-1) */
    disabledOpacity?: number;
}
/**
 * @description: Calendar context provider component
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/expandableCalendar.js
 */
declare const CalendarProvider: {
    (props: CalendarContextProviderProps): JSX.Element;
    displayName: string;
    propTypes: {
        date: PropTypes.Validator<any>;
        onDateChanged: PropTypes.Requireable<(...args: any[]) => any>;
        onMonthChange: PropTypes.Requireable<(...args: any[]) => any>;
        showTodayButton: PropTypes.Requireable<boolean>;
        todayBottomMargin: PropTypes.Requireable<number>;
        todayButtonStyle: PropTypes.Requireable<number | object>;
        disabledOpacity: PropTypes.Requireable<number>;
    };
};
export default CalendarProvider;
