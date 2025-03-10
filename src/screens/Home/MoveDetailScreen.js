import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import Container from "../../components/Container/Container";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const MoveDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { warmup, dance, addedMove } = route.params; // It can be a warmup, dance, or addedMove
  const video = useRef(null);

  // Determine the data source
  const data = warmup || dance || addedMove;
  const isAddedMove = !!addedMove;

  return (
    <Container pd={0}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#B8B8B8" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {isAddedMove ? (
        // Added Move layout (matching the screenshot in OP)
        <View style={styles.addedMoveContainer}>
          <Text style={styles.moveTitle}>{data.name || "CBL Suave"}</Text>
          <Text style={styles.moveSubtitle}>
            {data.subtitle || "Cross Body Lead Suave"}
          </Text>

          {/* Video section */}
          {data.videoUri && (
            <View style={styles.videoContainer}>
              <Video
                ref={video}
                style={styles.video}
                source={{ uri: data.videoUri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            </View>
          )}

          {/* Added Move specific details */}
          <View style={styles.detailsContainer}>
            <DetailRow
              label="Start Position:"
              value={data.startPositionShortcode}
            />
            <DetailRow
              label="End Position:"
              value={data.endPositionShortcode}
            />
            <DetailRow label="Move Category:" value={data.category} />
            <DetailRow label="Difficulty:" value={data.difficulty} />
          </View>
        </View>
      ) : (
        // Original dance/warmup layout
        <ScrollView style={styles.scrollContainer}>
          {/* Render video only if it exists */}
          {(warmup || dance) && (warmup || dance).videoUrl && (
            <Video
              ref={video}
              style={styles.video}
              source={(warmup || dance).videoUrl}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          )}

          <InfoSection title="Title" content={data.title || data.fullName} />
          <InfoSection title="Description/Notes" content={data.description} />
          {data.difficulty && (
            <InfoSection title="Move Difficulty" content={data.difficulty} />
          )}
        </ScrollView>
      )}
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
