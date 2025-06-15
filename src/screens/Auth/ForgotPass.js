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
import { EmailIcon } from "../../assets/svgs/EmailIcon";
import { PasswordIcon } from "../../assets/svgs/PasswordIcon";
import Button from "../../components/Button/Button";
import Api from "../../api";

const { width, height } = Dimensions.get("window");

const ForgotPass = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleNext = async () => {};

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
              source={require("../../../src/assets/images/forgotPass.png")}
              style={styles.image}
            />

            <Text style={styles.loginText}>Forgot Password?</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Raleway-Medium",
                color: "#B8B8B8",
              }}
            >
              Don’t worry it happens. Please enter the address associated with
              your account.
            </Text>

            <InputField
              label={"Email ID"}
              icon={<EmailIcon />}
              value={email}
              onChangeText={(text) => setEmail(text)}
              secureTextEntry={false}
              keyboardType="email-address"
              autoFocus
              autoCapitalize="none"
            />
          </View>
        </ScrollView>

        <Button
          title={"Submit"}
          style={{ marginTop: 30 }}
          loading={loading}
          disabled={!email || loading}
          onPress={handleNext}
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ForgotPass;

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
