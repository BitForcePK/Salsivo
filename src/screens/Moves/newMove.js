import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import BackHeader from "../../components/BackHeader";
import Container from "../../components/Container/Container";
import {
  FormLabel,
  TimeInput,
  DropdownSelector,
  VideoUploader,
  SubmitButton,
  ScreenTitle,
  FormInput,
} from "../../components/FormComponent/FormComponent";
import {
  getConnectionOptions,
  getConnectionShortcode,
  positionOptions,
} from "../../utils/moveUtils";

const NewMoveScreen = () => {
  const navigation = useNavigation();
  const defaultStartPosition = "None";
  const defaultEndPosition = "None";

  const [formData, setFormData] = useState({
    currentStep: 1,
    // Step 1 data
    startTime: 1.1,
    endTime: 1.1,
    followerPosition: "Left",
    video: null,
    // Step 2 data
    alternateStartTime: 1.1,
    alternateEndTime: 1.1,
    alternateFollowerPosition: "Right",
    alternateVideo: null,
    // Step 3 data
    moveName: "",
    moveCategory: "",
    startingPosition: defaultStartPosition,
    connectionStart: getConnectionOptions(defaultStartPosition)[0],
    endPosition: defaultEndPosition,
    connectionEnd: getConnectionOptions(defaultEndPosition)[0],
    difficulty: "1",
    description: "",
    // Upload state
    uploading: false,
    uploadProgress: 0,
  });

  // Update connection options when primary positions change
  useEffect(() => {
    const newConnectionOptions = getConnectionOptions(
      formData.startingPosition
    );
    if (!newConnectionOptions.includes(formData.connectionStart)) {
      updateFormData("connectionStart", newConnectionOptions[0]);
    }
  }, [formData.startingPosition]);

  useEffect(() => {
    const newConnectionOptions = getConnectionOptions(formData.endPosition);
    if (!newConnectionOptions.includes(formData.connectionEnd)) {
      updateFormData("connectionEnd", newConnectionOptions[0]);
    }
  }, [formData.endPosition]);

  // Request permissions
  useEffect(() => {
    (async () => {
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (mediaStatus !== "granted") {
        Alert.alert(
          "Permission Required",
          "Media library permission is needed to upload videos."
        );
      }
    })();
  }, []);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const incrementValue = (key, value) => {
    updateFormData(key, parseFloat((value + 0.1).toFixed(1)));
  };

  const decrementValue = (key, value) => {
    if (value > 0.1) {
      updateFormData(key, parseFloat((value - 0.1).toFixed(1)));
    }
  };

  const pickVideo = async (key) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
        videoMaxDuration: 20,
      });

      if (!result.canceled) {
        const videoAsset = result.assets[0];
        const fileInfo = await FileSystem.getInfoAsync(videoAsset.uri);
        const fileSizeInMB = fileInfo.size / 1024 / 1024;

        if (fileSizeInMB > 10) {
          Alert.alert("Video Too Large", "Please select a video under 10MB.");
          return;
        }

        if (videoAsset.duration && videoAsset.duration > 20000) {
          Alert.alert(
            "Video Too Long",
            "Please select a video under 20 seconds."
          );
          return;
        }

        updateFormData(key, videoAsset);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select video: " + error.message);
    }
  };

  const handleContinueToStep2 = () => {
    if (!formData.video) {
      Alert.alert("Missing Video", "Please select a video first.");
      return;
    }

    if (formData.startTime >= formData.endTime) {
      Alert.alert(
        "Invalid Time Values",
        "End time must be greater than start time."
      );
      return;
    }

    updateFormData("currentStep", 2);
  };

  const handleContinueToStep3 = () => {
    if (
      formData.alternateVideo &&
      formData.alternateStartTime >= formData.alternateEndTime
    ) {
      Alert.alert(
        "Invalid Time Values",
        "End time must be greater than start time for alternate position."
      );
      return;
    }

    updateFormData("currentStep", 3);
  };

  const uploadVideos = async () => {
    if (!formData.moveName.trim()) {
      Alert.alert("Missing Information", "Please enter a name for your move.");
      return;
    }

    try {
      updateFormData("uploading", true);

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        updateFormData("uploadProgress", i);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      updateFormData("uploading", false);
      updateFormData("uploadProgress", 0);

      // Get shortcodes for position and connection
      const startPositionShortcode = formData.startingPosition.charAt(0);
      const endPositionShortcode = formData.endPosition.charAt(0);
      const connectionStartShortcode = getConnectionShortcode(
        formData.connectionStart
      );
      const connectionEndShortcode = getConnectionShortcode(
        formData.connectionEnd
      );

      // Create the move data
      const moveData = {
        id: Date.now().toString(),
        name: formData.moveName,
        category: formData.moveCategory,
        difficulty: formData.difficulty,
        videoUri: formData.video.uri,
        description: formData.description,
        startPosition: formData.startingPosition,
        endPosition: formData.endPosition,
        connectionStart: formData.connectionStart,
        connectionEnd: formData.connectionEnd,
        startPositionShortcode: connectionStartShortcode,
        endPositionShortcode: connectionEndShortcode,
        positionCode: `${startPositionShortcode}-${endPositionShortcode}`,
        connectionCode: `${connectionStartShortcode} - ${connectionEndShortcode}`,
        hasAlternate: formData.alternateVideo ? true : false,
        endPositionShortcode: endPositionShortcode,
        alternateVideoUri: formData.alternateVideo
          ? formData.alternateVideo.uri
          : null,
      };

      Alert.alert(
        "Upload Successful",
        "Your move has been added successfully!",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("TabNavigator", {
                screen: "Moves",
                params: { newMove: moveData },
              }),
          },
        ]
      );
    } catch (error) {
      updateFormData("uploading", false);
      Alert.alert("Upload Failed", error.message);
    }
  };

  const renderStep1 = () => (
    <>
      <ScreenTitle
        title="Add a New Move"
        highlightWord="Move"
        subtitle="Perform the move at 120 BPM for best accuracy."
      />

      <VideoUploader
        video={formData.video}
        onPickVideo={() => pickVideo("video")}
      />

      <TimeInput
        label="Start Time"
        value={formData.startTime}
        onIncrement={() => incrementValue("startTime", formData.startTime)}
        onDecrement={() => decrementValue("startTime", formData.startTime)}
      />

      <TimeInput
        label="End Time"
        value={formData.endTime}
        onIncrement={() => incrementValue("endTime", formData.endTime)}
        onDecrement={() => decrementValue("endTime", formData.endTime)}
      />

      <DropdownSelector
        label="Follower Position in Frame"
        value={formData.followerPosition}
        options={["Left", "Right", "Center"]}
        onChange={(value) => updateFormData("followerPosition", value)}
      />

      <SubmitButton
        onPress={handleContinueToStep2}
        disabled={!formData.video}
        text="Continue"
      />
    </>
  );

  const renderStep2 = () => (
    <>
      <ScreenTitle
        title="Add an alternate position"
        subtitle="This step is optional"
      />

      <VideoUploader
        video={formData.alternateVideo}
        onPickVideo={() => pickVideo("alternateVideo")}
        optional={true}
      />

      <TimeInput
        label="Start Time"
        value={formData.alternateStartTime}
        onIncrement={() =>
          incrementValue("alternateStartTime", formData.alternateStartTime)
        }
        onDecrement={() =>
          decrementValue("alternateStartTime", formData.alternateStartTime)
        }
      />

      <TimeInput
        label="End Time"
        value={formData.alternateEndTime}
        onIncrement={() =>
          incrementValue("alternateEndTime", formData.alternateEndTime)
        }
        onDecrement={() =>
          decrementValue("alternateEndTime", formData.alternateEndTime)
        }
      />

      <DropdownSelector
        label="Follower Position in Frame"
        value={formData.alternateFollowerPosition}
        options={["Left", "Right", "Center"]}
        onChange={(value) => updateFormData("alternateFollowerPosition", value)}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleContinueToStep3}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            styles.finalButton,
            !formData.alternateVideo && styles.disabledFinalButton,
          ]}
          onPress={handleContinueToStep3}
          disabled={
            formData.alternateVideo &&
            formData.alternateStartTime >= formData.alternateEndTime
          }
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <ScreenTitle
        title="Add move details"
        subtitle="Add move details and description"
      />

      <View style={styles.formSection}>
        <View style={[styles.uploadContainer, styles.videoPreviewSmall]}>
          {formData.video && (
            <Video
              source={{ uri: formData.video.uri }}
              style={styles.videoPreview}
              resizeMode="cover"
              useNativeControls={false}
            />
          )}
        </View>
      </View>

      <FormInput
        label="Move Name"
        value={formData.moveName}
        onChangeText={(text) => updateFormData("moveName", text)}
        placeholder="Enter move name"
      />

      <FormInput
        label="Move Category"
        value={formData.moveCategory}
        onChangeText={(text) => updateFormData("moveCategory", text)}
        placeholder="Enter move category"
      />

      <View style={styles.formSection}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Raleway-SemiBold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Starting <Text style={{ color: "#D32F2F" }}>Position</Text>
        </Text>
        <View style={styles.positionContainer}>
          <View style={{ flex: 1 }}>
            <DropdownSelector
              label="Primary"
              value={formData.startingPosition}
              options={positionOptions}
              onChange={(value) => {
                updateFormData("startingPosition", value);
                updateFormData(
                  "connectionStart",
                  getConnectionOptions(value)[0]
                );
              }}
              small={false}
            />
          </View>
          <View style={{ flex: 1 }}>
            <DropdownSelector
              label="Connection"
              value={formData.connectionStart}
              options={getConnectionOptions(formData.startingPosition)}
              onChange={(value) => updateFormData("connectionStart", value)}
              small={false}
            />
          </View>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Raleway-SemiBold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          End <Text style={{ color: "#D32F2F" }}>Position</Text>
        </Text>
        <View style={styles.positionContainer}>
          <View style={{ flex: 1 }}>
            <DropdownSelector
              label="Primary"
              value={formData.endPosition}
              options={positionOptions}
              onChange={(value) => {
                updateFormData("endPosition", value);
                updateFormData("connectionEnd", getConnectionOptions(value)[0]);
              }}
              small={false}
            />
          </View>
          <View style={{ flex: 1 }}>
            <DropdownSelector
              label="Connection"
              value={formData.connectionEnd}
              options={getConnectionOptions(formData.endPosition)}
              onChange={(value) => updateFormData("connectionEnd", value)}
              small={false}
            />
          </View>
        </View>
      </View>

      <DropdownSelector
        label="Difficulty"
        value={formData.difficulty}
        options={["1", "2", "3", "4"]}
        onChange={(value) => updateFormData("difficulty", value)}
      />

      <FormInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => updateFormData("description", text)}
        placeholder="Enter move description"
        multiline={true}
        numberOfLines={4}
      />

      <SubmitButton
        onPress={uploadVideos}
        disabled={!formData.moveName.trim() || formData.uploading}
        uploading={formData.uploading}
        uploadProgress={formData.uploadProgress}
      />
    </>
  );

  return (
    <Container>
      <BackHeader title={"New Move"} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView style={styles.content}>
          {formData.currentStep === 1
            ? renderStep1()
            : formData.currentStep === 2
            ? renderStep2()
            : renderStep3()}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 24,
    width: "100%",
  },
  positionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  uploadContainer: {
    height: 290,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  videoPreviewSmall: {
    height: 200,
  },
  videoPreview: {
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  skipButton: {
    height: 50,
    width: "45%",
    backgroundColor: "#F8F8F8",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#999999",
  },
  continueButton: {
    height: 50,
    backgroundColor: "#FBE9E9",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  finalButton: {
    width: "45%",
    marginTop: 0,
  },
  disabledFinalButton: {
    opacity: 0.7,
  },
  continueText: {
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#E73E3E",
  },
});

export default NewMoveScreen;
