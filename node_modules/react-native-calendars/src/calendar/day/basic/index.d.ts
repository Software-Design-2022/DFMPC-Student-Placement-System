/// <reference types="react" />
import PropTypes from 'prop-types';
import { ViewProps } from 'react-native';
import { Theme, DayState, MarkingTypes, DateData } from '../../../types';
import { MarkingProps } from '../marking';
export interface BasicDayProps extends ViewProps {
    state?: DayState;
    /** The marking object */
    marking?: MarkingProps;
    /** Date marking style [simple/period/multi-dot/multi-period]. Default = 'simple' */
    markingType?: MarkingTypes;
    /** Theme object */
    theme?: Theme;
    /** onPress callback */
    onPress?: (date?: DateData) => void;
    /** onLongPress callback */
    onLongPress?: (date?: DateData) => void;
    /** The date to return from press callbacks */
    date?: string;
    /** Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates*/
    disableAllTouchEventsForDisabledDays?: boolean;
    /** Disable all touch events for inactive days. can be override with disableTouchEvent in markedDates*/
    disableAllTouchEventsForInactiveDays?: boolean;
    /** Test ID */
    testID?: string;
    /** Accessibility label */
    accessibilityLabel?: string;
}
declare const BasicDay: {
    (props: BasicDayProps): JSX.Element;
    displayName: string;
    propTypes: {
        state: PropTypes.Requireable<string>;
        marking: PropTypes.Requireable<any>;
        markingType: PropTypes.Requireable<import("../marking").Markings>;
        theme: PropTypes.Requireable<object>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        date: PropTypes.Requireable<string>;
        disableAllTouchEventsForDisabledDays: PropTypes.Requireable<boolean>;
        disableAllTouchEventsForInactiveDays: PropTypes.Requireable<boolean>;
    };
};
export default BasicDay;
