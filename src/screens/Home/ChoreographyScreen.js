import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import Container from "../../components/Container/Container";
import BackHeader from "../../components/BackHeader";
import Button from "../../components/Button/Button";

export default function ChoreographyScreen({ route, navigation }) {
  const { choreography } = route.params;
  const videoRef = useRef(null);

  useEffect(() => {
    // Play video when screen loads
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Delete Choreography",
      "Are you sure you want to delete this choreography?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Here you would handle the actual deletion
            // For now, just navigate back
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  const InfoSection = ({ title, content }) => (
    <View style={styles.infoSection}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{content}</Text>
    </View>
  );

  return (
    <Container pd={0}>
      <BackHeader title={choreography.title || "Choreography"} />
      <ScrollView style={styles.container}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={choreography.videoUri}
            style={styles.video}
            resizeMode="cover"
            isLooping
            shouldPlay={true}
            useNativeControls
          />
        </View>

        <View style={styles.detailsContainer}>
          <InfoSection
            title="Choreo Title"
            content={choreography.title || "Untitled"}
          />

          <InfoSection
            title="Description/Notes"
            content={choreography.description || "No description provided."}
          />

          <InfoSection
            title="Start Position"
            content={choreography.startPosition || "O-LH"}
          />

          <InfoSection
            title="End Position"
            content={choreography.endPosition || "O-C"}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          onPress={handleDelete}
          title="Delete"
          style={styles.deleteButton}
          textStyle={styles.deleteButtonText}
        />
      </View>
    </Container>
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
  detailsContainer: {
    marginBottom: 30,
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Raleway-SemiBold",
    color: "#B8B8B8",
    marginBottom: 8,
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
  deleteButton: {
    borderRadius: 24,
    backgroundColor: "#FF000014",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 17,
    color: "#FF0000",
    fontWeight: "600",
  },
});
