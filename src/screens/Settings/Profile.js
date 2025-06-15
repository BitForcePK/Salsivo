import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Container from "../../components/Container/Container";
import BackHeader from "../../components/BackHeader";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { getAvatarUrl } from "../../utils/profile";
import Api from "../../api";

export default function ProfileEditScreen() {
  const navigation = useNavigation();

  const { profile, getProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState({
    name: profile?.name,
    email: profile?.email,
    avatar: profile?.avatar,
    uploading: false,
  });

  const handleImageUpload = async (source) => {
    try {
      let result;

      if (source === "gallery") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          return Alert.alert(
            "Permission Required",
            "We need media permissions to proceed."
          );
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });

        console.log(result);
      } else {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          return Alert.alert(
            "Permission Required",
            "We need camera permissions to proceed."
          );
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });
      }

      if (!result.canceled && result.assets.length > 0) {
        const selectedImageUri = result.assets[0].uri;
        const fileInfo = await FileSystem.getInfoAsync(selectedImageUri);

        if (fileInfo.size && fileInfo.size > 5 * 1024 * 1024) {
          Alert.alert("File too large", "Select an image smaller than 5MB");
          return;
        }

        const asset = result.assets[0];

        setAvatar(asset);
      }
    } catch (error) {
      console.error("Image selection error:", error);
      Alert.alert("Error", "Something went wrong while selecting the image.");
    }
  };

  const saveProfile = async () => {
    if (!data.name.trim()) {
      return Alert.alert("Error", "Name cannot be empty");
    }

    let dt = {
      name: data.name,
    };

    if (avatar) {
      const res = await Api.uploadImage(
        avatar,
        `?file_path=users/${profile?.id}/&file_name=avatar`,
        setLoading
      );

      if (res?.error) {
        Alert.alert("Error", res?.error);
        return;
      }

      dt = {
        ...dt,
        avatar: res?.image?.url + "?q=" + Date.now(),
        avatarMeta: res?.image,
      };
    }

    const res = await Api.updateProfile(dt, setLoading);

    if (res?.error) {
      Alert.alert("Error", res?.error);
      return;
    }

    getProfile();

    Alert.alert("Success", "Profile updated successfully!");
    navigation.goBack();
  };

  return (
    <Container pd={0}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <BackHeader title="Profile" />
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <View style={styles.profileImageContainer}>
          {avatar ? (
            <Image source={{ uri: avatar?.uri }} style={styles.profileImage} />
          ) : (
            <Image
              source={getAvatarUrl(data.avatar)}
              style={styles.profileImage}
            />
          )}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() =>
              Alert.alert("Change Profile Picture", "Choose an option", [
                {
                  text: "Take Photo",
                  onPress: () => handleImageUpload("camera"),
                },
                {
                  text: "Choose from Library",
                  onPress: () => handleImageUpload("gallery"),
                },
                { text: "Cancel", style: "cancel" },
              ])
            }
            disabled={profile.uploading}
          >
            {profile.uploading ? (
              <Feather name="loader" size={20} color="black" />
            ) : (
              <Feather name="camera" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={data.name}
              onChangeText={(text) =>
                setData((prev) => ({ ...prev, name: text }))
              }
              placeholder="Enter your name"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.input, { justifyContent: "center" }]}>
              <Text style={styles.inputText}>
                {data.email ? data.email : "Enter your email"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          gap: 10,
          marginBottom: 10,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Button
          title={"Change Password"}
          style={styles.changePasswordButton}
          textStyle={{ color: "black" }}
          onPress={() => navigation.navigate("ChangePass")}
          disabled={loading}
        />
        <Button
          title={"Save Profile"}
          onPress={saveProfile}
          style={styles.saveButton}
          textStyle={{ color: "#D32F2F" }}
          loading={loading}
          disabled={loading}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    paddingVertical: 32,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: "absolute",
    bottom: 32,
    right: "50%",
    marginRight: -60,
    backgroundColor: "#FF9500",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#666",
  },
  changePasswordButton: {
    backgroundColor: "white",
  },
  saveButton: {
    backgroundColor: "#D32F2F14",
  },
});
