import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField/InputField";
import { PasswordIcon } from "../../assets/svgs/PasswordIcon";
import Button from "../../components/Button/Button";

const { width, height } = Dimensions.get("window");

const ResetPass = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header handleBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
        style={{ flex: 1, marginBottom: 30 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" // Ensures tapping outside dismisses keyboard
        >
          <View style={styles.content}>
            <Image
              source={require("../../../src/assets/images/resetPass.png")}
              style={styles.image}
            />

            <Text style={styles.loginText}>Reset Password</Text>
            <InputField
              label={"Password"}
              icon={<PasswordIcon />}
              secureTextEntry
            />
            <InputField
              label={"Confirm Password"}
              icon={<PasswordIcon />}
              secureTextEntry
            />
          </View>
        </ScrollView>

        <Button title={"Submit"} style={{ marginTop: 30 }} />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "center", // Centers content
    paddingBottom: 20, // Ensures extra space when keyboard appears
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    alignSelf: "center",
  },
  content: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  loginText: {
    fontFamily: "Raleway-Bold",
    fontSize: 30,
    marginBottom: 10,
  },
});
