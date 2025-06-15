import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import Container from "../../components/Container/Container";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEvent } from "expo";

const MoveDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { warmup } = route.params; // It can be a warmup, dance, or addedMove
  const video = useRef(null);

  console.log(warmup?.video);

  const player = useVideoPlayer(warmup?.video, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Container pd={0}>
      <View>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#B8B8B8" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {warmup?.video && warmup?.video !== "" && (
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          )}

          <InfoSection
            title="Title"
            content={warmup.title ?? warmup.fullName}
          />
          <InfoSection title="Description/Notes" content={warmup.description} />
        </ScrollView>
      </View>
    </Container>
  );
};

// Component for added move details row
const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const InfoSection = ({ title, content }) => (
  <View style={styles.infoSection}>
    <Text style={styles.label}>{title}</Text>
    <Text style={styles.value}>{content}</Text>
  </View>
);

export default MoveDetailsScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 10,
  },
  backText: {
    color: "#B8B8B8",
  },
  // Original dance/warmup styles
  scrollContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  video: {
    width: "100%",
    height: 356,
    backgroundColor: "black",
    marginBottom: 20,
    borderRadius: 20,
  },
  infoSection: {
    gap: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Raleway-SemiBold",
    color: "#B8B8B8",
  },
  value: {
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#5A5A5A",
  },

  // Added Move specific styles
  addedMoveContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  moveTitle: {
    fontSize: 24,
    color: "#E74C3C",
    fontFamily: "Raleway-Bold",
    marginHorizontal: 16,
    marginTop: 16,
  },
  moveSubtitle: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Raleway-SemiBold",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  videoContainer: {
    padding: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: "#B8B8B8",
    fontFamily: "Raleway-SemiBold",
  },
  detailValue: {
    fontSize: 20,
    color: "#333",
    fontFamily: "Raleway-Bold",
  },
});
