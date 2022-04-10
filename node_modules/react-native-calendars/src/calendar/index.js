import PropTypes from 'prop-types';
import XDate from 'xdate';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
// @ts-expect-error
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import constants from '../commons/constants';
import { page, isGTE, isLTE, sameMonth } from '../dateutils';
import { xdateToData, parseDate, toMarkingFormat } from '../interface';
import { getState } from '../day-state-manager';
import { extractComponentProps } from '../componentUpdater';
// @ts-expect-error
import { WEEK_NUMBER } from '../testIDs';
import styleConstructor from './style';
import CalendarHeader from './header';
import Day from './day/index';
import BasicDay from './day/basic';
/**
 * @description: Calendar component
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/calendars.js
 * @gif: https://github.com/wix/react-native-calendars/blob/master/demo/assets/calendar.gif
 */
const Calendar = (props) => {
    const { initialDate, current, theme, disableMonthChange, allowSelectionOutOfRange, minDate, maxDate, onDayPress, onDayLongPress, hideExtraDays, markedDates, firstDay, showSixWeeks, customHeader, headerStyle, displayLoadingIndicator, testID, enableSwipeMonths, accessibilityElementsHidden, importantForAccessibility, onMonthChange, onVisibleMonthsChange, style: propsStyle } = props;
    const [currentMonth, setCurrentMonth] = useState(current || initialDate ? parseDate(current || initialDate) : new XDate());
    const style = useRef(styleConstructor(theme));
    const header = useRef();
    const isMounted = useRef(false);
    useEffect(() => {
        if (initialDate) {
            setCurrentMonth(parseDate(initialDate));
        }
    }, [initialDate]);
    useEffect(() => {
        if (isMounted.current) {
            // Avoid callbacks call on mount
            const _currentMonth = currentMonth.clone();
            onMonthChange?.(xdateToData(_currentMonth));
            onVisibleMonthsChange?.([xdateToData(_currentMonth)]);
        }
        else {
            isMounted.current = true;
        }
    }, [currentMonth]);
    const updateMonth = (newMonth) => {
        if (sameMonth(newMonth, currentMonth)) {
            return;
        }
        setCurrentMonth(newMonth);
    };
    const addMonth = useCallback((count) => {
        const newMonth = currentMonth.clone().addMonths(count, true);
        updateMonth(newMonth);
    }, [currentMonth, updateMonth]);
    const handleDayInteraction = useCallback((date, interaction) => {
        const day = parseDate(date);
        const min = parseDate(minDate);
        const max = parseDate(maxDate);
        if (allowSelectionOutOfRange || !(min && !isGTE(day, min)) && !(max && !isLTE(day, max))) {
            if (!disableMonthChange) {
                updateMonth(day);
            }
            if (interaction) {
                interaction(date);
            }
        }
    }, [minDate, maxDate, allowSelectionOutOfRange, disableMonthChange, updateMonth]);
    const onPressDay = useCallback((date) => {
        if (date)
            handleDayInteraction(date, onDayPress);
    }, [handleDayInteraction, onDayPress]);
    const onLongPressDay = useCallback((date) => {
        if (date)
            handleDayInteraction(date, onDayLongPress);
    }, [handleDayInteraction, onDayLongPress]);
    const onSwipeLeft = useCallback(() => {
        // @ts-expect-error
        header.current?.onPressRight();
    }, [header]);
    const onSwipeRight = useCallback(() => {
        // @ts-expect-error
        header.current?.onPressLeft();
    }, [header]);
    const onSwipe = useCallback((gestureName) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
            case SWIPE_DOWN:
                break;
            case SWIPE_LEFT:
                constants.isRTL ? onSwipeRight() : onSwipeLeft();
                break;
            case SWIPE_RIGHT:
                constants.isRTL ? onSwipeLeft() : onSwipeRight();
                break;
        }
    }, [onSwipeLeft, onSwipeRight]);
    const renderWeekNumber = (weekNumber) => {
        return (<View style={style.current.dayContainer} key={`week-container-${weekNumber}`}>
        <BasicDay key={`week-${weekNumber}`} marking={{ disabled: true, disableTouchEvent: true }} 
        // state='disabled'
        theme={theme} testID={`${WEEK_NUMBER}-${weekNumber}`}>
          {weekNumber}
        </BasicDay>
      </View>);
    };
    const renderDay = (day, id) => {
        const dayProps = extractComponentProps(Day, props);
        if (!sameMonth(day, currentMonth) && hideExtraDays) {
            return <View key={id} style={style.current.emptyDayContainer}/>;
        }
        return (<View style={style.current.dayContainer} key={id}>
        <Day {...dayProps} date={toMarkingFormat(day)} state={getState(day, currentMonth, props)} marking={markedDates?.[toMarkingFormat(day)]} onPress={onPressDay} onLongPress={onLongPressDay}/>
      </View>);
    };
    const renderWeek = (days, id) => {
        const week = [];
        days.forEach((day, id2) => {
            week.push(renderDay(day, id2));
        }, this);
        if (props.showWeekNumbers) {
            week.unshift(renderWeekNumber(days[days.length - 1].getWeek()));
        }
        return (<View style={style.current.week} key={id}>
        {week}
      </View>);
    };
    const renderMonth = () => {
        const shouldShowSixWeeks = showSixWeeks && !hideExtraDays;
        const days = page(currentMonth, firstDay, shouldShowSixWeeks);
        const weeks = [];
        while (days.length) {
            weeks.push(renderWeek(days.splice(0, 7), weeks.length));
        }
        return <View style={style.current.monthView}>{weeks}</View>;
    };
    const renderHeader = () => {
        let indicator;
        if (currentMonth) {
            const lastMonthOfDay = toMarkingFormat(currentMonth.clone().addMonths(1, true).setDate(1).addDays(-1));
            if (displayLoadingIndicator && !markedDates?.[lastMonthOfDay]) {
                indicator = true;
            }
        }
        const headerProps = extractComponentProps(CalendarHeader, props);
        const ref = customHeader ? undefined : header;
        const CustomHeader = customHeader;
        const HeaderComponent = customHeader ? CustomHeader : CalendarHeader;
        return (<HeaderComponent {...headerProps} testID={testID} style={headerStyle} ref={ref} month={currentMonth} addMonth={addMonth} displayLoadingIndicator={indicator}/>);
    };
    const GestureComponent = enableSwipeMonths ? GestureRecognizer : View;
    const swipeProps = {
        onSwipe: (direction) => onSwipe(direction)
    };
    const gestureProps = enableSwipeMonths ? swipeProps : undefined;
    return (<GestureComponent {...gestureProps}>
      <View style={[style.current.container, propsStyle]} accessibilityElementsHidden={accessibilityElementsHidden} // iOS
     importantForAccessibility={importantForAccessibility} // Android
    >
        {renderHeader()}
        {renderMonth()}
      </View>
    </GestureComponent>);
};
export default Calendar;
Calendar.displayName = 'Calendar';
Calendar.propTypes = {
    ...CalendarHeader.propTypes,
    ...Day.propTypes,
    theme: PropTypes.object,
    firstDay: PropTypes.number,
    displayLoadingIndicator: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
    current: PropTypes.string,
    initialDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    markedDates: PropTypes.object,
    hideExtraDays: PropTypes.bool,
    showSixWeeks: PropTypes.bool,
    onDayPress: PropTypes.func,
    onDayLongPress: PropTypes.func,
    onMonthChange: PropTypes.func,
    onVisibleMonthsChange: PropTypes.func,
    disableMonthChange: PropTypes.bool,
    enableSwipeMonths: PropTypes.bool,
    disabledByDefault: PropTypes.bool,
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    customHeader: PropTypes.any,
    allowSelectionOutOfRange: PropTypes.bool
};
Calendar.defaultProps = {
    enableSwipeMonths: false
};
