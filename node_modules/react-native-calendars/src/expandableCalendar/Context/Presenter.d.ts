import { UpdateSources } from '../commons';
import { CalendarContextProviderProps } from './Provider';
export declare const _getIconDown: () => any;
export declare const _getIconUp: () => any;
export declare const getButtonIcon: (date: string, showTodayButton?: boolean) => any;
export declare const setDate: (props: CalendarContextProviderProps, date: string, newDate: string, updateState: (buttonIcon: number) => void, updateSource: UpdateSources) => void;
export declare const setDisabled: (showTodayButton: boolean, newDisabledValue: boolean, oldDisabledValue: boolean, updateState: (disabled: boolean) => void) => void;
export declare const shouldAnimateTodayButton: (props: CalendarContextProviderProps) => boolean | undefined;
export declare const getTodayDate: () => string;
export declare const getPositionAnimation: (date: string, todayBottomMargin?: number) => {
    toValue: number;
    tension: number;
    friction: number;
    useNativeDriver: boolean;
};
export declare const shouldAnimateOpacity: (props: CalendarContextProviderProps) => number | undefined;
export declare const getOpacityAnimation: ({ disabledOpacity }: CalendarContextProviderProps, disabled: boolean) => {
    toValue: number;
    duration: number;
    useNativeDriver: boolean;
};
export declare const getTodayFormatted: () => any;
