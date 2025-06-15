import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Api from "../../api";

const ReferralSource = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const options = [
    { label: "App Store / Play Store", value: "appStore" },
    { label: "Social Media", value: "socialMedia" },
    { label: "Online Advertisement", value: "onlineAdvertisement" },
    { label: "Website / Blog", value: "websiteBlog" },
    { label: "Friend / Word of Mouth", value: "wordOfMouth" },
    {
      label: "Influencer / Content Creator",
      value: "influencer",
    },
    { label: "Email / Newsletter", value: "emailNewsletter" },
    { label: "Event / Conference", value: "eventConference" },
    { label: "Flyer / Poster", value: "flyerPoster" },
    { label: "Other", value: "other" },
  ];

  const handleNext = async () => {
    navigation.replace("SignIn");
    await AsyncStorage.setItem("onboarding", "true");
    await Api.addSurvey({ answer: selectedOption });
    Keyboard.dismiss();
  };

  return (
    <Container cusStyles={{ paddingHorizontal: 20 }}>
      <Header
        onSkip={async () => {
          await AsyncStorage.setItem("onboarding", "true");
          await Api.addSurvey({ answer: "skip" });
          navigation.replace("SignIn");
        }}
        currentIndex={0}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Where did you hear about us?</Text>

            <RadioButton.Group
              onValueChange={setSelectedOption}
              value={selectedOption}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <View style={styles.optionContainer}>
                    <RadioButton.Android
                      value={item.value}
                      color="#D32F2F"
                      uncheckedColor="#B8B8B8"
                    />
                    <Text style={styles.optionText}>{item.label}</Text>
                  </View>
                )}
              />
            </RadioButton.Group>

            {selectedOption === "Other" && (
              <View style={{ marginTop: 10, marginBottom: 50 }}>
                <TextInput
                  multiline
                  style={styles.input}
                  placeholder="Write your own words"
                  value={otherText}
                  onChangeText={setOtherText}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 300);
                  }}
                />
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>

        <View style={{ paddingBottom: 20 }}>
          <Button title={"Next"} onPress={handleNext} />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ReferralSource;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Raleway-Semibold",
    marginTop: 20,
    width: 280,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#989898",
    fontFamily: "Raleway-Medium",
  },
  input: {
    borderWidth: 2,
    borderColor: "#F5F5F5",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
  },
});
