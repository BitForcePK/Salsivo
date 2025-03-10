import { Video } from "expo-av";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const MoveCard = ({ move, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Replace Video with Image component for thumbnail */}
      <Video
        source={{ uri: move.videoUri }}
        style={styles.thumbnail}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        useNativeControls={false}
        isMuted={true}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{move.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.notation}>{move.connectionCode}</Text>{" "}
          {/* Repurposing difficulty prop for Ch-Ch notation */}
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{move.difficulty}</Text>{" "}
            {/* Hardcoded as "1" based on screenshot, or you can pass a count prop */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5f5f",
    borderColor: "#B8B8B833",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 16,
    width: 163,
  },
  thumbnail: {
    width: "100%",
    height: 120,
  },
  infoContainer: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    fontFamily: "Raleway-Bold", // Keep your font family
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notation: {
    fontSize: 14,
    backgroundColor: "#Fff",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    color: "#666666",
    fontFamily: "Raleway-Medium", // Keep your font family
  },
  countBadge: {
    backgroundColor: "#D32F2F0D",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 12,
    color: "#FF4D4D",
    fontFamily: "Raleway-Medium", // Keep your font family
  },
});

export default MoveCard;
