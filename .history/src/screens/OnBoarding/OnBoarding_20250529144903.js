import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Svg, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    image: require("../../../src/assets/images/onBoarding1.png"),
    description:
      "Search and learn from a diverse library of Salsa moves, tailored to your style and skill level.",
    titleParts: ["Explore", "Salsa Moves"],
    subtitle: "a World of",
  },
  {
    id: "2",
    image: require("../../../src/assets/images/onBoarding2.png"),
    description:
      "Mix and match your favorite moves to create stunning choreographic sequences with ease.",
    titleParts: ["Design", "Dance Routine"],
    subtitle: "Your unique",
  },
  {
    id: "3",
    image: require("../../../src/assets/images/onBoarding3.png"),
    description:
      "Save your choreography, practice at your own pace, and watch your skills shine.",
    titleParts: ["Perfect", "Moves"],
    subtitle: "Your",
  },
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Applying layout animation when currentIndex changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [currentIndex]);

  useEffect(() => {
    StatusBar.setBarStyle(
      Platform.OS === "ios" ? "dark-content" : "light-content"
    );
  }, []);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigation.navigate("ReferralSource"); // Navigate to SignUp screen when last index is reached
    }
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const progressPercentage = ((currentIndex + 1) / onboardingData.length) * 100;
  const circleCircumference = 2 * Math.PI * 28;
  const strokeDashoffset =
    circleCircumference - (progressPercentage / 100) * circleCircumference;

  const { titleParts, subtitle, description, image } =
    onboardingData[currentIndex];

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" />
        <Header
          currentIndex={currentIndex}
          handleBack={handleBack} // Replace with the actual path to your logo
          onSkip={async () => {
            console.log("Skipping onboarding");
            await AsyncStorage.setItem("onboarding", "true");
            navigation.navigate("SignIn");
          }}
        />
        <View style={styles.content}>
          <Image source={image} style={styles.image} />
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.boldText}>{titleParts[0]}</Text>
            <Text style={styles.regularText}> {subtitle} </Text>
          </View>
          <Text style={styles.boldText}>{titleParts[1]}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Svg height="64" width="64" viewBox="0 0 64 64" style={styles.svg}>
              <Circle
                cx="32"
                cy="32"
                r="28"
                stroke="#E0E0E0"
                strokeWidth="2"
                fill="none"
              />
              <Circle
                cx="32"
                cy="32"
                r="28"
                stroke="#FF5733"
                strokeWidth="2"
                fill="none"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
              />
            </Svg>
            <AntDesign
              name="rightcircle"
              size={48}
              color="#D32F2F"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: width * 0.3,
    height: height * 0.09,
    resizeMode: "contain",
    marginHorizontal: "auto",
  },
  skip: {
    color: "#B8B8B8",
    fontFamily: "Raleway-Medium",
    fontSize: 18,
  },
  backText: {
    color: "#B8B8B8",
    fontSize: 18,
    fontFamily: "Raleway-Medium",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.85,
    height: height * 0.4,
    resizeMode: "contain",
  },
  boldText: {
    fontSize: 30,
    fontFamily: "Raleway-Bold",
  },
  regularText: {
    fontSize: 30,
    fontFamily: "Raleway-Regular",
  },
  description: {
    fontSize: 14,
    color: "#989898",
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 20,
    fontFamily: "Raleway-Medium",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  nextButton: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
  },
  arrowIcon: {
    position: "absolute",
  },
  disabledText: {
    color: "#fff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#D32F2F",
    width: 30,
  },
});

export default OnBoarding;
