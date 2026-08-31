import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import {
  colors,
  fonts,
  fontSize,
  fontWeight,
  spacing,
  radius,
} from "@/constants/theme";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSignUp = () => {
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: Connect your authentication backend here.

    // Temporary navigation for testing:
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={colors.foreground}
          />
        </Pressable>

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Create account
          </Text>

          <Text style={styles.subtitle}>
            Create your profile and start finding people
            you'll love living with.
          </Text>
        </View>

        {/* =================================================
            NAME
        ================================================= */}

        <View style={styles.field}>
          <Text style={styles.label}>
            Full name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="words"
            style={styles.input}
          />
        </View>

        {/* =================================================
            EMAIL
        ================================================= */}

        <View style={styles.field}>
          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        {/* =================================================
            PASSWORD
        ================================================= */}

        <View style={styles.field}>
          <Text style={styles.label}>
            Password
          </Text>

          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.passwordInput}
            />

            <Pressable
              onPress={() =>
                setShowPassword(!showPassword)
              }
              style={styles.showButton}
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color={colors.mutedForeground}
              />
            </Pressable>
          </View>
        </View>

        {/* =================================================
            CONFIRM PASSWORD
        ================================================= */}

        <View style={styles.fieldSmall}>
          <Text style={styles.label}>
            Confirm password
          </Text>

          <View style={styles.passwordContainer}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repeat your password"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.passwordInput}
            />

            <Pressable
              onPress={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={styles.showButton}
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color={colors.mutedForeground}
              />
            </Pressable>
          </View>
        </View>

        {/* =================================================
            ERROR
        ================================================= */}

        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={16}
              color={colors.destructive}
            />

            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        ) : null}

        {/* =================================================
            TERMS
        ================================================= */}

        <Text style={styles.terms}>
          By creating an account, you agree to our Terms
          of Service and Privacy Policy.
        </Text>

        {/* =================================================
            CREATE ACCOUNT
        ================================================= */}

        <Pressable
          onPress={handleSignUp}
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.createButtonText}>
            Create Account
          </Text>
        </Pressable>

        {/* =================================================
            DIVIDER
        ================================================= */}

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />

          <Text style={styles.dividerText}>
            or
          </Text>

          <View style={styles.divider} />
        </View>

        {/* =================================================
            GOOGLE
        ================================================= */}

        <Pressable
          style={({ pressed }) => [
            styles.googleButton,
            pressed && styles.googlePressed,
          ]}
        >
          <View style={styles.googleIcon}>
            <Text style={styles.googleG}>
              G
            </Text>
          </View>

          <Text style={styles.googleText}>
            Continue with Google
          </Text>
        </Pressable>

        {/* =================================================
            SIGN IN
        ================================================= */}

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an account?{" "}
          </Text>

          <Pressable
            onPress={() =>
              router.push("/(auth)/signin")
            }
          >
            <Text style={styles.signInLink}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[10],
    paddingBottom: spacing[10],
  },

  /* =======================================================
     BACK BUTTON
  ======================================================= */

  backButton: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: radius.full,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[8],
    borderWidth: 1,
    borderColor: colors.border,
  },

  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    marginBottom: spacing[8],
  },

  title: {
    fontFamily: fonts.black,
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.black,
    lineHeight: fontSize["3xl"] * 1.2,
    color: colors.foreground,
  },

  subtitle: {
    marginTop: spacing[3],
    fontFamily: fonts.sans,
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.base * 1.5,
    color: colors.mutedForeground,
  },

  /* =======================================================
     FIELDS
  ======================================================= */

  field: {
    marginBottom: spacing[5],
  },

  fieldSmall: {
    marginBottom: spacing[2],
  },

  label: {
    marginBottom: spacing[2],
    fontFamily: fonts.bold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },

  input: {
    height: 56,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: spacing[4],
    fontFamily: fonts.sans,
    fontSize: fontSize.base,
    color: colors.foreground,
  },

  /* =======================================================
     PASSWORD
  ======================================================= */

  passwordContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: spacing[4],
    fontFamily: fonts.sans,
    fontSize: fontSize.base,
    color: colors.foreground,
  },

  showButton: {
    height: "100%",
    paddingHorizontal: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },

  /* =======================================================
     ERROR
  ======================================================= */

  errorContainer: {
    marginTop: spacing[2],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1.5],
  },

  errorText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.destructive,
  },

  /* =======================================================
     TERMS
  ======================================================= */

  terms: {
    marginTop: spacing[5],
    textAlign: "center",
    fontFamily: fonts.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: fontSize.xs * 1.6,
    color: colors.mutedForeground,
  },

  /* =======================================================
     CREATE ACCOUNT
  ======================================================= */

  createButton: {
    height: 56,
    marginTop: spacing[5],
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  createButtonText: {
    fontFamily: fonts.black,
    fontSize: fontSize.base,
    fontWeight: fontWeight.black,
    color: colors.primaryForeground,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  /* =======================================================
     DIVIDER
  ======================================================= */

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing[7],
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    marginHorizontal: spacing[4],
    fontFamily: fonts.sans,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },

  /* =======================================================
     GOOGLE
  ======================================================= */

  googleButton: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },

  googlePressed: {
    backgroundColor: colors.muted,
  },

  googleIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[2],
  },

  googleG: {
    fontFamily: fonts.black,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.black,
    color: colors.foreground,
  },

  googleText: {
    fontFamily: fonts.bold,
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },

  /* =======================================================
     SIGN IN
  ======================================================= */

  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing[8],
  },

  signInText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },

  signInLink: {
    fontFamily: fonts.black,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
    color: colors.foreground,
  },
});