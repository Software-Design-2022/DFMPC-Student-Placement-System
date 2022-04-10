import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import min from 'lodash/min';
import map from 'lodash/map';
import constants from '../commons/constants';
import styleConstructor, { HOURS_SIDEBAR_WIDTH } from './style';
import { populateEvents, HOUR_BLOCK_HEIGHT } from './Packer';
import { calcTimeOffset } from './helpers/presenter';
import TimelineHours from './TimelineHours';
import EventBlock from './EventBlock';
import NowIndicator from './NowIndicator';
import useTimelineOffset from './useTimelineOffset';
const Timeline = (props) => {
    const { format24h = true, start = 0, end = 24, date, events = [], onEventPress, onBackgroundLongPress, onBackgroundLongPressOut, renderEvent, theme, scrollToFirst, scrollToNow, initialTime, showNowIndicator, scrollOffset, onChangeOffset, overlapEventsSpacing, rightEdgeSpacing, unavailableHours, unavailableHoursColor, eventTapped } = props;
    const scrollView = useRef();
    const calendarHeight = useRef((end - start) * HOUR_BLOCK_HEIGHT);
    const styles = useRef(styleConstructor(theme || props.styles, calendarHeight.current));
    const { scrollEvents } = useTimelineOffset({ onChangeOffset, scrollOffset, scrollViewRef: scrollView });
    const packedEvents = useMemo(() => {
        const width = constants.screenWidth - HOURS_SIDEBAR_WIDTH;
        return populateEvents(events, { screenWidth: width, dayStart: start, overlapEventsSpacing, rightEdgeSpacing });
    }, [events, start]);
    useEffect(() => {
        let initialPosition = 0;
        if (scrollToNow) {
            initialPosition = calcTimeOffset(HOUR_BLOCK_HEIGHT);
        }
        else if (scrollToFirst && packedEvents.length > 0) {
            initialPosition = min(map(packedEvents, 'top')) ?? 0;
        }
        else if (initialTime) {
            initialPosition = calcTimeOffset(HOUR_BLOCK_HEIGHT, initialTime.hour, initialTime.minutes);
        }
        if (initialPosition) {
            setTimeout(() => {
                scrollView?.current?.scrollTo({
                    y: Math.max(0, initialPosition - HOUR_BLOCK_HEIGHT),
                    animated: true
                });
            }, 0);
        }
    }, []);
    const _onEventPress = useCallback((eventIndex) => {
        const event = packedEvents[eventIndex];
        if (eventTapped) {
            //TODO: remove after deprecation
            eventTapped(event);
        }
        else {
            onEventPress?.(event);
        }
    }, [packedEvents, onEventPress, eventTapped]);
    const renderEvents = () => {
        const events = packedEvents.map((event, i) => {
            return (<EventBlock key={i} index={i} event={event} styles={styles.current} format24h={format24h} onPress={_onEventPress} renderEvent={renderEvent}/>);
        });
        return (<View>
        <View style={{ marginLeft: HOURS_SIDEBAR_WIDTH }}>{events}</View>
      </View>);
    };
    return (<ScrollView 
    // @ts-expect-error
    ref={scrollView} contentContainerStyle={[styles.current.contentStyle, { width: constants.screenWidth }]} {...scrollEvents}>
      <TimelineHours start={start} end={end} date={date} format24h={format24h} styles={styles.current} unavailableHours={unavailableHours} unavailableHoursColor={unavailableHoursColor} onBackgroundLongPress={onBackgroundLongPress} onBackgroundLongPressOut={onBackgroundLongPressOut}/>
      {renderEvents()}
      {showNowIndicator && <NowIndicator styles={styles.current}/>}
    </ScrollView>);
};
export default React.memo(Timeline);
