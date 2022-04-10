import XDate from 'xdate';
import { sameMonth, isToday, isPastDate } from '../../dateutils';
import { xdateToData, toMarkingFormat } from '../../interface';
import { getDefaultLocale } from '../../services';
const commons = require('../commons');
const TOP_POSITION = 65;
export const _getIconDown = () => {
    return require('../../img/down.png');
};
export const _getIconUp = () => {
    return require('../../img/up.png');
};
export const getButtonIcon = (date, showTodayButton = true) => {
    if (!showTodayButton) {
        return undefined;
    }
    const icon = isPastDate(date) ? _getIconDown() : _getIconUp();
    return icon;
};
export const setDate = (props, date, newDate, updateState, updateSource) => {
    const buttonIcon = getButtonIcon(date, props.showTodayButton);
    updateState(buttonIcon);
    props.onDateChanged?.(date, updateSource);
    if (!sameMonth(new XDate(date), new XDate(newDate))) {
        props.onMonthChange?.(xdateToData(new XDate(date)), updateSource);
    }
};
export const setDisabled = (showTodayButton, newDisabledValue, oldDisabledValue, updateState) => {
    if (!showTodayButton || newDisabledValue === oldDisabledValue) {
        return;
    }
    updateState(newDisabledValue);
};
export const shouldAnimateTodayButton = (props) => {
    return props.showTodayButton;
};
export const getTodayDate = () => {
    return toMarkingFormat(new XDate());
};
export const getPositionAnimation = (date, todayBottomMargin = 0) => {
    const toValue = isToday(new XDate(date)) ? TOP_POSITION : -todayBottomMargin || -TOP_POSITION;
    return {
        toValue,
        tension: 30,
        friction: 8,
        useNativeDriver: true
    };
};
export const shouldAnimateOpacity = (props) => {
    return props.disabledOpacity;
};
export const getOpacityAnimation = ({ disabledOpacity = 0 }, disabled) => {
    return {
        toValue: disabled ? disabledOpacity : 1,
        duration: 500,
        useNativeDriver: true
    };
};
export const getTodayFormatted = () => {
    const todayString = getDefaultLocale().today || commons.todayString;
    const today = todayString.charAt(0).toUpperCase() + todayString.slice(1);
    return today;
};
