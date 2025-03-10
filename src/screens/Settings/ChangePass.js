import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import BackHeader from "../../components/BackHeader";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button/Button";

const ChangePassScreen = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field], // Toggle visibility
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const PasswordInput = ({ label, value, onChange, isVisible, toggle }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isVisible}
          value={value}
          onChangeText={onChange}
          placeholder=""
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={toggle}>
          <Ionicons
            name={isVisible ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Container pd={0}>
      <BackHeader title="Change Password" />

      <View style={styles.formContainer}>
        <PasswordInput
          label="Old Password"
          value={formData.oldPassword}
          onChange={(value) => handleInputChange("oldPassword", value)}
          isVisible={formData.showOldPassword}
          toggle={() => togglePasswordVisibility("showOldPassword")}
        />

        <PasswordInput
          label="New Password"
          value={formData.newPassword}
          onChange={(value) => handleInputChange("newPassword", value)}
          isVisible={formData.showNewPassword}
          toggle={() => togglePasswordVisibility("showNewPassword")}
        />

        <PasswordInput
          label="Confirm New Password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange("confirmPassword", value)}
          isVisible={formData.showConfirmPassword}
          toggle={() => togglePasswordVisibility("showConfirmPassword")}
        />
      </View>

      <Button
        title={"Change Password"}
        style={styles.changeButton}
        textStyle={{ color: "#D32F2F" }}
      />
    </Container>
  );
};

export default ChangePassScreen;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
    backgroundColor: "#f5f5f5",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
    fontFamily: "Raleway-Medium",
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  changeButton: {
    backgroundColor: "#D32F2F14",
    width: "90%",
    marginHorizontal: "auto",
    marginBottom: 30,
  },
});
