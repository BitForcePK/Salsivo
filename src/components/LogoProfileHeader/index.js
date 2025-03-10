import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeProfileHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../src/assets/icons/logo.png")}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          source={require("../../../src/assets/images/dp.png")}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingHorizontal: 24,
  },
  logo: {
    width: 87,
    height: 39,
  },
});
