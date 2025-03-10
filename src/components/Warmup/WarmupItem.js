import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const WarmupItem = ({ warmup }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.warmupContainer}
      onPress={() => navigation.navigate("MoveDetailsScreen", { warmup })}
    >
      <Image source={warmup.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.warmupTitle} numberOfLines={2} ellipsizeMode="tail">
          {warmup.title}
        </Text>
        <Text
          style={styles.warmupSession}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {warmup.sessionType} - {warmup.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  warmupContainer: {
    width: 131,
    height: 175,
    borderColor: "#00000006",
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 149,
    borderRadius: 12,
    objectFit: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 73,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: "center",
  },
  warmupTitle: {
    fontSize: 15,
    fontFamily: "Raleway-Bold",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 4,
    flexShrink: 1,
  },
  warmupSession: {
    fontSize: 13,
    color: "gray",
    fontFamily: "Raleway-Medium",
    textAlign: "center",
  },
});
