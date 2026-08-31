import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* ================================
            LOGO
        ================================= */}

        <View style={styles.hero}>
          <LinearGradient
            colors={["#7654ff", "#a178ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Ionicons
              name="compass-outline"
              size={42}
              color="#ffffff"
            />
          </LinearGradient>

          <Text style={styles.title}>RoomSync</Text>

          <Text style={styles.subtitle}>
            Find roommates who actually{"\n"}
            fit your lifestyle.
          </Text>
        </View>

        {/* ================================
            FEATURES
        ================================= */}

        <View style={styles.features}>
          <Feature
            icon="sparkles-outline"
            text="AI compatibility matching"
          />

          <Feature
            icon="shield-outline"
            text="Verified landlords & listings"
          />

          <Feature
            icon="people-outline"
            text="Apply as a guild with friends"
          />
        </View>

        {/* ================================
            BUTTONS
        ================================= */}

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push("/signup")}
          >
            <LinearGradient
              colors={["#7956ff", "#a477ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryGradient}
            >
              <Text style={styles.primaryText}>Get Started</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push("/signin")}
          >
            <Text style={styles.loginText}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =====================================================
   FEATURE
===================================================== */

function Feature({
  icon,
  text,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
}) {
  return (
    <View style={styles.feature}>
      <Ionicons
        name={icon}
        size={17}
        color="#9b7cff"
      />

      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0c16",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  /* HERO */

  hero: {
    alignItems: "center",
    paddingTop: 105,
  },

  logo: {
    width: 96,
    height: 96,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#7956ff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,

    elevation: 12,
  },

  title: {
    marginTop: 21,
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1.2,
  },

  subtitle: {
    marginTop: 7,
    color: "#8e90b8",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    fontWeight: "500",
  },

  /* FEATURES */

  features: {
    width: "100%",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
  },

  feature: {
    width: "88%",
    minHeight: 46,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#302956",
    borderRadius: 16,

    backgroundColor: "#161725",
  },

  featureText: {
    marginLeft: 11,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  /* BUTTONS */

  actions: {
    width: "100%",
    gap: 12,
    paddingBottom: 0,
  },

  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 17,
    overflow: "hidden",

    shadowColor: "#7956ff",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 18,

    elevation: 8,
  },

  primaryGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  loginButton: {
    width: "100%",
    height: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202137",
  },

  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.82,
  },
});