import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import Container from "../../components/Container/Container";
import LogoProfileHeader from "../../components/LogoProfileHeader";
import Button from "../../components/Button/Button";
import BackHeader from "../../components/BackHeader";

export default function SaveStitchScreen({ route, navigation }) {
  const { selectedMoves } = route.params;
  const videoRef = useRef(null);
  const mergedVideoUri = selectedMoves[0]?.videoUri;

  // Use a single state object for both inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Handle changes to any input field
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Create choreography data
    const newChoreography = {
      id: Date.now(), // or any unique ID generation method
      title: formData.title || "New Choreo",
      notation: "C-B — O-B", // You can make this dynamic based on moves
      videoUri: mergedVideoUri,
      duration: "50s", // Calculate based on actual video duration
      description: formData.description,
      startPosition: "O-LH",
      endPosition: "O-C",
      difficulty: "Intermediate",
    };

    // Correct way to navigate to a nested screen with params
    navigation.navigate("TabNavigator", {
      screen: "Home",
      params: { newChoreography: newChoreography },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container pd={0}>
        <BackHeader title={"Save your Stitch"} />
        <ScrollView style={styles.container}>
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={mergedVideoUri}
              style={styles.video}
              resizeMode="cover"
              isLooping
              shouldPlay={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Choreo Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter a title for your choreography"
              value={formData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />

            <Text style={[styles.label, { marginTop: 20 }]}>
              Description/Notes
            </Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Add notes or description for your choreography"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <Button
            onPress={handleSave}
            title="Save"
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  videoContainer: {
    width: "100%",
    marginBottom: 24,
  },
  video: {
    width: "100%",
    height: 356,
    borderRadius: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontFamily: "Raleway-SemiBold",
    color: "#B8B8B8",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: "Raleway-Regular",
    color: "#5A5A5A",
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  value: {
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#5A5A5A",
  },
  bottomBar: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: "#EBEBEB",
  },
  saveButton: {
    borderRadius: 24,
    backgroundColor: "#D32F2F14",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 17,
    color: "#D32F2F",
    fontWeight: "600",
  },
});
