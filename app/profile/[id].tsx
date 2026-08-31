import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { roommateProfiles } from "@/constants/data";

export default function ProfileDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const profile = roommateProfiles.find(
    (item) => item.id === id
  );

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>
            Profile not found
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              Go back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
        }}
      >
        {/* =========================
            HERO
        ========================= */}

        <View style={styles.hero}>

          <Image
            source={{ uri: profile.image }}
            style={styles.heroImage}
            contentFit="cover"
          />

          {/* Gradient-like dark overlay */}

          <View style={styles.overlay} />

          {/* Back */}

          <Pressable
            onPress={() => router.back()}
            style={styles.backCircle}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="white"
            />
          </Pressable>

          {/* Verified */}

          {profile.verified && (
            <View style={styles.verified}>
              <Ionicons
                name="shield-checkmark"
                size={14}
                color="white"
              />

              <Text style={styles.verifiedText}>
                Verified
              </Text>
            </View>
          )}

          {/* Bottom profile information */}

          <View style={styles.heroBottom}>

            <View style={styles.heroText}>
              <Text style={styles.name}>
                {profile.name}, {profile.age}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color="white"
                />

                <Text style={styles.location}>
                  {profile.location}
                </Text>
              </View>
            </View>

            {/* Match */}

            <View style={styles.matchCircle}>
              <Text style={styles.matchNumber}>
                {profile.match}%
              </Text>

              <Text style={styles.matchText}>
                MATCH
              </Text>
            </View>

          </View>
        </View>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <View style={styles.content}>

          {/* Preferences */}

          <View style={styles.preferenceContainer}>

            <Preference
              icon="time-outline"
              text={profile.preferences.sleepSchedule}
            />

            <Preference
              icon="volume-mute-outline"
              text={profile.preferences.noise}
            />

            <Preference
              icon="close-outline"
              text={profile.preferences.smoking}
            />

            <Preference
              icon="paw-outline"
              text={profile.preferences.pets}
            />

            <Preference
              icon="sparkles-outline"
              text={profile.preferences.cleanliness}
            />

          </View>

          {/* =========================
              ABOUT
          ========================= */}

          <Text style={styles.sectionTitle}>
            About {profile.name.split(" ")[0]}
          </Text>

          <Text style={styles.bio}>
            {profile.bio}
          </Text>

          {/* =========================
              LIFESTYLE
          ========================= */}

          <Text style={styles.sectionTitle}>
            Lifestyle
          </Text>

          <View style={styles.card}>

            <LifestyleRow
              icon="time-outline"
              label="Sleep schedule"
              value={profile.preferences.sleepSchedule}
            />

            <LifestyleRow
              icon="volume-mute-outline"
              label="Noise"
              value={profile.preferences.noise}
            />

            <LifestyleRow
              icon="ban-outline"
              label="Smoking"
              value={profile.preferences.smoking}
            />

            <LifestyleRow
              icon="paw-outline"
              label="Pets"
              value={profile.preferences.pets}
            />

            <LifestyleRow
              icon="sparkles-outline"
              label="Cleanliness"
              value={profile.preferences.cleanliness}
            />

          </View>

          {/* =========================
              TAGS
          ========================= */}

          <Text style={styles.sectionTitle}>
            Interests & lifestyle
          </Text>

          <View style={styles.tags}>
            {profile.tags.map((tag) => (
              <View
                key={tag}
                style={styles.tag}
              >
                <Text style={styles.tagText}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* =========================
              BUDGET
          ========================= */}

          <Text style={styles.sectionTitle}>
            Budget
          </Text>

          <View style={styles.budgetCard}>

            <View style={styles.budgetIcon}>
              <Ionicons
                name="wallet-outline"
                size={22}
                color="#9b8bff"
              />
            </View>

            <View>
              <Text style={styles.budgetLabel}>
                Monthly budget
              </Text>

              <Text style={styles.budgetValue}>
                {profile.price}
              </Text>
            </View>

          </View>

          {/* =========================
              COMPATIBILITY
          ========================= */}

          <Text style={styles.sectionTitle}>
            Compatibility
          </Text>

          <View style={styles.compatibilityCard}>

            <View style={styles.compatibilityHeader}>
              <Ionicons
                name="sparkles"
                size={18}
                color="#c8f34c"
              />

              <Text style={styles.compatibilityTitle}>
                Why you might get along
              </Text>
            </View>

            <CompatibilityItem
              text={`You both prefer ${profile.preferences.noise.toLowerCase()} environments.`}
            />

            <CompatibilityItem
              text={`Their cleanliness level is ${profile.preferences.cleanliness.toLowerCase()}.`}
            />

            <CompatibilityItem
              text={`Their preferred sleep schedule is ${profile.preferences.sleepSchedule}.`}
            />

          </View>

        </View>
      </ScrollView>

      {/* =========================
          BOTTOM ACTION
      ========================= */}

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: Math.max(
              insets.bottom,
              12
            ),
          },
        ]}
      >

        <Pressable
          style={styles.guildButton}
          onPress={() => {
            console.log(
              "Add to Guild:",
              profile.id
            );
          }}
        >
          <Ionicons
            name="people-outline"
            size={19}
            color="#10120d"
          />

          <Text style={styles.guildText}>
            Add to Guild
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}


/* =========================================================
   PREFERENCE
========================================================= */

function Preference({
  icon,
  text,
}: {
  icon: React.ComponentProps<
    typeof Ionicons
  >["name"];
  text: string;
}) {
  return (
    <View style={styles.preference}>

      <Ionicons
        name={icon}
        size={14}
        color="#9b8bff"
      />

      <Text style={styles.preferenceText}>
        {text}
      </Text>

    </View>
  );
}


/* =========================================================
   LIFESTYLE ROW
========================================================= */

function LifestyleRow({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<
    typeof Ionicons
  >["name"];
  label: string;
  value: string;
}) {
  return (
    <View style={styles.lifestyleRow}>

      <View style={styles.lifestyleIcon}>
        <Ionicons
          name={icon}
          size={17}
          color="#9b8bff"
        />
      </View>

      <View style={styles.lifestyleInfo}>

        <Text style={styles.lifestyleLabel}>
          {label}
        </Text>

        <Text style={styles.lifestyleValue}>
          {value}
        </Text>

      </View>

    </View>
  );
}


/* =========================================================
   COMPATIBILITY ITEM
========================================================= */

function CompatibilityItem({
  text,
}: {
  text: string;
}) {
  return (
    <View style={styles.compatibilityItem}>

      <View style={styles.check}>
        <Ionicons
          name="checkmark"
          size={13}
          color="#10120d"
        />
      </View>

      <Text style={styles.compatibilityText}>
        {text}
      </Text>

    </View>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0b0c16",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  errorTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
  },

  backButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#7f5af0",
  },

  backButtonText: {
    color: "white",
    fontWeight: "700",
  },

  /* HERO */

  hero: {
    height: 390,
    position: "relative",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.22)",
  },

  backCircle: {
    position: "absolute",
    top: 16,
    left: 18,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },

  verified: {
    position: "absolute",
    top: 16,
    right: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7b5cf3",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  verifiedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 5,
  },

  heroBottom: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  heroText: {
    flex: 1,
  },

  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  location: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    marginLeft: 4,
  },

  matchCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#c8f34c",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  matchNumber: {
    color: "#c8f34c",
    fontSize: 17,
    fontWeight: "800",
  },

  matchText: {
    color: "white",
    fontSize: 8,
    fontWeight: "700",
  },

  /* CONTENT */

  content: {
    paddingHorizontal: 20,
  },

  preferenceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },

  preference: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242544",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  preferenceText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 6,
  },

  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 10,
  },

  bio: {
    color: "#8e90b8",
    fontSize: 15,
    lineHeight: 23,
  },

  /* LIFESTYLE */

  card: {
    backgroundColor: "#18192d",
    borderRadius: 18,
    overflow: "hidden",
  },

  lifestyleRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#292a4a",
  },

  lifestyleIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#23243c",
    alignItems: "center",
    justifyContent: "center",
  },

  lifestyleInfo: {
    marginLeft: 12,
  },

  lifestyleLabel: {
    color: "#8e90b8",
    fontSize: 12,
  },

  lifestyleValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },

  /* TAGS */

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#23243c",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
  },

  tagText: {
    color: "#9b8bff",
    fontSize: 13,
    fontWeight: "700",
  },

  /* BUDGET */

  budgetCard: {
    backgroundColor: "#18192d",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  budgetIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#23243c",
    alignItems: "center",
    justifyContent: "center",
  },

  budgetLabel: {
    color: "#8e90b8",
    fontSize: 12,
    marginLeft: 12,
  },

  budgetValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 12,
    marginTop: 2,
  },

  /* COMPATIBILITY */

  compatibilityCard: {
    backgroundColor: "#242544",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },

  compatibilityHeader: {
    backgroundColor: "#211c40",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  compatibilityTitle: {
    color: "#c8f34c",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

  compatibilityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#343554",
  },

  check: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#c8f34c",
    alignItems: "center",
    justifyContent: "center",
  },

  compatibilityText: {
    flex: 1,
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 10,
  },

  /* BOTTOM */

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#0b0c16",
  },

  guildButton: {
    height: 48,
    borderRadius: 25,
    backgroundColor: "#c8f34c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  guildText: {
    color: "#10120d",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

});