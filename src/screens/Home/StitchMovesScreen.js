import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Modalize } from "react-native-modalize";
import MoveCard from "../../components/MoveCard/MoveCard"; // Import the MoveCard component
import LogoProfileHeader from "../../components/LogoProfileHeader";
import Container from "../../components/Container/Container";
import MoveDetails from "../../components/MoveDetails/MoveDetails";
import { useNavigation } from "@react-navigation/native";
import { PFIcon1 } from "../../assets/svgs/PFIcon1";

export default function App() {
  const navigation = useNavigation();
  const [selectedMoves, setSelectedMoves] = useState([]);
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const videoRef = useRef(null);
  const modalizeRef = useRef(null);

  const selectMove = (index) => {
    setSelectedMoveIndex(index);
  };

  const moveDetailsModalizeRef = useRef(null);
  const [selectedPossibleMove, setSelectedPossibleMove] = useState(null);

  // Add this function to handle possible move clicks
  const handlePossibleMoveClick = (move) => {
    setSelectedPossibleMove({
      ...move,
      startPosition: "Open Position", // Add these details as needed
      endPosition: "Basic Position",
      category: "Turn Pattern",
      difficulty: "Intermediate",
    });
    moveDetailsModalizeRef.current?.open();
  };
  // Sample data for pre-made moves
  const preMadeMoves = [
    {
      id: 1,
      name: "Basic Step",
      videoUri: require("../../assets/two.mp4"),
      positionCode: "O",
      connectionCode: "B",
      difficulty: "1",
    },
    {
      id: 2,
      name: "Right Turn",
      videoUri: require("../../assets/dance.mp4"),
      positionCode: "C",
      connectionCode: "B",
      difficulty: "2",
    },
    {
      id: 3,
      name: "Left Turn",
      videoUri: require("../../assets/dance.mp4"),
      positionCode: "O",
      connectionCode: "B",
      difficulty: "2",
    },
    {
      id: 4,
      name: "Cross Body Lead",
      videoUri: require("../../assets/dance.mp4"),
      positionCode: "C",
      connectionCode: "B",
      difficulty: "3",
    },
    {
      id: 5,
      name: "Enchufla",
      videoUri: require("../../assets/dance.mp4"),
      positionCode: "O",
      connectionCode: "B",
      difficulty: "3",
    },
    {
      id: 6,
      name: "Dile Que No",
      videoUri: require("../../assets/dance.mp4"),
      positionCode: "C",
      connectionCode: "B",
      difficulty: "4",
    },
  ];

  // Sample data for possible moves
  const possibleMoves = [
    {
      id: 1,
      name: "CBL IT - O-B",
      level: "O-B",
      color: "#fb8a00",
      startPosition: "Open Position",
      endPosition: "Basic Position",
      category: "Turn Pattern",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      name: "CBL OT Windmill",
      level: "O-B",
      color: "#fb8a00",
      startPosition: "Open Position",
      endPosition: "Basic Position",
      category: "Turn Pattern",
    },
    {
      id: 3,
      name: "Delayed Lead Spin",
      level: "C-B",
      color: "#fb8a00",
      startPosition: "Open Position",
      endPosition: "Basic Position",
      category: "Turn Pattern",
    },
    {
      id: 4,
      name: "CBL OT",
      level: "O-B",
      color: "#fb8a00",
      startPosition: "Open Position",
      endPosition: "Basic Position",
      category: "Turn Pattern",
    },
    {
      id: 5,
      name: "CBL IT Butterfly Wrap Turn",
      level: "O-B",
      color: "#fb8a00",
      startPosition: "Open Position",
      endPosition: "Basic Position",
      category: "Turn Pattern",
    },
  ];

  const openMoveSelector = () => {
    modalizeRef.current?.open();
  };

  const addMove = (move) => {
    if (selectedMoves.length >= 5) {
      alert("You can only add up to 5 moves");
      return;
    }

    // Check if move is already added
    if (selectedMoves.some((m) => m.id === move.id)) {
      alert("This move is already added");
      return;
    }

    const newSelectedMoves = [...selectedMoves, move];
    setSelectedMoves(newSelectedMoves);
    setSelectedMoveIndex(newSelectedMoves.length - 1);
    modalizeRef.current?.close();
  };

  const removeMove = (index) => {
    const newSelectedMoves = selectedMoves.filter((_, i) => i !== index);
    setSelectedMoves(newSelectedMoves);
    if (selectedMoveIndex === index) {
      setSelectedMoveIndex(newSelectedMoves.length > 0 ? 0 : null);
    } else if (selectedMoveIndex > index) {
      setSelectedMoveIndex(selectedMoveIndex - 1);
    }
  };

  const renderMoveCard = ({ item }) => (
    <View style={styles.moveCardContainer}>
      <MoveCard move={item} onPress={() => addMove(item)} />
    </View>
  );
  const handleContinue = () => {
    navigation.navigate("SaveStitch", {
      selectedMoves: selectedMoves,
    });
  };

  return (
    <Container pd={0}>
      <StatusBar barStyle="dark-content" />
      <LogoProfileHeader />
      <ScrollView style={styles.scrollView}>
        {/* Stitch Moves Section */}
        <View style={styles.stitchMovesContainer}>
          <View style={styles.stitchMovesHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleBlack}>Stitch </Text>
              <Text style={styles.titleRed}>Moves</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <PFIcon1 />
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(selectedMoves.length / 5) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {selectedMoves.length}/5{" "}
              <Text style={styles.freeText}>(Free)</Text>
            </Text>
          </View>

          {/* Main Video Display */}
          {/* Main Video Display */}
          <View style={styles.mainVideoContainer}>
            {selectedMoveIndex !== null ? (
              <Video
                ref={videoRef}
                source={selectedMoves[selectedMoveIndex].videoUri}
                style={styles.mainVideo}
                useNativeControls
                resizeMode="cover"
                isLooping
              />
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>No move selected</Text>
              </View>
            )}
          </View>

          {/* Thumbnails */}
          <ScrollView horizontal style={styles.thumbnailsContainer}>
            {selectedMoves.map((move, index) => (
              <View key={index} style={styles.thumbnailWrapper}>
                <TouchableOpacity onPress={() => selectMove(index)}>
                  <Video
                    source={move.videoUri}
                    style={[
                      styles.thumbnail,
                      selectedMoveIndex === index && styles.selectedThumbnail,
                    ]}
                    resizeMode="cover"
                    shouldPlay={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeThumbnail}
                  onPress={() => removeMove(index)}
                >
                  <Text style={styles.removeThumbnailText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {selectedMoves.length < 5 && (
              <TouchableOpacity
                style={styles.addThumbnail}
                onPress={openMoveSelector}
              >
                <Feather name="plus" size={24} color="#d32f2f" />
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#8f9298"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Moves"
                placeholderTextColor="#8f9298"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="sort" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="refresh" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Possible Moves Section */}
          <View style={styles.possibleMovesHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleBlack}>Possible </Text>
              <Text style={styles.titleRed}>Moves</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Possible Moves List */}
          <View style={styles.possibleMovesList}>
            {possibleMoves.map((move) => (
              <TouchableOpacity
                key={move.id}
                style={styles.moveItem}
                onPress={() => handlePossibleMoveClick(move)}
              >
                <Text style={styles.moveName}>{move.name} </Text>
                <Text style={[styles.moveLevel, { color: move.color }]}>
                  , — {move.level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Modalize ref={moveDetailsModalizeRef} modalHeight={400}>
            {selectedPossibleMove && (
              <MoveDetails move={selectedPossibleMove} />
            )}
          </Modalize>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modalize for Pre-made Moves */}
      <Modalize
        ref={modalizeRef}
        modalHeight={500}
        HeaderComponent={
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pre-made Moves</Text>
            <Text style={styles.modalSubtitle}>
              Select a move to add to your sequence
            </Text>
          </View>
        }
      >
        <View style={styles.modalContent}>
          <FlatList
            data={preMadeMoves}
            renderItem={renderMoveCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.moveCardList}
          />
        </View>
      </Modalize>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e7e7e9",
  },
  logo: {
    width: 120,
    height: 40,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  stitchMovesContainer: {
    padding: 16,
  },
  stitchMovesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleBlack: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  titleRed: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  closeButton: {
    fontSize: 28,
    color: "#8f9298",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  heelIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#e7e7e9",
    borderRadius: 4,
    overflow: "hidden",

    marginLeft: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#d32f2f",
    borderRadius: 4,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  freeText: {
    fontWeight: "normal",
    color: "#8f9298",
  },
  mainVideoContainer: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mainVideo: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 16,
  },
  thumbnailsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  thumbnailWrapper: {
    position: "relative",
    marginRight: 8,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeThumbnail: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  removeThumbnailText: {
    fontSize: 16,
    color: "#d32f2f",
    fontWeight: "bold",
  },
  addThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d32f2f",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e7e7e9",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#e7e7e9",
  },
  preMadeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e7e7e9",
  },
  preMadeText: {
    fontSize: 16,
    color: "#8f9298",
    marginRight: 8,
  },
  possibleMovesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
    color: "#d32f2f",
  },
  possibleMovesList: {
    marginBottom: 24,
  },
  moveItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e7e7e9",
  },
  moveName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  moveLevel: {
    fontSize: 16,
    fontWeight: "500",
  },
  continueButton: {
    backgroundColor: "#fff6f6",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  continueText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#d32f2f",
  },
  // Modal styles
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e7e7e9",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#8f9298",
  },
  modalContent: {
    padding: 16,
  },
  moveCardList: {
    paddingBottom: 10,
  },
  moveCardContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: "#d32f2f",
  },
});
