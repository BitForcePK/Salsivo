import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ChoreographyCard = ({
  title,
  notation,
  duration = "50s",
  videoUri,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {/* Video Thumbnail */}
      <Video
        source={videoUri}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={true}
        isMuted={true}
      />

      {/* Content Below Video with Gradient Background */}
      <LinearGradient
        colors={["#ccccd8", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.4)"]}
        style={styles.contentContainer}
      >
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.notation}>{notation}</Text>
        </View>

        {/* Practice Button */}
        <TouchableOpacity style={styles.practiceButton} onPress={onPress}>
          <Ionicons name="play" size={20} color="#D32F2F" />
          <Text style={styles.buttonText}>Start Practice</Text>
          <Text style={styles.duration}>{duration}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 16,
    marginRight: 15, // Horizontal spacing for FlatList
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    width: 216,
    borderWidth: 1,
    borderColor: "#0000001A",
  },
  video: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginBottom: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Raleway-Bold",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  notation: {
    fontSize: 16,
    fontFamily: "Raleway-Medium",
    color: "#666",
    textAlign: "center",
  },
  practiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D32F2F0A",
    width: 190,
    height: 30,
    paddingHorizontal: 7,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#D32F2F",
  },
  buttonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
    color: "#D32F2F",
  },
  duration: {
    fontSize: 16,
    fontFamily: "Raleway-Medium",
    color: "#D32F2F",
  },
});

export default ChoreographyCard;
