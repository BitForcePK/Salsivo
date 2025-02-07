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
          source={require("../../../src/assets/icons/logo.png")}
          style={styles.image}
        />
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Raleway-Regular",
    fontSize: 14,
  },
});

export default Splash;
