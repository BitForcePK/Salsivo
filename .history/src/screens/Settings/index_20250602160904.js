import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Container from "../../components/Container/Container";
import BackHeader from "../../components/BackHeader";
import { useNavigation } from "@react-navigation/native";
import { getAvatarUrl } from "../../utils/profile";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const menuItems = [
    { icon: "user", text: "Profile", screen: "Profile" },
    {
      icon: require("../../assets/icons/choreographyIcon.png"),
      text: "Choreographies",
      screen: "ChoreographiesList",
    },
    {
      icon: require("../../assets/icons/subscriptionIcon.png"),
      text: "Subscriptions",
      screen: "Subscriptions",
    },
    { icon: "bell", text: "Notifications", hasSwitch: true },
    { icon: "message-circle", text: "Feedback" },
  ];

  const bottomActions = [
    { icon: "log-out", text: "Logout", screen: "SignIn" },
    { icon: "trash-2", text: "Delete Account", isRed: true },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={() => {
        navigation.navigate(item.screen);
      }}
    >
      <View style={styles.menuIconContainer}>
        {typeof item.icon === "string" ? (
          <Feather name={item.icon} size={22} color="#E74C3C" />
        ) : (
          <Image source={item.icon} style={{ width: 22, height: 22 }} />
        )}
      </View>
      <Text style={item.isRed ? styles.deleteText : styles.menuText}>
        {item.text}
      </Text>
      {item.hasSwitch && (
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
          thumbColor={notificationsEnabled ? "#E74C3C" : "#f4f3f4"}
          ios_backgroundColor="#E0E0E0"
          onValueChange={() => setNotificationsEnabled((prev) => !prev)}
          value={notificationsEnabled}
          style={styles.switch}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Container pd={0}>
      <BackHeader title={"Settings"} />
      <ScrollView
        style={{ backgroundColor: "#f5f5f5", paddingTop: 20, flex: 1 }}
      >
        <View style={styles.profileSection}>
          <Image source={getAvatarUrl()} style={styles.profileImage} />
          <Text style={styles.profileName}>John Doe</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          {bottomActions.map(renderMenuItem)}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: "#999",
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  placeholder: {
    width: 60,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuIconContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    color: "#333",
  },
  deleteText: {
    fontSize: 16,
    flex: 1,
    color: "#E74C3C",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  bottomActions: {
    marginTop: 100,
  },
});
