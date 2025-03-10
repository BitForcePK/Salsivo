import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

const TabContainer = ({ activeTab, onTabClick, tabs }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => onTabClick(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && { color: "#000" }, // Change text color for active tab
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: "auto",
    borderRadius: 100,
    paddingHorizontal: 5,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5, // Add some padding for better spacing
  },
  tabButton: {
    borderRadius: 100,
    height: 45,
    width: 166,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10, // Space between tabs
  },
  activeTab: {
    backgroundColor: "#f5f5f5",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Raleway-Bold",
    color: "#B8B8B8",
  },
});
