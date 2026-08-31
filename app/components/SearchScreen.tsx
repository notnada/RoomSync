
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  roommateProfiles,
  RoommateProfile,
} from "@/constants/data";

import {
  colors,
  fonts,
  fontSize,
  fontWeight,
  spacing,
  radius,
} from "@/constants/theme";

/* =======================================================
   FILTER BUTTON
======================================================= */

function FilterButton({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: radius.full,
        backgroundColor: colors.muted,
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
      }}
    >
      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: fontSize.sm,
          fontWeight: fontWeight.bold,
          color: colors.secondaryForeground,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

/* =======================================================
   MATCH CIRCLE
======================================================= */

function MatchCircle({
  match,
}: {
  match: number;
}) {
  return (
    <View
      style={{
        width: spacing[12],
        height: spacing[12],
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        borderWidth: 4,
        borderColor: colors.primary,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.black,
          fontSize: fontSize.xs,
          fontWeight: fontWeight.black,
          color: colors.accent,
        }}
      >
        {match}
      </Text>
    </View>
  );
}

/* =======================================================
   USER RESULT CARD
======================================================= */

function UserResultCard({
  profile,
}: {
  profile: RoommateProfile;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push(`/profile/${profile.id}`);
      }}
      style={{
        marginBottom: spacing[3],
        padding: spacing[3],
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* =================================================
            AVATAR
        ================================================= */}

        <View
          style={{
            width: spacing[14],
            height: spacing[14],
            overflow: "hidden",
            borderRadius: radius.full,
            backgroundColor: colors.primary,
          }}
        >
          <Image
            source={{ uri: profile.image }}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
          />
        </View>

        {/* =================================================
            USER INFORMATION
        ================================================= */}

        <View
          style={{
            marginLeft: spacing[3],
            flex: 1,
          }}
        >
          {/* NAME */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flexShrink: 1,
                fontFamily: fonts.black,
                fontSize: fontSize.base,
                fontWeight: fontWeight.black,
                color: colors.foreground,
              }}
            >
              {profile.name}, {profile.age}
            </Text>

            {profile.verified && (
              <Ionicons
                name="shield-checkmark"
                size={13}
                color={colors.primary}
                style={{
                  marginLeft: spacing[1],
                }}
              />
            )}
          </View>

          {/* LOCATION */}

          <View
            style={{
              marginTop: spacing[0.5],
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="location-outline"
              size={12}
              color={colors.mutedForeground}
            />

            <Text
              numberOfLines={1}
              style={{
                marginLeft: spacing[1],
                flex: 1,
                fontFamily: fonts.sans,
                fontSize: fontSize.xs,
                fontWeight: fontWeight.normal,
                color: colors.mutedForeground,
              }}
            >
              {profile.location} · {profile.price}
            </Text>
          </View>

          {/* TAGS */}

          <View
            style={{
              marginTop: spacing[2],
              flexDirection: "row",
              flexWrap: "wrap",
              gap: spacing[1.5],
            }}
          >
            {profile.tags.map((tag) => (
              <View
                key={tag}
                style={{
                  borderRadius: radius.full,
                  backgroundColor: colors.muted,
                  paddingHorizontal: spacing[2],
                  paddingVertical: spacing[1],
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: fontSize.xs,
                    fontWeight: fontWeight.normal,
                    color: colors.mutedForeground,
                  }}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* =================================================
            MATCH + ADD
        ================================================= */}

        <View
          style={{
            marginLeft: spacing[2],
            alignItems: "center",
          }}
        >
          <MatchCircle match={profile.match} />

          <Pressable
            onPress={(event) => {
              event.stopPropagation();

              console.log(
                "Add to Guild:",
                profile.name
              );
            }}
            style={{
              marginTop: spacing[1],
              width: spacing[8],
              height: spacing[8],
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.full,
              backgroundColor: colors.muted,
            }}
          >
            <Ionicons
              name="person-add-outline"
              size={15}
              color={colors.mutedForeground}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

/* =======================================================
   SEARCH SCREEN
======================================================= */

export default function SearchScreen() {
  const [search, setSearch] = React.useState("");

  /* =====================================================
     FILTER RESULTS
  ===================================================== */

  const filteredProfiles = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    /*
     * If there is no search query,
     * show everyone.
     */

    if (!query) {
      return roommateProfiles;
    }

    /*
     * Search through:
     *
     * - name
     * - location
     * - tags
     * - bio
     */

    return roommateProfiles.filter((profile) => {
      const matchesName = profile.name
        .toLowerCase()
        .includes(query);

      const matchesLocation = profile.location
        .toLowerCase()
        .includes(query);

      const matchesTag = profile.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      const matchesBio = profile.bio
        .toLowerCase()
        .includes(query);

      return (
        matchesName ||
        matchesLocation ||
        matchesTag ||
        matchesBio
      );
    });
  }, [search]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* =================================================
          SEARCH BAR
      ================================================= */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[2],
        }}
      >
        <View
          style={{
            height: spacing[10],
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: radius.full,
            backgroundColor: colors.inputBackground,
            paddingHorizontal: spacing[4],
          }}
        >
          <Ionicons
            name="search-outline"
            size={18}
            color={colors.mutedForeground}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search name or location..."
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              marginLeft: spacing[2],
              flex: 1,
              paddingVertical: 0,
              fontFamily: fonts.sans,
              fontSize: fontSize.sm,
              fontWeight: fontWeight.normal,
              color: colors.foreground,
            }}
          />

          {/* CLEAR SEARCH */}

          {search.length > 0 && (
            <Pressable
              onPress={() => {
                setSearch("");
              }}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.mutedForeground}
              />
            </Pressable>
          )}
        </View>

        {/* =================================================
            FILTER ICON
        ================================================= */}

        <Pressable
          style={{
            width: spacing[10],
            height: spacing[10],
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius.full,
            backgroundColor: colors.inputBackground,
          }}
          onPress={() => {
            console.log("Open filters");
          }}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={colors.foreground}
          />
        </Pressable>
      </View>

      {/* =================================================
          FILTERS
      ================================================= */}

      <View
        style={{
          marginTop: spacing[4],
        }}
      >
        <Text
          style={{
            marginBottom: spacing[2],
            fontFamily: fonts.bold,
            fontSize: fontSize.base,
            fontWeight: fontWeight.bold,
            color: colors.foreground,
          }}
        >
          Filters
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing[2],
          }}
        >
          <FilterButton
            title="Budget"
            onPress={() =>
              console.log("Budget filter")
            }
          />

          <FilterButton
            title="Location"
            onPress={() =>
              console.log("Location filter")
            }
          />

          <FilterButton
            title="Pets"
            onPress={() =>
              console.log("Pets filter")
            }
          />

          <FilterButton
            title="Smoking"
            onPress={() =>
              console.log("Smoking filter")
            }
          />

          <FilterButton
            title="Lifestyle"
            onPress={() =>
              console.log("Lifestyle filter")
            }
          />
        </View>
      </View>

      {/* =================================================
          RESULTS HEADER
      ================================================= */}

      <View
        style={{
          marginTop: spacing[4],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: fonts.sans,
            fontSize: fontSize.sm,
            fontWeight: fontWeight.normal,
            color: colors.mutedForeground,
          }}
        >
          {filteredProfiles.length}{" "}
          {filteredProfiles.length === 1
            ? "roommate"
            : "roommates"}{" "}
          found
        </Text>

        {search.length > 0 && (
          <Text
            numberOfLines={1}
            style={{
              marginLeft: spacing[3],
              flex: 1,
              textAlign: "right",
              fontFamily: fonts.sans,
              fontSize: fontSize.sm,
              fontWeight: fontWeight.normal,
              color: colors.secondaryForeground,
            }}
          >
            "{search}"
          </Text>
        )}
      </View>

      {/* =================================================
          RESULTS
      ================================================= */}

      <FlatList
        data={filteredProfiles}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: spacing[3],
          paddingBottom: spacing[5],
        }}
        renderItem={({ item }) => (
          <UserResultCard profile={item} />
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: spacing[6],
              paddingTop: spacing[12],
            }}
          >
            <View
              style={{
                width: spacing[16],
                height: spacing[16],
                alignItems: "center",
                justifyContent: "center",
                borderRadius: radius.full,
                backgroundColor: colors.muted,
              }}
            >
              <Ionicons
                name="search-outline"
                size={28}
                color={colors.mutedForeground}
              />
            </View>

            <Text
              style={{
                marginTop: spacing[4],
                fontFamily: fonts.bold,
                fontSize: fontSize.xl,
                fontWeight: fontWeight.bold,
                color: colors.foreground,
              }}
            >
              No roommates found
            </Text>

            <Text
              style={{
                marginTop: spacing[2],
                textAlign: "center",
                fontFamily: fonts.sans,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.normal,
                lineHeight:
                  fontSize.sm * 1.5,
                color: colors.mutedForeground,
              }}
            >
              Try searching for another name,
              location or lifestyle.
            </Text>
          </View>
        }
      />
    </View>
  );
}

