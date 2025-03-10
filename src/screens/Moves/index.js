import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import HomeProfileHeader from "../../components/LogoProfileHeader";
import TabContainer from "../../components/TabContainer";
import { Button } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DanceCard from "../../components/DanceCard";
import { dummyData } from "../../data/warmup";
import { useNavigation, useRoute } from "@react-navigation/native";
import MoveCard from "../../components/MoveCard/MoveCard";

const MovesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [moves, setMoves] = useState([]);
  const [activeTab, setActiveTab] = useState("Available Moves");

  const onTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (route.params?.newMove) {
      // Add the new move to the top of the list
      setMoves((prevMoves) => [route.params.newMove, ...prevMoves]);
    }
  }, [route.params?.newMove]);

  const handleMovePress = (move) => {
    // Navigate to move details screen with the move data
    navigation.navigate("MoveDetailsScreen", { addedMove: move });
  };

  return (
    <Container pd={0} isHomeHeader={true}>
      <View style={{ backgroundColor: "#f5f5f5", flex: 1, padding: 16 }}>
        <ScrollView style={styles.scrollContainer}>
          <TabContainer
            tabs={["Available Moves", "Dance Dictionary"]}
            activeTab={activeTab}
            onTabClick={onTabClick}
          />
          <Searchbar
            placeholderTextColor={"#B8B8B8"}
            iconColor="#B8B8B8"
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              height: 40,
            }}
          />

          {activeTab === "Available Moves" && (
            <>
              <View style={styles.content}>
                {moves.length > 0 ? (
                  <FlatList
                    data={moves}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <>
                        <MoveCard
                          move={item}
                          onPress={() => handleMovePress(item)}
                        />
                      </>
                    )}
                    contentContainerStyle={styles.listContainer}
                    columnWrapperStyle={{
                      justifyContent: "space-between",
                      marginBottom: 3,
                    }}
                  />
                ) : (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      You haven't uploaded any moves yet.
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}
          {activeTab === "Dance Dictionary" && (
            <>
              <View>
                <FlatList
                  data={dummyData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <DanceCard dance={item} />}
                />
              </View>
            </>
          )}
        </ScrollView>
        {activeTab === "Available Moves" && (
          <Button
            style={{
              alignSelf: "flex-end",
              height: 44,
              width: 153,
              zIndex: 1,
              justifyContent: "center",
              borderColor: "#0000001A",
              borderWidth: 1,
            }}
            textColor="#FB8A00"
            buttonColor="#FFEDD7CC"
            icon={() => (
              <AntDesign name="pluscircle" size={24} color="#FB8A00" />
            )}
            onPress={() => navigation.navigate("NewMoveScreen")}
          >
            Add New Move
          </Button>
        )}
      </View>
    </Container>
  );
};

export default MovesScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingTop: 15,
  },
  listContainer: {
    paddingBottom: 20,
    padding: 3,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
});
