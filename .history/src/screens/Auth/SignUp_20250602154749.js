import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField/InputField";
import { EmailIcon } from "../../assets/svgs/EmailIcon";
import { PasswordIcon } from "../../assets/svgs/PasswordIcon";
import Button from "../../components/Button/Button";
import { UserIcon } from "../../assets/svgs/UserIcon";
import Api from "../../api";
import { useAuth } from "../../hooks/useAuth";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    passwordHint:
      "At least 8 characters with a combination of special characters.",
  });

  const handleInputChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: "" },
    }));
  };

  const validateForm = () => {
    let errors = {};

    if (!form.fullName) errors.fullName = "Full Name is required";

    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 8 || !/[!@#$%^&*]/.test(form.password)) {
      errors.password =
        "Password must be at least 8 characters with a special character";
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setForm((prev) => ({ ...prev, errors }));

    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    console.log("Sign Up Successful", form);

    const data = {
      name: form.fullName,
      email: form.email,
      password: form.password,
    };

    const res = await Api.register(data);

    console.log(res);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    login(res?.data?.token, res?.data?.user);

    // navigation.navigate("OtpVerification");
  };

  return (
    <Container>
      <Header handleBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, marginBottom: 30 }}
      >
        <ScrollView>
          <View style={styles.content}>
            <Image
              source={require("../../../src/assets/images/signupImg.png")}
              style={styles.image}
            />

            <Text style={styles.signUpText}>Sign up</Text>

            <InputField
              label="Full Name"
              icon={<UserIcon />}
              value={form.fullName}
              onChangeText={(value) => handleInputChange("fullName", value)}
            />
            {form.errors.fullName ? (
              <Text style={styles.errorText}>{form.errors.fullName}</Text>
            ) : null}

            <InputField
              label="Email ID"
              icon={<EmailIcon />}
              value={form.email}
              onChangeText={(value) => handleInputChange("email", value)}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            {form.errors.email ? (
              <Text style={styles.errorText}>{form.errors.email}</Text>
            ) : null}

            <InputField
              label="Password"
              icon={<PasswordIcon />}
              secureTextEntry
              value={form.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
            {form.password.length < 8 || !/[!@#$%^&*]/.test(form.password) ? (
              <Text style={[styles.hintText, { color: "red" }]}>
                {form.passwordHint}
              </Text>
            ) : null}
            {form.errors.password ? (
              <Text style={styles.errorText}>{form.errors.password}</Text>
            ) : null}

            <InputField
              label="Confirm Password"
              icon={<PasswordIcon />}
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
            />
            {form.errors.confirmPassword ? (
              <Text style={styles.errorText}>
                {form.errors.confirmPassword}
              </Text>
            ) : null}

            <Text style={styles.termsText}>
              By continuing to use Salsivo, you agree with the Salsivo’s
              <Text style={styles.termsLink}> Terms</Text> and
              <Text style={styles.termsLink}> Privacy Notice.</Text>
            </Text>

            <Button
              title="Sign Up"
              style={{ marginTop: 40 }}
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.signUpSection}>
              <Text style={styles.dontHaveAccountText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.signUpLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
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
  signUpText: {
    fontFamily: "Raleway-Bold",
    fontSize: 30,
  },
  termsText: {
    color: "#5A5A5A",
    lineHeight: 22,
    fontSize: 14,
    fontFamily: "Raleway-Regular",
    marginTop: 10,
  },
  termsLink: {
    color: "#FB8A00",
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
    textAlign: "center",
    color: "#1E1E1E",
  },
  signUpLink: {
    fontSize: 16,
    fontFamily: "Raleway-Bold",
    color: "#D32F2F",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontFamily: "Raleway-Medium",
    marginTop: 4,
    marginLeft: 5,
  },
  hintText: {
    fontSize: 12,
    fontFamily: "Raleway-Medium",
    marginTop: 4,
    marginLeft: 5,
  },
});
