import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const DanceCard = ({ dance }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MoveDetailsScreen", { dance })}
    >
      {/* Left: Image */}
      <Image source={dance.image} style={styles.image} />

      {/* Right: Title & Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {dance.abbreviation} - {dance.fullName}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {dance.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DanceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    height: 122, // Fixed height
    width: "100%", // Full width
    zIndex: 10,
  },
  image: {
    width: 102, // Fixed width
    height: "100%", // Fill height of card
    borderRadius: 10, // Rounded corners
    borderColor: "#0000000D",
    borderWidth: 1,
  },
  textContainer: {
    flex: 1, // Take remaining space
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: "Raleway-Semibold",
  },
  description: {
    fontSize: 14,
    color: "#B8B8B8",
    fontFamily: "Raleway-Regular",
    marginTop: 5,
    lineHeight: 20,
  },
});
