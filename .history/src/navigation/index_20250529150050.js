import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthNavigator from "./AuthNavigator/AuthNavigator";
import { useAuth } from "../hooks/useAuth";

export default function AppNavigator() {
  const { isLoggedIn } = useAuth();
  return <AuthNavigator />;
}

const styles = StyleSheet.create({});
