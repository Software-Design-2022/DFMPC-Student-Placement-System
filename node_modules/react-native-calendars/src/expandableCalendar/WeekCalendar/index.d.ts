import React from 'react';
import { CalendarListProps } from '../../calendar-list';
export interface WeekCalendarProps extends CalendarListProps {
    /** whether to have shadow/elevation for the calendar */
    allowShadow?: boolean;
    /** whether to hide the names of the week days */
    hideDayNames?: boolean;
    context?: any;
}
declare const _default: React.ComponentClass<WeekCalendarProps, any>;
export default _default;
