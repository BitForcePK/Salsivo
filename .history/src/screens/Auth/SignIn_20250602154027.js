import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField/InputField";
import { EmailIcon } from "../../assets/svgs/EmailIcon";
import { PasswordIcon } from "../../assets/svgs/PasswordIcon";
import Button from "../../components/Button/Button";
import Api from "../../api";

const { width, height } = Dimensions.get("window");

const SignIn = () => {
  const navigation = useNavigation();

  // State for managing form inputs and errors
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    errors: {},
  });

  // Handle input change
  const handleInputChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: "" }, // Clear error when user types
    }));
  };

  // Validate inputs
  const validateForm = () => {
    let errors = {};

    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setForm((prev) => ({ ...prev, errors }));

    return Object.keys(errors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;

    const res = await Api.login(
      {
        email: form.email,
        password: form.password,
      },
      setLoading
    );

    console.log(res);

    if (res?.error) {
      return;
    }

    // Perform login logic here
    console.log("Login Successful", form);
    // navigation.navigate("TabNavigator");
  };

  return (
    <Container>
      <Header handleBack={() => navigation.goBack()} back={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, marginBottom: 30 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Image
              source={require("../../../src/assets/images/loginImg.png")}
              style={styles.image}
            />

            <Text style={styles.loginText}>Login</Text>

            {/* Email Input */}
            <InputField
              label="Email ID"
              icon={<EmailIcon />}
              value={form.email}
              onChangeText={(value) => handleInputChange("email", value)}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
            />
            {form.errors.email ? (
              <Text style={styles.errorText}>{form.errors.email}</Text>
            ) : null}

            {/* Password Input */}
            <InputField
              label="Password"
              icon={<PasswordIcon />}
              secureTextEntry
              value={form.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            {form.errors.password ? (
              <Text style={styles.errorText}>{form.errors.password}</Text>
            ) : null}

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>

            <Button
              title="Login"
              style={{ marginTop: 30 }}
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.signUpSection}>
              <Text style={styles.dontHaveAccountText}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
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
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Raleway-Medium",
    alignSelf: "flex-end",
    marginTop: 10,
    color: "#2A2A2A",
  },
  signUpSection: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveAccountText: {
    fontSize: 14,
    fontFamily: "Raleway-Regular",
    color: "#1E1E1E",
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "Raleway-Bold",
    color: "#D32F2F",
    marginLeft: 5,
  },
});
