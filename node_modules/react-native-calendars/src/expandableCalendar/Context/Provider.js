import PropTypes from 'prop-types';
import XDate from 'xdate';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { toMarkingFormat } from '../../interface';
import styleConstructor from '../style';
import { UpdateSources } from '../commons';
import CalendarContext from './index';
import { getButtonIcon, setDate, setDisabled, shouldAnimateTodayButton, getPositionAnimation, shouldAnimateOpacity, getOpacityAnimation, getTodayDate, getTodayFormatted } from './Presenter';
const TOP_POSITION = 65;
/**
 * @description: Calendar context provider component
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/expandableCalendar.js
 */
const CalendarProvider = (props) => {
    const { theme, date, showTodayButton = false, todayBottomMargin, todayButtonStyle, style: propsStyle, children } = props;
    const style = useRef(styleConstructor(theme));
    const [prevDate, setPrevDate] = useState(date);
    const [currentDate, setCurrentDate] = useState(date);
    const [updateSource, setUpdateSource] = useState(UpdateSources.CALENDAR_INIT);
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonIcon, setButtonIcon] = useState(getButtonIcon(date || toMarkingFormat(new XDate()), showTodayButton));
    const buttonY = useRef(new Animated.Value(todayBottomMargin ? -todayBottomMargin : -TOP_POSITION));
    const opacity = useRef(new Animated.Value(1));
    const wrapperStyle = useMemo(() => {
        return [style.current.contextWrapper, propsStyle];
    }, [style, propsStyle]);
    useEffect(() => {
        if (date) {
            _setDate(date, UpdateSources.PROP_UPDATE);
        }
    }, [date]);
    useEffect(() => {
        animateTodayButton(currentDate);
    }, [todayBottomMargin, currentDate]);
    const _setDate = (date, updateSource) => {
        const updateState = (buttonIcon) => {
            setPrevDate(currentDate);
            setCurrentDate(date);
            setUpdateSource(updateSource);
            setButtonIcon(buttonIcon);
        };
        setDate(props, date, currentDate, updateState, updateSource);
    };
    const _setDisabled = (disabled) => {
        const updateState = (disabled) => {
            setIsDisabled(disabled);
            animateOpacity(disabled);
        };
        setDisabled(showTodayButton, disabled, isDisabled, updateState);
    };
    const contextValue = useMemo(() => {
        return {
            date: currentDate,
            prevDate: prevDate,
            updateSource: updateSource,
            setDate: _setDate,
            setDisabled: _setDisabled
        };
    }, [currentDate, prevDate, updateSource]);
    const animateTodayButton = (date) => {
        if (shouldAnimateTodayButton(props)) {
            const animationData = getPositionAnimation(date, todayBottomMargin);
            Animated.spring(buttonY.current, {
                ...animationData
            }).start();
        }
    };
    const animateOpacity = (disabled) => {
        if (shouldAnimateOpacity(props)) {
            const animationData = getOpacityAnimation(props, disabled);
            Animated.timing(opacity.current, {
                ...animationData
            }).start();
        }
    };
    const onTodayPress = useCallback(() => {
        _setDate(getTodayDate(), UpdateSources.TODAY_PRESS);
    }, [_setDate]);
    const renderTodayButton = () => {
        const today = getTodayFormatted();
        return (<Animated.View style={[style.current.todayButtonContainer, { transform: [{ translateY: buttonY.current }] }]}>
        <TouchableOpacity style={[style.current.todayButton, todayButtonStyle]} onPress={onTodayPress} disabled={isDisabled}>
          <Animated.Image style={[style.current.todayButtonImage, { opacity: opacity.current }]} source={buttonIcon}/>
          <Animated.Text allowFontScaling={false} style={[style.current.todayButtonText, { opacity: opacity.current }]}>
            {today}
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>);
    };
    return (<CalendarContext.Provider value={contextValue}>
      <View style={wrapperStyle}>{children}</View>
      {showTodayButton && renderTodayButton()}
    </CalendarContext.Provider>);
};
export default CalendarProvider;
CalendarProvider.displayName = 'CalendarProvider';
CalendarProvider.propTypes = {
    date: PropTypes.any.isRequired,
    onDateChanged: PropTypes.func,
    onMonthChange: PropTypes.func,
    showTodayButton: PropTypes.bool,
    todayBottomMargin: PropTypes.number,
    todayButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    disabledOpacity: PropTypes.number
};
