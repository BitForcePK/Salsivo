import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const MoveDetails = ({ move }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Move name in red */}
      <Text style={styles.moveCode}>{move.name}</Text>

      {/* Full move name */}
      <Text style={styles.fullName}>
        {move.fullName || "Crossbody Lead Inside Turn"}
      </Text>

      {/* Details section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Position:</Text>
          <Text style={styles.detailValue}>{move.startPosition || "O-LH"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>End Position:</Text>
          <Text style={styles.detailValue}>{move.endPosition || "O-C"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Move Category:</Text>
          <Text style={styles.detailValue}>{move.category || "CBL"}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Difficulty:</Text>
          <Text style={styles.detailValue}>{move.difficulty || "2"}</Text>
        </View>
      </View>

      {/* Additional content can be added here */}
      <View style={styles.additionalContent}>
        {/* Video player, description, or other elements */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  moveCode: {
    fontSize: 20,
    fontFamily: "Raleway-Semibold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  fullName: {
    fontSize: 16,
    fontFamily: "Raleway-Medium",
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 18,
    color: "#B8B8B8",
    fontFamily: "Raleway-Medium",
  },
  detailValue: {
    fontSize: 20,
    fontFamily: "Raleway-Semibold",
  },
  additionalContent: {
    marginTop: 20,
    paddingBottom: 40,
  },
});

export default MoveDetails;
