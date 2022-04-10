import { Theme } from '../types';
export declare const HOURS_SIDEBAR_WIDTH = 72;
export default function styleConstructor(theme: Theme | undefined, calendarHeight: number): {
    container: {
        flex: number;
        backgroundColor: string;
    };
    contentStyle: {
        backfaceVisibility?: "visible" | "hidden" | undefined;
        backgroundColor: import("react-native").ColorValue;
        borderBottomColor?: import("react-native").ColorValue | undefined;
        borderBottomEndRadius?: number | undefined;
        borderBottomLeftRadius?: number | undefined;
        borderBottomRightRadius?: number | undefined;
        borderBottomStartRadius?: number | undefined;
        borderBottomWidth?: number | undefined;
        borderColor?: import("react-native").ColorValue | undefined;
        borderEndColor?: import("react-native").ColorValue | undefined;
        borderLeftColor?: import("react-native").ColorValue | undefined;
        borderLeftWidth?: number | undefined;
        borderRadius?: number | undefined;
        borderRightColor?: import("react-native").ColorValue | undefined;
        borderRightWidth?: number | undefined;
        borderStartColor?: import("react-native").ColorValue | undefined;
        borderStyle?: "solid" | "dotted" | "dashed" | undefined;
        borderTopColor?: import("react-native").ColorValue | undefined;
        borderTopEndRadius?: number | undefined;
        borderTopLeftRadius?: number | undefined;
        borderTopRightRadius?: number | undefined;
        borderTopStartRadius?: number | undefined;
        borderTopWidth?: number | undefined;
        borderWidth?: number | undefined;
        opacity?: number | undefined;
        testID?: string | undefined;
        elevation?: number | undefined;
        alignContent?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | undefined;
        alignItems?: import("react-native").FlexAlignType | undefined;
        alignSelf?: "auto" | import("react-native").FlexAlignType | undefined;
        aspectRatio?: number | undefined;
        borderEndWidth?: string | number | undefined;
        borderStartWidth?: string | number | undefined;
        bottom?: string | number | undefined;
        display?: "none" | "flex" | undefined;
        end?: string | number | undefined;
        flex?: number | undefined;
        flexBasis?: string | number | undefined;
        flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
        flexGrow?: number | undefined;
        flexShrink?: number | undefined;
        flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;
        height: string | number;
        justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
        left?: string | number | undefined;
        margin?: string | number | undefined;
        marginBottom?: string | number | undefined;
        marginEnd?: string | number | undefined;
        marginHorizontal?: string | number | undefined;
        marginLeft?: string | number | undefined;
        marginRight?: string | number | undefined;
        marginStart?: string | number | undefined;
        marginTop?: string | number | undefined;
        marginVertical?: string | number | undefined;
        maxHeight?: string | number | undefined;
        maxWidth?: string | number | undefined;
        minHeight?: string | number | undefined;
        minWidth?: string | number | undefined;
        overflow?: "visible" | "hidden" | "scroll" | undefined;
        padding?: string | number | undefined;
        paddingBottom?: string | number | undefined;
        paddingEnd?: string | number | undefined;
        paddingHorizontal?: string | number | undefined;
        paddingLeft?: string | number | undefined;
        paddingRight?: string | number | undefined;
        paddingStart?: string | number | undefined;
        paddingTop?: string | number | undefined;
        paddingVertical?: string | number | undefined;
        position?: "absolute" | "relative" | undefined;
        right?: string | number | undefined;
        start?: string | number | undefined;
        top?: string | number | undefined;
        width?: string | number | undefined;
        zIndex?: number | undefined;
        direction?: "ltr" | "rtl" | "inherit" | undefined;
        shadowColor?: import("react-native").ColorValue | undefined;
        shadowOffset?: {
            width: number;
            height: number;
        } | undefined;
        shadowOpacity?: number | undefined;
        shadowRadius?: number | undefined;
        transform?: (import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform | import("react-native").MatrixTransform)[] | undefined;
        transformMatrix?: number[] | undefined;
        rotation?: number | undefined;
        scaleX?: number | undefined;
        scaleY?: number | undefined;
        translateX?: number | undefined;
        translateY?: number | undefined;
    };
    header: {
        paddingHorizontal: number;
        height: number;
        borderTopWidth: number;
        borderBottomWidth: number;
        borderColor: string;
        backgroundColor: string;
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "stretch";
    };
    headerTextContainer: {
        justifyContent: "center";
    };
    headerText: {
        fontSize: number;
    };
    arrow: {
        width: number;
        height: number;
        resizeMode: "contain";
    };
    arrowButton: {
        width: number;
        alignItems: "center";
        justifyContent: "center";
    };
    event: {
        position: "absolute";
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        paddingLeft: number;
        minHeight: number;
        flex: number;
        opacity: number;
        paddingTop: number;
        paddingBottom: number;
        flexDirection: "column";
        alignItems: "flex-start";
        overflow: "hidden";
    };
    eventTitle: {
        color: string;
        fontWeight: "600";
        minHeight: number;
    };
    eventSummary: {
        color: string;
        fontSize: number;
        flexWrap: "wrap";
    };
    eventTimes: {
        marginTop: number;
        fontSize: number;
        fontWeight: "bold";
        color: string;
        flexWrap: "wrap";
    };
    line: {
        height: number;
        position: "absolute";
        left: number;
        backgroundColor: string;
    };
    verticalLine: {
        position: "absolute";
        width: number;
        height: string;
        backgroundColor: string;
        left: number;
    };
    nowIndicator: {
        position: "absolute";
        left: number;
        right: number;
    };
    nowIndicatorLine: {
        height: number;
        position: "absolute";
        left: number;
        right: number;
        backgroundColor: string;
    };
    nowIndicatorKnob: {
        position: "absolute";
        left: number;
        top: number;
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
    };
    timeLabel: {
        position: "absolute";
        color: string;
        fontSize: number;
        fontFamily: string;
        fontWeight: "500";
        paddingLeft: number;
        textAlign: "center";
        width: number;
    };
    unavailableHoursBlock: {
        position: "absolute";
        left: number;
        right: number;
        backgroundColor: string;
    };
};
