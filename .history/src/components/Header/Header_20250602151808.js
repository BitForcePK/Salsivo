// Header.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Header = ({
  currentIndex,
  handleBack,
  logoImage,
  onSkip, // skip is optional, so it's not required
  back = true,
}) => {
  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentIndex === 0}
          style={{ flex: 1 }}
        >
          <View
            style={[
              styles.backButton,
              currentIndex === 0 && styles.disabledButton,
            ]}
          >
            <AntDesign
              name="left"
              size={20}
              color={currentIndex === 0 ? "#fff" : "#B8B8B8"} // Disable color for the back icon
            />
            <Text
              style={[
                styles.backText,
                currentIndex === 0 && styles.disabledText,
              ]}
            >
              Back
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <Image
        source={require("../../../src/assets/icons/logo.png")}
        style={styles.logo}
      />
      {/* Render the skip button only if onSkip is provided */}
      <View style={{ flex: 1 }}>
        {onSkip && (
          <TouchableOpacity onPress={onSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  logo: {
    width: 88,
    height: 40,
    resizeMode: "contain",
    flex: 1,
  },
  skip: {
    color: "#B8B8B8",
    fontFamily: "Raleway-Medium",
    fontSize: 16,
    marginLeft: "auto",
  },
  backText: {
    color: "#B8B8B8",
    fontSize: 16,
    fontFamily: "Raleway-Medium",
    marginBottom: 2,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#fff",
  },
});

export default Header;
