import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import OnBoarding from "../OnBoarding/OnBoarding";

const { width, height } = Dimensions.get("window");

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate(OnBoarding);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />

      {/* Explicitly handle the status bar height */}
      <View style={styles.statusBar} />

      <View style={styles.content}>
        <Image
          source={require("../../../src/assets/images/splashLogo.png")}
          style={styles.image}
        />
        <Text
          style={{
            fontFamily: "Raleway-ExtraBold",
            fontSize: 50,
            marginLeft: -18,
          }}
        >
          alsivo
        </Text>
      </View>
      <Text style={styles.text}>
        Get ready to dance to the rhythm of Salsa!
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    height: Constants.statusBarHeight, // Explicit status bar height management
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginHorizontal: "auto",
  },
  text: {
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Raleway-Regular",
    fontSize: 14,
  },
});

export default Splash;
