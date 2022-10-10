import { Image, View, TouchableHighlight, Dimensions } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";

const SPACING = 20;
const ICON_SIZE = 33;
const { width, height } = Dimensions.get("screen");

export const multiply = (a, b) => {
  return a * b;
};

export const makeLowerCase = (string) => {
  return string.toLowerCase();
};

export function getCurrentDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return day + "-" + month + "-" + year;
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMS={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMS={200} />
  </Transition.Together>
);

const data = [
  {
    icon: require("./Screens/images/emergency.png"),
    destination: navigation.navigate("EmergencyPage"),
  },
  {
    icon: { uri: authUserProfilePic },
    destination: navigation.navigate("SettingsView"),
  },
  {
    icon: require("./Screens/images/bell.png"),
    destination: navigation.navigate("SettingsView"),
  },
  {
    icon: require("./Screens/images/back.png"),
    destination: navigation.goBacK(),
  },
];
// export function createTopBar(T,R,color,navigation){
//   return(

//   <View
//         style={{
//           backgroundColor: color,
//           height: ICON_SIZE,
//           zIndex: 1,
//           top: T,
//           borderRadius: 2,
//           right: 0,
//           width: width / 1,
//         }}
//       >
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0.0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE,
//             height: ICON_SIZE,
//             right: 10,
//             top: 2,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//           }}
//           onPress={() => {
//             navigation.navigate("Login");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               borderWidth: 2,
//             }}
//             source={require("./Screens/images/menu.png")}
//           />
//         </TouchableHighlight>
//         {/* <TouchableHighlight
//           underlayColor="rgba(0,0,0,0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE,
//             height: ICON_SIZE,
//             right: ICON_SIZE + 20,
//             top: 0,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//             marginBottom: SPACING / 2,
//           }}
//           onPress={() => {
//             navigation.navigate("EmergencyPage");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               shadowRadius: 20,
//             }}
//             source={require("./Screens/images/emergency.png")}
//           />
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE,
//             height: ICON_SIZE,
//             right: ICON_SIZE * 2 + 30,
//             top: 0,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//             marginBottom: SPACING / 2,
//           }}
//           onPress={() => {
//             navigation.navigate("SettingsView");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               shadowRadius: 20,
//             }}
//             source={require("./Screens/images/bell.png")}
//           />
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE / 1.1,
//             height: ICON_SIZE / 1.1,
//             right: ICON_SIZE * 3 + 40,
//             top: 2,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//             marginBottom: SPACING / 2,
//           }}
//           onPress={() => {
//             navigation.navigate("SettingsView");
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE / 1.1,
//               height: ICON_SIZE / 1.1,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               shadowRadius: 20,
//             }}
//             source={{ uri: authUserProfilePic }}
//           />
//         </TouchableHighlight>
//           */}
//         <TouchableHighlight
//           underlayColor="rgba(0,0,0,0.0)"
//           style={{
//             flex: 1,
//             width: ICON_SIZE/1,
//             height: ICON_SIZE/1,
//             left:  2,
//             top: 0,
//             position: "absolute",
//             borderRadius: ICON_SIZE,
//           }}
//           onPress={() => {
//             navigation.goBack();
//           }}
//         >
//           <Image
//             style={{
//               width: ICON_SIZE,
//               height: ICON_SIZE,
//               position: "absolute",
//               resizeMode: "cover",
//               borderRadius: ICON_SIZE,
//               borderWidth: 2,
//             }}
//             source={require("./Screens/images/back.png")}
//           />
//         </TouchableHighlight>
//       </View>
//   )
// }

export function createTopBar(T, R, color, navigation) {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  return (
    <View
      style={{
        backgroundColor: color,
        height: ICON_SIZE,
        zIndex: 1,
        top: T,
        borderRadius: 2,
        right: 0,
        width: width / 1,
      }}
    >
      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.0)"
        style={{
          flex: 1,
          width: ICON_SIZE,
          height: ICON_SIZE,
          right: 10,
          top: 2,
          position: "absolute",
          borderRadius: ICON_SIZE,
        }}
        onPress={() => {
          setCurrentIndex(index);
        }}
      >
        <Image
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            position: "absolute",
            resizeMode: "cover",
            borderRadius: ICON_SIZE,
            borderWidth: 2,
          }}
          source={require("./Screens/images/menu.png")}
        />
      </TouchableHighlight>
    </View>
  );
}
