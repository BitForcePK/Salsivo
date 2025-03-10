import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Video } from "expo-av";

// Form Label Component
export const FormLabel = ({
  label,
  showInfo = false,
  onInfoPress,
  textStyle,
}) => (
  <View style={[styles.labelContainer]}>
    <Text style={[styles.label, textStyle]}>{label}</Text>
    {showInfo && (
      <TouchableOpacity onPress={onInfoPress}>
        <Ionicons name="information-circle-outline" size={20} color="#000" />
      </TouchableOpacity>
    )}
  </View>
);

// Time Input Component
export const TimeInput = ({ label, value, onIncrement, onDecrement }) => (
  <View style={styles.formSection}>
    <FormLabel label={`${label} (seconds)`} />
    <View style={styles.timeInputContainer}>
      <Text style={styles.timeValue}>{value.toFixed(1)}</Text>
      <View style={styles.timeControls}>
        <TouchableOpacity style={styles.timeButton} onPress={onIncrement}>
          <Ionicons name="chevron-up" size={18} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeButton} onPress={onDecrement}>
          <Ionicons name="chevron-down" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// Dropdown Selector Component
export const DropdownSelector = ({
  label,
  value,
  options,
  onChange,
  small = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.formSection}>
      {!small && <FormLabel label={label} />}
      <TouchableOpacity
        style={small ? styles.dropdownSmall : styles.dropdownContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{value}</Text>
        <Ionicons name="chevron-down" size={small ? 18 : 20} color="#000" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{label || "Select Option"}</Text>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    option === value && styles.selectedOption,
                  ]}
                  onPress={() => {
                    onChange(option);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      option === value && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                  {option === value && (
                    <Ionicons name="checkmark" size={20} color="#E73E3E" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Video Uploader Component
export const VideoUploader = ({ video, onPickVideo, optional = false }) => (
  <View style={styles.formSection}>
    <FormLabel
      label={optional ? "Upload Alternate Position" : "Upload Your Move Video"}
    />
    {optional && <Text style={styles.optionalText}>Optional</Text>}

    <TouchableOpacity style={styles.uploadContainer} onPress={onPickVideo}>
      {video ? (
        <View style={styles.videoPreviewContainer}>
          <Video
            source={{ uri: video.uri }}
            style={styles.videoPreview}
            resizeMode="cover"
            useNativeControls={false}
          />
          <View style={styles.videoOverlay}>
            <Text style={styles.uploadText}>Video Selected</Text>
            <TouchableOpacity style={styles.changeButton} onPress={onPickVideo}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Feather name="link" size={24} color="#CCCCCC" />
          <Text style={styles.uploadText}>Upload a Video</Text>
          <Text style={styles.limitText}>Video Limit: 20 Sec</Text>
        </>
      )}
    </TouchableOpacity>
  </View>
);

// Submit Button Component
export const SubmitButton = ({
  onPress,
  disabled,
  uploading,
  uploadProgress,
  text,
}) => (
  <TouchableOpacity
    style={[styles.continueButton, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    {uploading ? (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator size="small" color="#E73E3E" />
        <Text style={styles.continueText}>Uploading {uploadProgress}%</Text>
      </View>
    ) : (
      <Text style={styles.continueText}>{text || "Continue"}</Text>
    )}
  </TouchableOpacity>
);

// Screen Title Component
export const ScreenTitle = ({ title, subtitle, highlightWord }) => (
  <View style={styles.titleContainer}>
    {highlightWord ? (
      <Text style={styles.title}>
        {title.replace(highlightWord, "")}
        <Text style={styles.highlightText}>{highlightWord}</Text>
      </Text>
    ) : (
      <Text style={styles.title}>{title}</Text>
    )}
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

// Form Input Component
export const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
}) => (
  <View style={styles.formSection}>
    <FormLabel label={label} />
    <TextInput
      style={[styles.textInput, multiline && styles.textAreaInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#999999"
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? "top" : "center"}
    />
  </View>
);

const styles = StyleSheet.create({
  formSection: {
    marginBottom: 24,
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontFamily: "Raleway-Medium",
    textAlign: "center",
  },
  optionalText: {
    fontSize: 12,
    color: "#999999",
    marginTop: -6,
    marginBottom: 8,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
  },
  timeValue: {
    fontSize: 16,
    color: "#999999",
  },
  timeControls: {
    justifyContent: "center",
  },
  timeButton: {
    padding: 2,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
  },
  dropdownSmall: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: "#999999",
  },
  uploadContainer: {
    height: 290,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  videoPreviewContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  videoPreview: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#999999",
    marginTop: 8,
  },
  limitText: {
    fontSize: 12,
    color: "#BBBBBB",
    marginTop: 4,
  },
  changeButton: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
  },
  changeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Raleway-Medium",
  },
  continueButton: {
    height: 50,
    backgroundColor: "#FBE9E9",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    opacity: 0.7,
  },
  continueText: {
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#E73E3E",
  },
  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Raleway-Bold",
    marginBottom: 4,
  },
  highlightText: {
    color: "#E73E3E",
  },
  subtitle: {
    fontSize: 14,
    color: "#999999",
  },
  textInput: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#444444",
  },
  textAreaInput: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Raleway-Bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: "#FBE9E9",
  },
  optionText: {
    fontSize: 16,
    color: "#444444",
  },
  selectedOptionText: {
    color: "#E73E3E",
    fontFamily: "Raleway-SemiBold",
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 100,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#999999",
  },
});
