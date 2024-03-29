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
import { getList } from "./notificationHelper";
import { setNotificationList } from "./SetGlobal";
import { set } from "react-native-reanimated";


/**
 * @constant  {number}  buttonHeight
 * @description This is the height of the buttons on the dashboard.
 */
const buttonHeight = 50;
/**
 * @constant  {number} textPos
 * @description This is the position of the text on the dashboard. Positions the text based on the height of the button.
 */
const textPos = buttonHeight / 2;
/**
 * @constant  {number} SPACING
 * @description This is the spacing between the items that will be displayed on the screen.
 * @see https://reactnative.dev/docs/dimensions
 */
const SPACING = 20;
/**
 * @constant AVATAR_SIZE
 * @description This is the size of the avatar that will be displayed on the screen.
 */
const AVATAR_SIZE = 70;
/**
 * @constant  {number} ICON_SIZE
 * @description This is the size of the icon that will be displayed on the screen.
 * @see https://reactnative.dev/docs/dimensions
 */
const ICON_SIZE = 33;
/**
 * @constant {number} ITEM_SIZE
 * @description This is the size of the item that will be displayed on the screen. Gets the size of the screen and subtracts the spacing.
 * @see https://reactnative.dev/docs/dimensions
 */
const ITEM_SIZE = AVATAR_SIZE + SPACING * 4;
/**
 * @constant {TouchableOpacity} AnimatedTouchable
 * @description This is the touchable that will be displayed on the screen. It will be animated.
 * @see https://reactnative.dev/docs/touchableopacity
 * */
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
/**
 * @constant {Pressable} AnimatedPressable
 * @description This is the animated component that will be animated when the user presses a button. Different from Touchable
 * @see https://reactnative.dev/docs/pressable
 */
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
//data to be displayed in the flatlist


setNotificationList()
/**
 * @function EventNotification
 * @description This function will send a notification to the user when an event is created. Implemented by using the expo-notifications package.
 * @see https://docs.expo.io/versions/latest/sdk/notifications/
 */
EventNotification();

/**Create FlatList */
const DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendar2.png"),
    text: "Calendar",
  },
  {
    id: "58694a0f-3da1-471f-bd96-1455e29d71",
    title: "Feedback",
    destination: "Doctors",
    image: require("./images/feedback2.png"),
    text: "Feedback",
  },
  {
    id: "28694a0f-3da1-471f-bd96-145571e29d72",
    title: "Emergency Protocols",
    destination: "EmergencyProtocols",
    image: require("./images/protocol.png"),
    text: "Protocols",
  },
  {
    id: "18694a0f-3da1-471f-bd96-145571e29d72",
    title: "EventsCalendar",
    destination: "EventsCalendar",
    image: require("./images/events.png"),
    text: "  Events",
  },
  {
    id: "08694a0f-3da1-471f-bd96-145571e29d79",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settings2.png"),
    text: "Settings",
  },
  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f63",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout2.png"),
    text: "Logout",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendar2.png"),
    text: "Calendar",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557e29d71",
    title: "Feedback",
    destination: "Doctors",
    image: require("./images/feedback2.png"),
    text: "FeedBack",
  },
  {
    id: "28694a0f-3da1-471f-bd96-145571e29d70",
    title: "Emergency Protocols",
    destination: "EmergencyProtocols",
    image: require("./images/protocol.png"),
    text: "Protocols",
  },
  {
    id: "18694a0f-2da1-471f-bd96-145571e29d72",
    title: "EventsCalendar",
    destination: "EventsCalendar",
    image: require("./images/events.png"),
    text: "Events",
  },
  {
    id: "08694a0f-3da1-471f-bd96-145571e29d75",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settings2.png"),
    text: "Settings",
  },

  {
    id: "3ac68af2-c605-48d3-a4f8-fbd91aa97f66",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout2.png"),
    text: "Logout",
  },
  {
    id: "586194a0f-3da1-471f-bd96-145571e29d71",
    title: "Calendar",
    destination: "CalendarView",
    image: require("./images/calendar2.png"),
    text: "Calendar",
  },
  {
    id: "58694a0f2-3da1-471f-bd96-14557e29d71",
    title: "FeedBack",
    destination: "Doctors",
    image: require("./images/feedback2.png"),
    text: "FeedBack",
  },
  {
    id: "286934a0f-3da1-471f-bd96-145571e29d70",
    title: "Emergency Protocols",
    destination: "EmergencyProtocols",
    image: require("./images/protocol.png"),
    text: "Protocols",
  },
  {
    id: "186944a0f-2da1-471f-bd96-145571e29d72",
    title: "EventsCalendar",
    destination: "EventsCalendar",
    image: require("./images/events.png"),
    text: "Events",
  },
  {
    id: "08694a05f-3da1-471f-bd96-145571e29d75",
    title: "Settings",
    destination: "SettingsView",
    image: require("./images/settings2.png"),
    text: "Settings",
  },

  {
    id: "3ac68af62-c605-48d3-a4f8-fbd91aa97f66",
    title: "Logout",
    destination: "Login",
    image: require("./images/logout2.png"),
    text: "Logout",
  },
];

/**
 * @constant {Array<Object>} DATA2
 * @description The short links that will be displayed on the bottom of the screen. It will display the buttons that the user can press to navigate to different screens for the short links at the  bottom of the screen.
 *            As well as the profile picture and other relevant widgets like social media feed, etc.
 * @property {string} id - This is the id of the item that will be displayed on the screen.
 * @property {string} link - URL of the link that will be navigated to when the user presses the button, could be a website or another app.
 * @property {string} image - This is the image that will be displayed on the screen. This can be a local image or a URL.
 * @property {string} text - This is the text that will be displayed on the screen to describe the short link button.
 */
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
/**
 * @function Item
 * @description This function creates the button that will be displayed on the screen. It will display the title, destination, image and text of the item.
 *           It will also call the onPress function when the user presses the button. It will also set the background color and text color of the button.
 * @param {Object} item - This is the item that will be displayed on the screen. Contains the title, destination, image and text.
 * @param {function} onPress - This is the function that will be called when the user presses the button.
 * @param {string} backgroundColor - This is the background color of the button.
 * @param {string} textColor - This is the text color of the button.
 * @returns {JSX.Element} - Returns the button that will be displayed on the screen.
 */
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

//setup for twitter feed on dashboard
/**
 * @class TwitterFeed
 * @description This function creates the twitter feed that will be displayed on the screen. It will display the twitter feed of the user. It will also call the onPress function when the user presses the button.
 *              It will also set the background color and text color of the button and the twitter feed.
 *            It will also set the twitter feed to be displayed on the screen using the Twitter API.
 */
class TwitterFeed extends Component {
  /**
   * @static propTypes
   * @typedef {Object} propTypes
   * @property {string} witsUrl - This is the URL of the Wits University Twitter page.
   * @description Sets the type of the props that will be used in the Twitter Feed class.
   * */
  static propTypes = {
    witsUrl: PropTypes.string,
  };

  /**
   * @constructs
   * @param {Object} props - This is the props that will be used in the Twitter Feed class.
   * @description The constructor for the TwitterFeed class. It will set the state of the twitter feed to be displayed on the screen.  Sets the default values of the props that will be used in the Twitter Feed class. It will set the URL of the Wits University Twitter page.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      embedHtml: null,
    };
  }

  /**
   * @function componentDidMount
   * @description This function will be called when the component is mounted. It will set the twitter feed to be displayed on the screen using the Twitter API.
   * @returns {void}
   * @async
   */
  componentDidMount() {
    this.setupUrl();
  }

  /**
   * @function setupUrl
   * @description This function will set the twitter feed to be displayed on the screen using the Twitter API. It fetches the twitter feed from the Wits University Twitter page, using the state of the prop witsUrl.
   * @returns {void}
   * @async
   * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview}
   *
   */
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

  /**
   * @function render
   * @param {Object} embedHtml - This is the twitter feed that will be displayed on the screen.
   * @description This function will render the twitter feed to be embedded on the screen. It will set the background color and text color of the twitter feed and handle the HTML of the twitter feed, using the embedHtml state.
   * @returns {JSX.Element} - Returns the twitter feed that will be displayed on the screen as a View using the HTML of the twitter feed.
   * @async
   */
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
              backgroundColor:"rgba(0,0,0,0.0)",
              top:0,
              width:292,
            }}
            source={{ html: html }}
          />
        </View>
      );
    }
  }
  //renders interactive scrollview and renders twitter feed
  /**
   * @function render
   * @description This function will render the twitter feed to be embedded using the renderEmbed function. It will also render the interactive scrollview that will be displayed on the screen.
   * @returns {JSX.Element} - Renders an interactive scrollview and renders the twitter feed using the renderEmbed function.
   */
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

/**
 * @module Dashboard
 * @author - Callum Muller, Shagan Plaatjies, Nokuthaba Moyo, Angela Nkosi, Peace Riot Ndlovu
 * @description This is the dashboard that will be displayed when the user logs in. It will display the buttons that the user can press to navigate to different screens.
 *              As well as the profile picture and other relevant widgets like social media feed, etc.
 *
 * @returns {View} Returns the view that will be displayed on the screen.
 */

const Dashboard = () => {
  /**
   * @const anim
   * @description This is the animation that will be used to animate the buttons on the screen.
   */
  const anim = useRef(new Animated.Value(1));

  /**
   * @function useEffect
   * @description This function will be called when the component is mounted. It will animate the buttons on the screen. Loops through the buttons and animates them.
   * @returns {void}
   * @async
   * @see {@link https://reactnative.dev/docs/animated}
   */
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

  /**
   * @constant {number} scrollY
   * @description This is the scroll position of the screen.
   * @see {@link https://reactnative.dev/docs/animated}
   * @see {@link https://reactnative.dev/docs/scrollview}
   */
  const scrollY = React.useRef(new Animated.Value(0)).current;

  /**
   * @constant navigation
   * @description This is the navigation that will be used to navigate to different screens.
   * @see {@link https://reactnavigation.org/docs/getting-started}
   * @see {@link https://reactnavigation.org/docs/stack-navigator}
   */
  const navigation = useNavigation();

  //change colour of tapped button

  /**
   * @typedef {string} selectedId — This is the id of the button that is currently selected as a state variable string.
   * @description  This is the id of the button that is currently selected. It will be used to change the colour of the button that is currently selected.
   */

  /**
   * @typedef {function} setSelectedId — This is the function that will be used to set the id of the button that is currently selected.
   * @description  This is the function that will be used to set the id state of the button that is currently selected. It will be used to change the colour of the button that is currently selected.
   */
  const [selectedId, setSelectedId] = useState(null);

  /**
   * @typedef {string} name — This is the name of the button that is currently selected as a state variable string.
   * @description  This is the name of the button that is currently selected. It will be used to change the colour of the button that is currently selected.
   */

  /**
   * @typedef {function} SetName — This is the function that will be used to set the state of the name text of the button that is currently selected.
   * @description  This is the function that will be used to set the state of the name text on the button that is currently selected. It will be used to change the colour of the button that is currently selected.
   */
  const [name, SetName] = useState("");
  // first render function that renders the vertical flatlist
  const renderItem = ({ item }) => {
    /**
     * @function renderItem
     * @description renders a single item in the vertical flatlist and changes the colour of the button when tapped and navigates to the correct screen when button is tapped.
     * @param {item} item - the item to be rendered
     * @param {string} item.id - id of the item
     * @param {string} item.title - title of the item
     * @param {string} item.destination - destination of the item
     * @param {string} item.image - source of the image, can be a local image or a url.
     * @param {string} item.text - text of the item
     * @param {string} item.link - link of the item
     *
     * @returns {View} - returns a view with a touchable opacity and a text and image of the items in the flatlist.
     */
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
                borderColor: "rgba(0,0,0,1)",
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
  const renderNotificationItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notifications")
        }}
      >
        <View
         key={item.time}
          style={{
            height: 65,
            backgroundColor: "rgba(0,0,0,0.1)",
            marginBottom: 10,
            margin: 5,
            borderRadius: 15,
            borderWidth:2,
            borderColor:"rgba(0,0,0,0.3)",
            width:275
          }}
        >
          <Text
            style={{
              borderBottomWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
              letterSpacing: 1,
              fontWeight: "bold",
              left: 4,
              top: 2,
              color: "rgba(255,255,255,255)",
              position: "absolute",
              fontSize: 15,
            }}
          >
            {item.heading}
          </Text>
          <Text
            style={{
              letterSpacing: 1,
              fontWeight: "bold",
              right: 4,
              top: 2,
              color: "rgba(255,255,255,255)",
              position: "absolute",
              fontSize: 10,
            }}
          >
            {item.date}
          </Text>
          <Text
            style={{
              letterSpacing: 1,
              fontWeight: "bold",
              right: 4,
              top: 14,
              color: "rgba(255,255,255,255)",
              position: "absolute",
              fontSize: 10,
            }}
          >
            {item.time}
          </Text>
          <Text
            style={{
              letterSpacing: 0,
              fontWeight: "bold",
              left: 4,
              top: SPACING + 12,
              color: "rgba(128,185,238,255)",
              height: 50,
              width: width / 1.1,
            }}
          >
            New Notification, tap for details
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  // second render function that renders the horizontal flatlist
  /**
   * @function renderHorizontalItem
   * @description renders a single item in the horizontal flatlist on the top Bar and changes the colour of the button when tapped and navigates to the correct screen when button is tapped.
   * @param {item} item - the item to be rendered
   */
  return (
    <View style={{ flex: 1 }}>
      {createTopBar(10, navigation, false)}
      <View
        //creates left hand news feed with twitter feed
        style={{ zIndex: 1, flex: 1, flexDirection: "row" }}
      >
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
              zIndex: 1,
              borderRadius: 16,
              marginTop: SPACING,
              marginLeft: SPACING / 2,
              flexDirection: "column",
              height:640,
              backgroundColor:'rgba(0,0,0,0)'
            }}
          >
          <View style={{backgroundColor:'rgba(0,0,0,0)',borderRadius:20,height:70,left:0}}> 
          <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{}}
          data={notificationList}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          snapToInterval={285}
          decelerationRate={1}
          />
          </View>
          <TwitterFeed style={{marginBottom:10,marginTop:SPACING}}></TwitterFeed>

          </View>
          <View
          //responsible for bottom hotbar
            style={{
              marginTop: SPACING,
              marginBottom: SPACING + 10,
              backgroundColor: "rgba(0,0,0,0.0)",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              height: 36,
              position:'absolute',
              bottom:5,
              left:SPACING-15,
              width:285
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
                    backgroundColor: "rgba(0,0,0,0.1)",
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
                        borderRadius: AVATAR_SIZE+20,
                        marginRight: SPACING / 2,
                        left: 0,
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0.2)",
                        backgroundColor: "rgba(0,0,0,0)",
                        transform:[{scaleX:1.1},{scaleY:1.1}],
                        top:5
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "rgba(255,255,255,0.75)",
                      position: "absolute",
                      left: 30,
                      transform: [
                        { translateY: 2 },
                        { translateX: 0 },
                        { rotate: "0deg" },
                      ],
                      top: 5,
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
          source={require("./images/background9.png")}
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
    borderRadius: 20,
    height: 580,
    backgroundColor:"rgba(0,0,0,0)",
    top:0,
    left:-3,
    marginTop:SPACING/2
  },
});
export default Dashboard;
