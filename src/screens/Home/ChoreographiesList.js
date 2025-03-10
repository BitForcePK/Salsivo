import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Container from "../../components/Container/Container";
import BackHeader from "../../components/BackHeader";
import ChoreographyCard from "../../components/ChoreographyCard/ChoreographyCard";

const ChoreographiesList = () => {
  // Dummy choreographies data for testing

  const dummyChoreographies = [
    {
      id: 1,
      title: "Triple Spin Combo",
      notation: "C-B — O-B",
      videoUri: require("../../assets/dance.mp4"), // Replace with your actual video assets
      duration: "50s",
      description:
        "A combination of three spins with a smooth transition between each one.",
      startPosition: "O-LH",
      endPosition: "O-C",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Triple Spin Dip",
      notation: "C-B — O-B",
      videoUri: require("../../assets/two.mp4"), // Replace with your actual video assets
      duration: "50s",
      description:
        "A triple spin followed by a dramatic dip, perfect for performances.",
      startPosition: "C-B",
      endPosition: "O-B",
      difficulty: "Advanced",
    },
    {
      id: 3,
      title: "My Cool Sunday Dance",
      notation: "C-B — O-B",
      videoUri: require("../../assets/dance.mp4"), // Replace with your actual video assets
      duration: "50s",
      description:
        "A fun and casual dance routine perfect for social dancing on weekends.",
      startPosition: "O-LH",
      endPosition: "O-B",
      difficulty: "Beginner",
    },
    {
      id: 4,
      title: "New Choreography",
      notation: "C-B — O-B",
      videoUri: require("../../assets/two.mp4"), // Replace with your actual video assets
      duration: "50s",
      description: "A recently created choreography with basic salsa moves.",
      startPosition: "C-B",
      endPosition: "O-B",
      difficulty: "Beginner",
    },
    {
      id: 5,
      title: "Salsa Shines Routine",
      notation: "C-B — O-B",
      videoUri: require("../../assets/dance.mp4"), // Replace with your actual video assets
      duration: "45s",
      description:
        "A sequence of solo salsa shines that can be performed without a partner.",
      startPosition: "O-LH",
      endPosition: "O-LH",
      difficulty: "Intermediate",
    },
    {
      id: 6,
      title: "Bachata Sensual",
      notation: "C-B — O-B",
      videoUri: require("../../assets/two.mp4"), // Replace with your actual video assets
      duration: "60s",
      description:
        "A sensual bachata routine with smooth body waves and close connection.",
      startPosition: "C-B",
      endPosition: "C-B",
      difficulty: "Advanced",
    },
  ];

  const renderItem = ({ item }) => (
    <ChoreographyCard
      btnStyle={{ width: "100%" }}
      style={{ width: "100%" }}
      title={item.title}
      notation={item.notation}
      duration={item.duration}
      videoUri={item.videoUri}
      onPress={() => handleChoreographyPress(item)}
    />
  );

  return (
    <Container pd={0}>
      <BackHeader title="Choreographies" />

      {/* DUMMY LIST  */}
      <FlatList
        data={dummyChoreographies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
});

export default ChoreographiesList;
