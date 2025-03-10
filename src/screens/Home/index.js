import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeProfileHeader from "../../components/LogoProfileHeader";
import Container from "../../components/Container/Container";
import { warmups } from "../../data/warmup";
import { WarmupItem } from "../../components/Warmup/WarmupItem";
import { Button } from "react-native-paper";
import { StitchIcon } from "../../assets/svgs/StitchIcon";
import TabContainer from "../../components/TabContainer";
import ChoreographyCard from "../../components/ChoreographyCard/ChoreographyCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [choreographies, setChoreographies] = useState([]);

  // Handle new choreography from navigation params
  useEffect(() => {
    console.log("Route params changed:", route.params);
    if (route.params?.newChoreography) {
      console.log("New choreography detected:", route.params.newChoreography);
      setChoreographies((prev) => [...prev, route.params.newChoreography]);

      // Clear the parameter after using it to prevent duplicates on re-renders
      navigation.setParams({ newChoreography: undefined });
    }
  }, [route.params]);

  const handleChoreographyPress = (choreography) => {
    navigation.navigate("ChoreographyScreen", { choreography });
  };

  // Fixed renderChoreographyItem to show only one card per item
  const renderChoreographyItem = ({ item }) => (
    <>
      <ChoreographyCard
        key={item.id}
        title={item.title}
        notation={item.notation}
        duration={item.duration}
        videoUri={item.videoUri}
        onPress={() => handleChoreographyPress(item)}
      />
    </>
  );

  const EmptyListComponent = () => (
    <View style={styles.noChoreographiesContainer}>
      <Image
        source={require("../../../src/assets/images/noChoreographies.png")}
        style={styles.noChoreographiesImage}
      />
      <Text style={styles.noChoreographiesTitle}>No Choreographies yet</Text>
      <Text style={styles.noChoreographiesSubtitle}>
        No worries create your own choreography now.
      </Text>

      <Button
        buttonColor="#D32F2F0D"
        textColor="#D32F2F"
        icon={require("../../assets/icons/stitchIcon.png")}
        style={styles.stitchButton}
        onPress={() => navigation.navigate("StitchMovesScreen")}
      >
        Stitch Now
      </Button>
    </View>
  );

  return (
    <Container pd={0}>
      <HomeProfileHeader />
      <ScrollView style={styles.scrollContainer}>
        {/* Choreographies Header */}
        {choreographies.length > 0 && (
          <View style={styles.header}>
            <Text style={styles.title}>Choreographies</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChoreographiesList")}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={choreographies}
          horizontal
          renderItem={renderChoreographyItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.choreographiesFlatList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={EmptyListComponent}
          ItemSeparatorComponent={() => (
            <View style={styles.choreographySeparator} />
          )}
        />

        {/* Warmups Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Warmups</Text>
          <TouchableOpacity onPress={() => navigation.navigate("")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Warmups List */}
        <FlatList
          data={warmups}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WarmupItem warmup={item} />}
          contentContainerStyle={styles.flatListContainer}
        />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: "Raleway-Bold",
    color: "#000",
  },
  seeAll: {
    fontSize: 14,
    color: "#D32F2F",
    fontFamily: "Raleway-Medium",
  },
  flatListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  choreographiesFlatList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  choreographySeparator: {
    width: 16, // Gap between choreography cards
  },
  noChoreographiesContainer: {
    alignItems: "center",
    padding: 20,
  },
  noChoreographiesImage: {
    width: 200,
    height: 200,
  },
  noChoreographiesTitle: {
    textAlign: "center",
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    marginTop: 10,
  },
  noChoreographiesSubtitle: {
    textAlign: "center",
    fontFamily: "Raleway-Regular",
    fontSize: 14,
    marginTop: 5,
    color: "#B8B8B8",
  },
  stitchButton: {
    width: 150,
    marginTop: 20,
    borderColor: "#D32F2F1A",
    borderWidth: 1,
    alignSelf: "center",
  },
});
