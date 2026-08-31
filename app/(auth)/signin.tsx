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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
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
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue finding your perfect
            roommate.
          </Text>
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

        <View style={styles.passwordField}>
          <View style={styles.passwordHeader}>
            <Text style={styles.label}>
              Password
            </Text>

            <Pressable
              onPress={() => {
                // TODO: Add forgot password navigation
              }}
            >
              <Text style={styles.forgotPassword}>
                Forgot password?
              </Text>
            </Pressable>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
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
            SIGN IN BUTTON
        ================================================= */}

        <Pressable
          onPress={handleSignIn}
          style={({ pressed }) => [
            styles.signInButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.signInButtonText}>
            Sign In
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
            SIGN UP
        ================================================= */}

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
          </Text>

          <Pressable
            onPress={() =>
              router.push("/(auth)/signup")
            }
          >
            <Text style={styles.signUpLink}>
              Sign Up
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
    marginBottom: spacing[10],
    borderWidth: 1,
    borderColor: colors.border,
  },

  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    marginBottom: spacing[10],
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
     EMAIL
  ======================================================= */

  field: {
    marginBottom: spacing[5],
  },

  label: {
    fontFamily: fonts.bold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },

  input: {
    height: 56,
    marginTop: spacing[2],
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

  passwordField: {
    marginBottom: spacing[2],
  },

  passwordHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  forgotPassword: {
    fontFamily: fonts.bold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
  },

  passwordContainer: {
    height: 56,
    marginTop: spacing[2],
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
     SIGN IN BUTTON
  ======================================================= */

  signInButton: {
    height: 56,
    marginTop: spacing[8],
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  signInButtonText: {
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
    marginVertical: spacing[8],
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
     SIGN UP
  ======================================================= */

  signUpContainer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing[10],
  },

  signUpText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
  },

  signUpLink: {
    fontFamily: fonts.black,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
    color: colors.foreground,
  },
});