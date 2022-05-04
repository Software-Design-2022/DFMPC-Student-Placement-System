import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const buttonHeight=50;
const textPos=buttonHeight/2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 80;
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }
  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2050, 6, 3);
    const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    return (
      <View style={{flex:1}}>

      
      <View style={{ backgroundColor:'black',flex:1}}>
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="  rgba(100,140,180,1)"
          selectedDayColor=" rgba(36,50,61,1)"
          selectedDayTextColor=" rgba(127,180,225,1)"
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED START DATE:{ startDate }</Text>
          <Text>SELECTED END DATE:{ endDate }</Text>
        </View>
      </View>
      </View>
      <View>
     <TouchableHighlight onPress={()=>{navigation.navigate("Protocols")}}>
       <Image 
       style={{width:ICON_SIZE,
        height:ICON_SIZE,
        position: 'absolute',
                right: 0,
                bottom: 0,
        borderRadius:ICON_SIZE
        ,marginRight:SPACING/2,
        }}
        source={require("./emergency.gif")}
        />
        </TouchableHighlight>
     </View>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop:20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius:20,
    height:420,
    borderColor:"rgba(36,50,61,1)",
    borderWidth:5
  },
});
