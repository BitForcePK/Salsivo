import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Container from "../../components/Container/Container";
import BackHeader from "../../components/BackHeader";
import Button from "../../components/Button/Button";
import PremiumFeaturesIcon from "../../assets/icons/PremiumFeaturesIcon.png";
import FreeUserIcon from "../../assets/icons/FreeUserIcon.png";
import { SubHistoryIcon } from "../../assets/svgs/SubHistoryIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Subscriptions = ({ navigation, route }) => {
  const [userSubscription, setUserSubscription] = useState(null);

  useEffect(() => {
    // Check for existing subscription when screen loads
    const checkSubscription = async () => {
      try {
        const storedSubscription = await AsyncStorage.getItem(
          "userSubscription"
        );
        if (storedSubscription) {
          setUserSubscription(JSON.parse(storedSubscription));
        }
      } catch (error) {
        console.error("Error retrieving subscription:", error);
      }
    };

    checkSubscription();

    // Check if new subscription was passed from Premium screen
    if (route.params?.subscriptionDetails) {
      setUserSubscription(route.params.subscriptionDetails);
    }
  }, [route.params]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderSubscriptionContent = () => {
    if (!userSubscription) {
      return (
        <View style={styles.card}>
          <Image source={FreeUserIcon} style={{ width: 76, height: 76 }} />
          <Text style={styles.userTypeText}>Free User</Text>
          <Button
            title={"Subscribe Now"}
            onPress={() => navigation.navigate("PremiumScreen")}
            style={styles.subscribeButton}
            textStyle={{ color: "#D32F2F", fontFamily: "Raleway-SemiBold" }}
          />
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Image source={PremiumFeaturesIcon} style={{ width: 76, height: 76 }} />
        <Text style={styles.userTypeText}>Premium User</Text>
        <Text style={styles.subscriptionDetails}>
          {userSubscription.type === "annual" ? "Annual" : "Monthly"} Salsivo
        </Text>
        <Text style={styles.priceDetails}>
          £{userSubscription.price}
          {userSubscription.type === "annual" ? "/yr" : "/mo"}
        </Text>
        <Text style={styles.dueDateText}>
          Due Date: {formatDate(userSubscription.dueDate)}
        </Text>
      </View>
    );
  };

  return (
    <Container pd={0}>
      <BackHeader title={"Subscriptions"} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderSubscriptionContent()}

        {/* Subscription History */}
        <Text style={styles.sectionTitle}>
          Subscription <Text style={{ color: "#D32F2F" }}>History</Text>
        </Text>

        <View style={styles.historyContainer}>
          <SubHistoryIcon />
          <Text style={styles.noHistoryText}>
            {userSubscription
              ? "Your current subscription details"
              : "No subscription history yet."}
          </Text>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#f5f5f5" }}>
        <Button
          onPress={() => navigation.navigate("PremiumScreen")}
          title={"Features List"}
          style={styles.featuresButton}
          textStyle={{ fontFamily: "Raleway-SemiBold", color: "#D32F2F" }}
        />
      </View>
    </Container>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  userTypeText: {
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  subscriptionDetails: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 16,
    color: "#D32F2F",
    marginBottom: 5,
  },
  priceDetails: {
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  dueDateText: {
    fontFamily: "Raleway-Medium",
    fontSize: 14,
    color: "#666",
  },
  subscribeButton: {
    backgroundColor: "#D32F2F14",
    width: 180,
    height: 40,
  },
  sectionTitle: {
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    color: "#333",
    marginVertical: 15,
    textAlign: "center",
  },
  historyContainer: {
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  noHistoryText: {
    fontFamily: "Raleway-Medium",
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  featuresButton: {
    backgroundColor: "#D32F2F14",
    marginBottom: 30,
    width: "90%",
    marginHorizontal: "auto",
  },
});
