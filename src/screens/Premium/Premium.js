import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import Container from "../../components/Container/Container";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CrownIcon } from "../../assets/svgs/CrownIcon";
import { PremimFeaturesIcon } from "../../assets/svgs/PremiumFeaturesIcon";
import { SecurityPromiseIcon } from "../../assets/svgs/SecurityPromiseIcon";
import { CustomerSatisfyIcon } from "../../assets/svgs/CustomerSatisfyIcon";
import Button from "../../components/Button/Button";
import {
  customerReviews,
  premiumFeatures,
  trialFeatures,
} from "../../data/premium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PremiumFeaturesIcon from "../../assets/icons/PremiumFeaturesIcon.png";

const { width } = Dimensions.get("window");

const PremiumScreen = ({ navigation, route }) => {
  const [selectedPlan, setSelectedPlan] = useState("annual");

  const renderFeatureItem = (item, index) => (
    <View key={index} style={styles.itemRow}>
      <View style={styles.iconWrapper}>{item.icon}</View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.desc}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = (text1, text2) => (
    <Text style={styles.sectionHeader}>
      {text1} <Text style={styles.highlight}>{text2}</Text>
    </Text>
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={18}
          color={i <= rating ? "#FB8A00" : "#D1D1D1"}
          style={{ marginRight: 2 }}
        />
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      {renderStars(item.rating)}
      <Text style={styles.reviewText}>{item.description}</Text>
      <Text style={styles.reviewerName}>- {item.name}</Text>
    </View>
  );

  const handleSubscribe = async () => {
    try {
      const subscriptionDetails = {
        type: selectedPlan,
        price: selectedPlan === "annual" ? 49.99 : 7.99,
        startDate: new Date(),
        dueDate: new Date(
          new Date().setMonth(
            new Date().getMonth() + (selectedPlan === "annual" ? 12 : 1)
          )
        ),
      };

      // Save subscription details to AsyncStorage
      await AsyncStorage.setItem(
        "userSubscription",
        JSON.stringify(subscriptionDetails)
      );

      // Navigate back to Subscriptions screen
      navigation.navigate("Subscriptions", {
        subscriptionDetails,
      });
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };
  const handleStartFreeTrial = async () => {
    try {
      // Remove any existing subscription from AsyncStorage
      await AsyncStorage.removeItem("userSubscription");

      // Navigate to Subscriptions screen without subscription details
      navigation.navigate("Subscriptions");
    } catch (error) {
      console.error("Free trial error:", error);
    }
  };

  return (
    <Container cusStyles={{ backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.premiumText}>Salsivo</Text>
        <CrownIcon />
        <Text style={styles.premiumText}>Premium</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigator")}
          style={styles.closeButton}
        >
          <MaterialIcons name="close" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
        {/* Unlock Text */}
        <Text style={styles.unlockText}>
          Unlock the Full <Text style={styles.highlight}>WORLD</Text> of{" "}
          <Text style={styles.highlight}>SALSA</Text> Moves!
        </Text>

        {/* Subscription Plans */}
        <View style={styles.planContainer}>
          <TouchableOpacity
            style={[
              styles.planBox,
              selectedPlan === "annual" && styles.selectedPlan,
            ]}
            onPress={() => setSelectedPlan("annual")}
          >
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>Save 20%</Text>
            </View>
            <Text style={styles.planTitle}>Annual</Text>
            <View>
              <Text style={styles.planPrice}>
                £ <Text style={styles.primaryPriceText}>4.17</Text>
                /mo
              </Text>
              <Text style={styles.planPrice}>
                £ <Text style={styles.secondaryPriceText}>49.99</Text>
                {""} / yr
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planBox,
              selectedPlan === "monthly" && styles.selectedPlan,
            ]}
            onPress={() => setSelectedPlan("monthly")}
          >
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planPrice}>
              £ <Text style={styles.primaryPriceText}>7.99</Text>
              /mo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recurring Billing Text */}
        <Text style={styles.helperText}>
          Recurring billing. Cancel anytime.
        </Text>

        {/* Trial Features */}
        {trialFeatures.map(renderFeatureItem)}

        {/* Premium Features Section */}
        <View style={styles.iconContainer}>
          <Image source={PremiumFeaturesIcon} style={styles.premiumIcon} />
        </View>
        {renderSectionHeader("Premium", "Features")}

        {premiumFeatures.map(renderFeatureItem)}

        <View style={styles.iconContainer}>
          <SecurityPromiseIcon />
        </View>
        {renderSectionHeader("Security", "Promise")}
        <Text style={styles.helperText}>
          We don't send your data to cloud servers, and we don't access your
          entries. No Third-party app can read your data.
        </Text>

        <View style={styles.iconContainer}>
          <CustomerSatisfyIcon />
        </View>
        {renderSectionHeader("Customer", "Satisfaction")}
        <View style={styles.reviewsContainer}>
          <FlatList
            horizontal
            data={customerReviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsListContent}
            snapToInterval={width - 80}
            decelerationRate="fast"
            snapToAlignment="center"
          />
        </View>
      </ScrollView>

      <View
        style={{
          gap: 10,
          width: "90%",
          marginHorizontal: "auto",
          marginBottom: 10,
        }}
      >
        <Button
          title={"Start Free Trial"}
          onPress={handleStartFreeTrial}
          style={{ backgroundColor: "#fff" }}
          textStyle={{ color: "#414141", fontFamily: "Raleway-Bold" }}
        />
        <Button
          title={"Subscribe Now"}
          onPress={handleSubscribe}
          style={{
            borderColor: "#D32F2F",
            borderWidth: 2,
            backgroundColor: "#D32F2F09",
          }}
          textStyle={{ color: "#D32F2F", fontFamily: "Raleway-Bold" }}
        />
      </View>
    </Container>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  premiumText: {
    fontSize: 18,
    fontFamily: "Raleway-Bold",
    color: "#222",
    marginTop: 5,
  },
  closeButton: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 5,
    right: 20,
    top: 0,
  },
  unlockText: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Raleway-Medium",
    marginVertical: 40,
    marginHorizontal: 20,
  },
  highlight: {
    color: "#D32F2F",
    fontSize: 30,
    fontFamily: "Raleway-Bold",
  },
  sectionHeader: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    fontFamily: "Raleway-Medium",
  },
  helperText: {
    textAlign: "center",
    color: "#B8B8B8",
    fontSize: 16,
    fontFamily: "Raleway-Medium",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  planContainer: {
    marginHorizontal: 10,
  },
  planBox: {
    width: "100%",
    padding: 15,
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  selectedPlan: {
    borderColor: "#D32F2F",
    borderWidth: 2,
  },
  discountTag: {
    position: "absolute",
    top: -15,
    left: "45%",
    backgroundColor: "#D32F2F",
    padding: 7,
    borderRadius: 100,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
  },
  planTitle: {
    fontSize: 16,
    fontFamily: "Raleway-Medium",
    color: "#414141",
  },
  planPrice: {
    fontSize: 20,
    fontFamily: "Raleway-SemiBold",
    textAlign: "right",
    color: "#222",
  },
  primaryPriceText: {
    fontSize: 40,
    color: "#D32F2F",
    fontFamily: "Raleway-Bold",
  },
  secondaryPriceText: {
    fontSize: 24,
    color: "#5A5A5A",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "start",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  itemTextContainer: {
    marginLeft: 14,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: "#D32F2F0D",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: "Raleway-SemiBold",
    color: "#414141",
    width: 300,
  },
  itemDesc: {
    fontSize: 14,
    color: "#B8B8B8",
    marginTop: 7,
    fontFamily: "Raleway-Regular",
    width: 300,
  },
  iconContainer: {
    marginHorizontal: "auto",
    marginTop: 50,
  },
  reviewsContainer: {
    marginBottom: 30,
  },
  reviewsListContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  reviewCard: {
    width: width - 80,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 180,
    justifyContent: "space-between",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  reviewText: {
    fontSize: 16,
    color: "#B8B8B8",
    fontFamily: "Raleway-Regular",
    lineHeight: 24,
  },
  reviewerName: {
    fontSize: 14,
    color: "#2A2A2A",
    fontFamily: "Raleway-Italic",
    textAlign: "left",
    marginTop: 10,
  },
  premiumIcon: {
    width: 76,
    height: 76,
  },
});
