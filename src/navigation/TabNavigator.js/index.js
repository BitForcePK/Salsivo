import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Tab2Icon } from "../../assets/svgs/Tab2Icon";
import { Tab1Icon } from "../../assets/svgs/Tab1Icon";
import HomeScreen from "../../screens/Home";
import MovesScreen from "../../screens/Moves";

// Create sample screens

// Placeholder for the center button action
const AddButtonScreen = () => {
  return null;
};

const Tab = createBottomTabNavigator();

// Custom tab bar button for the center "+" button
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.addButtonContainer}
    onPress={onPress}
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
  >
    <View style={styles.addButton}>{children}</View>
  </TouchableOpacity>
);

// Custom tab bar icon with label in a row
const TabBarIcon = ({ focused, color, icon, label }) => (
  <View style={[styles.tabIconContainer, focused ? styles.activeTab : null]}>
    <View style={styles.icon}>{icon}</View>
    <Text
      style={[
        styles.tabText,
        focused ? styles.activeTabText : styles.inactiveTabText,
      ]}
    >
      {label}
    </Text>
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 75,
          backgroundColor: "#FFFFFF",
          paddingBottom: 15, // Ensures content is not hidden
          borderTopWidth: 0,
          paddingHorizontal: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={<Tab1Icon color={focused ? "#E73E3E" : "#B8B8B8"} />}
              label="Home"
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddButton"
        component={AddButtonScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" size={28} color="#FFFFFF" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("StitchMovesScreen");
          },
        })}
      />

      <Tab.Screen
        name="Moves"
        component={MovesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              icon={<Tab2Icon color={focused ? "#E73E3E" : "#B8B8B8"} />}
              label="Moves"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 113,
    marginTop: 30,
  },
  icon: {
    marginRight: 10,
  },
  tabText: {
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: "#FFEAEA",
    borderRadius: 20,
  },
  activeTabText: {
    color: "#E73E3E",
    fontFamily: "Raleway-Bold",
    fontSize: 14,
  },
  inactiveTabText: {
    color: "#B8B8B8",
  },
  addButtonContainer: {
    marginBottom: 15,
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 1000,
    width: 70,
    position: "absolute",
    bottom: 10,
    height: 70,
    alignSelf: "center",
  },
  addButton: {
    backgroundColor: "#E73E3E",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
