import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BackHeader = ({ title, style }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, style]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#B8B8B8" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Screen Title (Centered) */}
      <Text style={styles.title}>{title}</Text>

      {/* Placeholder to balance layout */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  backText: {
    color: "#B8B8B8",
  },
  title: {
    fontSize: 18,
    fontFamily: "Raleway-SemiBold",
    color: "#333",
    textAlign: "center",
    flex: 1, // This makes sure the title is centered properly
  },
  placeholder: {
    width: 50, // Placeholder to balance layout when no right-side element exists
  },
});

export default BackHeader;
