import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

const { width, height } = Dimensions.get("window");

const OtpVerification = ({ navigation }) => {
  const correctOTP = "1234";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpCorrect, setIsOtpCorrect] = useState(null);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (text, index) => {
    if (text.length > 1) return; // Prevent multiple characters in a single box

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < 3) {
      inputRefs[index + 1].current.focus(); // Move to next input
    }

    if (index === 3) {
      Keyboard.dismiss(); // Hide keyboard when last input is filled
      validateOtp(newOtp);
    }
  };

  const validateOtp = (enteredOtp) => {
    const enteredCode = enteredOtp.join("");
    setIsOtpCorrect(enteredCode === correctOTP);
  };

  return (
    <Container>
      <Header title="OTP Verification" handleBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <Image
                source={require("../../assets/images/otpImg.png")}
                style={styles.image}
              />

              <Text style={styles.otpText}>Enter OTP</Text>
              <Text style={styles.optDesc}>
                Enter 4-digit OTP code sent to your email
              </Text>
              <Text style={[styles.optDesc, { color: "#FB8A00" }]}>
                abc@xyz.com
              </Text>

              {/* OTP Input Boxes */}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    style={[
                      styles.otpBox,
                      isOtpCorrect === true
                        ? styles.success
                        : isOtpCorrect === false
                        ? styles.error
                        : {},
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    value={digit}
                    textAlign="center"
                  />
                ))}
              </View>

              {/* Resend OTP */}
            </View>
          </TouchableWithoutFeedback>
          <Button
            title="Next"
            onPress={
              () =>
                isOtpCorrect
                  ? navigation.navigate("TabNavigator") // Navigate if OTP is correct
                  : alert("Incorrect OTP! Please try again.") // Show error if incorrect
            }
            style={{
              marginVertical: 20,
              width: "90%",
              marginHorizontal: "auto",
            }}
          />
          <TouchableOpacity onPress={() => alert("OTP Resent!")}>
            <Text style={styles.resendText}>
              Didn't receive code?{" "}
              <Text style={{ fontFamily: "Raleway-Medium", color: "#FF4E4D" }}>
                Resend
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Next Button */}
    </Container>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    alignSelf: "center",
  },
  content: {
    marginTop: 15,
    paddingHorizontal: 12,
    marginBottom: 40,
  },
  otpText: {
    fontFamily: "Raleway-Bold",
    fontSize: 30,
    marginBottom: 10,
  },
  optDesc: {
    fontSize: 17,
    fontFamily: "Raleway-Medium",
    color: "#2A2A2A",
  },
  otpContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  otpBox: {
    width: 78,
    height: 78,
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D9D9D9",
    fontSize: 32,
    color: "#2A2A2A",
  },
  success: {
    backgroundColor: "#43A04830",
    borderColor: "#43A048",
    color: "#43A048",
    fontSize: 32,
    fontFamily: "Raleway-Bold",
  },
  error: {
    backgroundColor: "#FFCDD2",
    borderColor: "#D32F2F",
    color: "#D32F2F",
    fontFamily: "Raleway-Bold",
    fontSize: 32,
  },
  resendText: {
    color: "#1E1E1E",
    fontSize: 16,
    fontFamily: "Raleway-Regular",
    textAlign: "center",
  },
});
