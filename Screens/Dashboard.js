import React, { useState, useRef, useEffect, Component } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Pressable,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  Button,
  ScrollView,
  Linking,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import "./global";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";
import { createTopBar } from "../HelperFunctions";
import {EventNotification} from "./SendNotification"

//Constants for use with UI scaling
const buttonHeight = 50;
const textPos = buttonHeight / 2;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ICON_SIZE = 33;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 4;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
//data to be displayed in the flatlist

EventNotification()

/**Create FlatList */
const DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendar.png"),
    text: "Calendar",
  },
  {
    id: "58694a0f-3da1-471f-bd96-1455e29d71",
    title: "FeedBack",
    destination: "Doctors",
    image: require("./images/feedback.jpg"),
    text: "FeedBack",
  },
  {
    id: "28694a0f-3da1-471f-bd96-145571e29d72",
    title: "Emergency Protocols",
    destination: "EmergencyProtocols",
    image: require("./images/schedule.png"),
    text: "Protocols",
  },
  {
    id: "18694a0f-3da1-471f-bd96-145571e29d72",
    title: "EventsCalendar",
    destination: "EventsCalendar",
    image: require("./images/calendar.png"),
    text: "  Events",
  },
  {
    id: "08694a0f-3da1-471f-bd96-145571e29d79",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settings.png"),
    text: "Settings",
  },
  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f63",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout.png"),
    text: "Logout",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendar.png"),
    text: "Calendar",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557e29d71",
    title: "FeedBack",
    destination: "Doctors",
    image: require("./images/feedback.jpg"),
    text: "FeedBack",
  },
  {
    id: "28694a0f-3da1-471f-bd96-145571e29d70",
    title: "Emergency Protocols",
    destination: "EmergencyProtocols",
    image: require("./images/schedule.png"),
    text: "Protocols",
  },
  {
    id: "18694a0f-3da1-471f-bd96-145571e29d76",
    title: "Logbook",
    destination: "BackgroundTest",
    image: require("./images/logbook.png"),
    text: "Logbook",
  },
  {
    id: "08694a0f-3da1-471f-bd96-145571e29d75",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settings.png"),
    text: "Settings",
  },

  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f66",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout.png"),
    text: "Logout",
  },
];


//data to be displayed in bottom hotbar
/**Create Shortlinks */
const DATA2 = [
  {
    id: "1",
    link: "https://ulwazi.wits.ac.za/",
    text: "ULWAZI",
    image: require("./images/ulwazi.png"),
  },
  {
    id: "5",
    link: "https://mail.google.com/",
    text: "GMAIL",
    image: require("./images/gmaillogo.png"),
  },
  {
    id: "2",
    link: "https://self-service.wits.ac.za/",
    text: "SELF SERVICE",
    image: require("./images/witsLogo.png"),
  },
  {
    id: "3",
    link: "https://courses.ms.wits.ac.za/moodle/",
    text: "MOODLE",
    image: require("./images/moodleLogo.png"),
  },
  {
    id: "4",
    link: "https://www.youtube.com/",
    text: "YOUTUBE",
    image: require("./images/youtubeLogo.png"),
  },
  {
    id: "6",
    link: "https://www.notion.so/",
    text: "NOTION",
    image: require("./images/notionLogo.png"),
  },
];

// creates it so each item has a touchable button with correct title
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

//setup for twitter feed on dashboard
class TwitterFeed extends Component {
  static propTypes = {
    witsUrl: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      embedHtml: null,
    };
  }

  componentDidMount() {
    this.setupUrl();
  }

  setupUrl() {
    let witsUrl =
      "https://publish.twitter.com/oembed?url=https://twitter.com/WitsHealthFac/status/1573569169982861313?cxt=HHwWgICyzYLv09ErAAAA" +
      encodeURIComponent(this.props.witsUrl);

    fetch(witsUrl, {
      method: "GET",
      headers: { Accepts: "application/json" },
    }).then((resp) => {
      resp.json().then((json) => {
        let html = json.html;
        this.setState({
          embedHtml: html,
        });
      });
    });
  }

  renderEmbed() {
    if (this.state.embedHtml) {
      let html = `<!DOCTYPE html>\
      <html>\
        <head>\
          <meta charset="utf-8">\
          <meta name="viewport" content="width=device-width, initial-scale=1.0">\
          </head>\
          <body>\
            ${this.state.embedHtml}\
          </body>\
      </html>`;
      return (
        <View style={styles.webviewStyle}>
          <WebView
            style={{
              borderBottomColor: "rgba(28,56,107,0.9)",
              borderRadius: 10,
            }}
            source={{ html: html }}
          />
        </View>
      );
    }
  }
  //renders interactive scrollview and renders twitter feed
  render() {
    return (
      <ScrollView
        style={{ borderBottomColor: "rgba(28,56,107,0.9)", borderRadius: 10 }}
      >
        {this.renderEmbed()}
      </ScrollView>
    );
  }
}

/**Create Dashboard */
const Dashboard = () => {
 
  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.08,
          duration: 200,
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const scrollY = React.useRef(new Animated.Value(0)).current;
  //use navigation
  const navigation = useNavigation();
  //change colour of tapped button
  const [selectedId, setSelectedId] = useState(null);
  const [name, SetName] = useState("");
  // first render function that renders the vertical flatlist
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
      //creates link that opens external page
        onPress={() => {
          Linking.openURL(item.link);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            flex: 1,
            flexDirection: "row",
            borderRadius: 8,
            paddingRight: SPACING,
            marginLeft: SPACING / 2,
          }}
        >
          <View style={{ flex: 1 }}>
            
            <Image
            //adds image to each hotbar item for identification
              style={{
                width: 30,
                height: 30,
                left: 5,
                top: 3,
                position: "relative",
                resizeMode: "cover",
                borderRadius: 20,
                borderWidth: 0,
                borderColor: "rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255,255,255,0.5)",
                shadowOpacity: 1,
                shadowRadius: 20,
              }}
              source={item.image}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
            //shows item text for each hotbar item
              style={{
                flex: 1,
                fontSize: 15,
                top: 8,
                left: 10,
                color: "white",
              }}
            >
              {item.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {createTopBar(10, navigation, false)}

      <View
      //creates left hand news feed with twitter feed
       style={{ zIndex: 1, flex: 1, flexDirection: "row" }}>
        <View
          style={{
            zIndex: 1,
            flex: 2.5,
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0)",
            transform: [{ translateY: 0 }, { translateX: 0 }],
          }}
        >
          <View
            style={{
              flex: 1,
              zIndex: 1,
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: 16,
              marginTop: SPACING,
              marginLeft: SPACING / 2,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: 40,
                backgroundColor: "rgba(28,56,107,1)",
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                borderWidth: 0,
                borderBottomColor: "rgba(28,56,107,0.9)",
                borderColor: "rgba(28,56,107,0.9)",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,1)",
                  fontSize: 25,
                  fontWeight: "bold",
                  left: 80,
                }}
              >
                News Feed
              </Text>
            </View>
            <View
            //display twitter feed
              style={{
                zIndex: 1,
                borderRadius: 32,
                top: 0,
                borderBottomColor: "rgba(28,56,107,0.9)",
                resizeMode: "contain",
                marginBottom: SPACING * 3,
              }}
            >
              <TwitterFeed
                style={{ borderColor: "rgba(28,56,107,0.9)", borderRadius: 20 }}
              ></TwitterFeed>
            </View>
            <View
              style={{
                flex: 1,
                zIndex: 1,
                borderRadius: 32,
                margin: SPACING / 2,
              }}
            ></View>
          </View>
          <View
          //responsible for right hand side menu for general navigation
            style={{
              marginTop: SPACING,
              marginBottom: SPACING + 10,
              backgroundColor: "rgba(0,0,0,0.0)",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              height: 36,
            }}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{}}
              data={DATA2}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

        <Animated.FlatList
        //animated flatlist for scaling and fading out of flatlist elements
          snapToInterval={ITEM_SIZE - SPACING * 1.5}
          decelerationRate={0}
          style={{ flex: 1 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={DATA}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: SPACING,
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              (ITEM_SIZE - SPACING * 1.5) * index,
              (ITEM_SIZE - SPACING * 1.5) * (index + 1),
            ];
            const opacityInputRange = [
              -1,
              0,
              (ITEM_SIZE - SPACING * 1.5) * index,
              (ITEM_SIZE - SPACING * 1.5) * (index + 1),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <TouchableHighlight
              //touchable for each flatlist item for navigation to corresponding page
                style={{
                  borderRadius: 100,
                  marginBottom: SPACING / 2,
                  width: 300,
                  borderBottomEndRadius: 0,
                  left: 20,
                }}
                onPress={() => {
                  navigation.navigate(item.destination);
                }}
                underlayColor="rgba(28,56,107,0.2)"
              >
                <Animated.View
                  style={{
                    flexDirection: "row",
                    padding: SPACING,
                    backgroundColor: "rgba(0,0,0,0.12)",
                    borderRadius: 100,
                    shadowColor: "black",
                    borderBottomEndRadius: 0,
                    borderTopEndRadius: 0,
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    opacity,
                    transform: [{ scaleX: scale }, { scaleY: scale }],
                    shadowRadius: 20,
                    shadowOpacity: 0.5,
                    width: 300,
                  }}
                >
                  <View>
                    <Image
                      source={item.image}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2,
                        left: 0,
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0.2)",
                        backgroundColor: "rgba(0,0,0,0)",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      color: "rgba(255,255,255,1)",
                      position: "absolute",
                      left: 30,
                      transform: [
                        { translateY: 2 },
                        { translateX: 0 },
                        { rotate: "0deg" },
                      ],
                      top: 2.5,
                      textShadowColor: "rgba(0,0,0,1)",
                      textShadowRadius: 0,
                      textShadowOffset: { width: 0, height: 0 },
                      textAlign: "left",
                    }}
                  >
                    {item.text}
                  </Text>
                </Animated.View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
      <View style={{ position: "absolute" }}>
        <Image
        //creates background for page
          resizeMode="contain"
          source={require("./images/background.png")}
          blurRadius={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#859a9b",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  webviewStyle: {
    borderRadius: 10,
    //  borderWidth: 2,
    backgroundColor: "rgba(28,56,107,0.9)",
    height: 700,
  },
});
export default Dashboard;
