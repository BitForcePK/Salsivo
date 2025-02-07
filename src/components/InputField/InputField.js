import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const InputField = ({
  label,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoFocus = false,
  errorMsg,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedLabelPosition = useState(new Animated.Value(value ? 1 : 0))[0];
  const inputRef = useRef(null);

  // Focus the input field when the component mounts
  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedLabelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute",
    left: 40,
    color: "#B8B8B8",
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 3],
      outputRange: [24, 5], // Adjust the values as needed for your layout
    }),
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14], // Larger when acting as placeholder, smaller when floating
    }),
    zIndex: 1,
    paddingHorizontal: 4,
    fontFamily: "Raleway",
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Add the SVG icon here before the TextInput */}
        <View>{icon}</View>

        <TextInput
          ref={inputRef}
          style={[styles.input, isFocused && styles.inputFocused]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType} // Handle keyboard type
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={handleTogglePassword}
            style={styles.iconContainer}
          >
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={22}
              color="#B8B8B8"
            />
          </TouchableOpacity>
        )}
      </View>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <Text style={styles.errorText}>{errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 7,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row", // This will position the icon and input side by side
    alignItems: "center", // Vertically center the icon and input
  },
  input: {
    height: 67,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 18,
    fontFamily: "Raleway-Medium",
    color: "#2A2A2A",
    paddingTop: 40,
    marginLeft: 22,
    paddingRight: 50, // Ensure space for the icon
    flex: 1, // This ensures the input takes up the available space
  },
  icon: {
    position: "absolute",
    left: 12,
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    top: "50%", // Adjust for vertical alignment
    transform: [{ translateY: -16 }], // Center the icon vertically
    zIndex: 2, // Ensure icon is above input field
  },
  errorText: {
    color: "#F44336",
    fontSize: 12,
    fontFamily: "Raleway-Medium",
    marginTop: 4,
    marginLeft: 42,
  },
});

export default InputField;
