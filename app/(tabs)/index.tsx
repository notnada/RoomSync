import "@/global.css";

import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { styled } from "nativewind";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  PanResponder,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  roommateProfiles,
  RoommateProfile,
} from "../../constants/data";

import SearchScreen from "../components/SearchScreen";

import theme from "../../constants/theme";

const SafeAreaView = styled(RNSafeAreaView);

const { colors, fonts, fontSize, fontWeight, spacing, radius } = theme;

/* =======================================================
   PILL
======================================================= */

function Pill({
  children,
  active,
  onPress,
}: {
  children: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: radius.full,
        paddingHorizontal: spacing[5],
        paddingVertical: spacing[3],
        backgroundColor: active
          ? colors.primary
          : colors.muted,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: fonts.bold,
          fontSize: fontSize.sm,
          fontWeight: fontWeight.bold,
          color: active
            ? colors.primaryForeground
            : colors.mutedForeground,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

/* =======================================================
   PROFILE TAG
======================================================= */

function Tag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        borderRadius: radius.full,
        backgroundColor: "rgba(255,255,255,0.18)",
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1.5],
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontFamily: fonts.bold,
          fontSize: fontSize.sm,
          fontWeight: fontWeight.bold,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

/* =======================================================
   ACTION BUTTON
======================================================= */

function ActionButton({
  icon,
  tone,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  tone: "reject" | "save" | "like";
  onPress: () => void;
}) {
  const styles = {
    reject: {
      borderWidth: 2,
      borderColor: "#a14667",
      backgroundColor: "#201726",
    },

    save: {
      borderWidth: 2,
      borderColor: "#4d427f",
      backgroundColor: "#201c34",
    },

    like: {
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
  } as const;

  const sizes = {
    reject: spacing[14],
    save: spacing[14],
    like: spacing[16],
  } as const;

  const iconSizes = {
    reject: 26,
    save: 26,
    like: 30,
  } as const;

  const iconColors = {
    reject: "#ff5b82",
    save: colors.violetSoft,
    like: colors.primaryForeground,
  } as const;

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          width: sizes[tone],
          height: sizes[tone],
          borderRadius: radius.full,
          alignItems: "center",
          justifyContent: "center",
        },
        styles[tone],
      ]}
    >
      <Ionicons
        name={icon}
        size={iconSizes[tone]}
        color={iconColors[tone]}
      />
    </Pressable>
  );
}

/* =======================================================
   DISCOVER
======================================================= */

export default function App() {
  const insets = useSafeAreaInsets();

  /*
   * This matches the calculation in _layout.tsx.
   *
   * 40 + 12 + (9 * 2) = 70
   */
  const tabBarHeight = 70 + insets.bottom;

  const [mode, setMode] = React.useState<
    "swipe" | "search"
  >("swipe");

  const [profiles] = React.useState<RoommateProfile[]>(
    roommateProfiles
  );

  const [currentIndex, setCurrentIndex] =
    React.useState(0);

  const [savedProfiles, setSavedProfiles] =
    React.useState<string[]>([]);

  const position = React.useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const currentProfile = profiles[currentIndex];

  /* =====================================================
     ACTION
  ===================================================== */

  const handleAction = (
    action: "like" | "dislike" | "save",
    profile: RoommateProfile
  ) => {
    console.log(`${action}:`, profile.name);

    /*
     * SAVE
     *
     * Saving does NOT move to the next profile.
     */

    if (action === "save") {
      setSavedProfiles((previous) => {
        if (previous.includes(profile.id)) {
          return previous.filter(
            (id) => id !== profile.id
          );
        }

        return [...previous, profile.id];
      });

      return;
    }

    /*
     * LIKE / DISLIKE
     */

    setCurrentIndex(
      (previous) => previous + 1
    );

    position.setValue({
      x: 0,
      y: 0,
    });
  };

  /* =====================================================
     SWIPE
  ===================================================== */

  const swipe = (
    direction: "left" | "right"
  ) => {
    if (!currentProfile) return;

    const action =
      direction === "right"
        ? "like"
        : "dislike";

    const destinationX =
      direction === "right"
        ? 500
        : -500;

    Animated.timing(position, {
      toValue: {
        x: destinationX,
        y: 0,
      },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      handleAction(
        action,
        currentProfile
      );
    });
  };

  /* =====================================================
     PAN RESPONDER
  ===================================================== */

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _,
        gesture
      ) => {
        return Math.abs(gesture.dx) > 10;
      },

      onPanResponderMove: (
        _,
        gesture
      ) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy * 0.15,
        });
      },

      onPanResponderRelease: (
        _,
        gesture
      ) => {
        if (gesture.dx > 120) {
          swipe("right");
          return;
        }

        if (gesture.dx < -120) {
          swipe("left");
          return;
        }

        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  /* =====================================================
     CARD ROTATION
  ===================================================== */

  const rotate = position.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [
      "-12deg",
      "0deg",
      "12deg",
    ],
    extrapolate: "clamp",
  });

  /* =====================================================
     HEADER
  ===================================================== */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing[5],
          paddingBottom: tabBarHeight,
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={{
            marginBottom: spacing[3],
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: colors.foreground,
                fontFamily: fonts.black,
                fontSize: fontSize["3xl"],
                fontWeight: fontWeight.black,
                lineHeight:
                  fontSize["3xl"] * 1.2,
              }}
            >
              Discover
            </Text>

            <Text
              style={{
                marginTop: spacing[1],
                color: colors.mutedForeground,
                fontFamily: fonts.sans,
                fontSize: fontSize.base,
                fontWeight: fontWeight.normal,
              }}
            >
              Find your people
            </Text>
          </View>

          {/* NOTIFICATION */}

          <Pressable
            style={{
              position: "relative",
              width: spacing[10],
              height: spacing[10],
              alignItems: "center",
              justifyContent: "center",
              borderRadius: radius.full,
              backgroundColor: colors.muted,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.foreground}
            />

            <View
              style={{
                position: "absolute",
                right: spacing[2],
                top: spacing[2],
                width: spacing[2.5],
                height: spacing[2.5],
                borderRadius: radius.full,
                backgroundColor: colors.accent,
              }}
            />
          </Pressable>
        </View>

        {/* =================================================
            SWIPE / SEARCH SWITCH
        ================================================= */}

        <View
          style={{
            marginBottom: spacing[3],
            flexDirection: "row",
            borderRadius: radius.full,
            backgroundColor: colors.muted,
            padding: spacing[1.5],
          }}
        >
          <View style={{ flex: 1 }}>
            <Pill
              active={mode === "swipe"}
              onPress={() =>
                setMode("swipe")
              }
            >
              ✦ Swipe
            </Pill>
          </View>

          <View style={{ flex: 1 }}>
            <Pill
              active={mode === "search"}
              onPress={() =>
                setMode("search")
              }
            >
              ⋯ Search
            </Pill>
          </View>
        </View>

        {/* =================================================
            SEARCH MODE
        ================================================= */}

        {mode === "search" && (
          <SearchScreen />
        )}

        {/* =================================================
            SWIPE MODE
        ================================================= */}

        {mode === "swipe" && (
          <>
            {currentProfile ? (
              <>
                {/* -----------------------------------------
                    CARD
                ----------------------------------------- */}

                <Animated.View
                  {...panResponder.panHandlers}
                  style={{
                    flex: 1,

                    transform: [
                      {
                        translateX:
                          position.x,
                      },
                      {
                        translateY:
                          position.y,
                      },
                      {
                        rotate,
                      },
                    ],
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      borderRadius: radius.xl,
                      backgroundColor: colors.card,
                    }}
                  >
                    {/* IMAGE */}

                    <View
                      style={{
                        position: "relative",
                        flex: 1,
                      }}
                    >
                      <Image
                        source={{
                          uri: currentProfile.image,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        contentFit="cover"
                      />

                      {/* DARK OVERLAY */}

                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          backgroundColor:
                            "rgba(0,0,0,0.20)",
                        }}
                      />

                      {/* GRADIENT */}

                      <LinearGradient
                        colors={[
                          "transparent",
                          "rgba(0,0,0,0.50)",
                          "rgba(0,0,0,0.90)",
                        ]}
                        locations={[
                          0,
                          0.55,
                          1,
                        ]}
                        start={{
                          x: 0,
                          y: 0,
                        }}
                        end={{
                          x: 0,
                          y: 1,
                        }}
                        style={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          left: 0,
                          height: 208,
                        }}
                      />

                      {/* VERIFIED */}

                      {currentProfile.verified && (
                        <View
                          style={{
                            position: "absolute",
                            right: spacing[3],
                            top: spacing[3],
                            flexDirection: "row",
                            alignItems: "center",
                            gap: spacing[1.5],
                            borderRadius: radius.full,
                            backgroundColor:
                              colors.primary,
                            paddingHorizontal:
                              spacing[3],
                            paddingVertical:
                              spacing[1.5],
                          }}
                        >
                          <Feather
                            name="shield"
                            size={13}
                            color={
                              colors.primaryForeground
                            }
                          />

                          <Text
                            style={{
                              color:
                                colors.primaryForeground,
                              fontFamily:
                                fonts.bold,
                              fontSize:
                                fontSize.sm,
                              fontWeight:
                                fontWeight.bold,
                            }}
                          >
                            Verified
                          </Text>
                        </View>
                      )}

                      {/* PROFILE INFO */}

                      <View
                        style={{
                          position: "absolute",
                          right: spacing[4],
                          bottom: spacing[4],
                          left: spacing[4],
                        }}
                      >
                        <View
                          style={{
                            flexDirection:
                              "row",
                            alignItems:
                              "flex-end",
                            justifyContent:
                              "space-between",
                            gap: spacing[3],
                          }}
                        >
                          {/* NAME */}

                          <View
                            style={{
                              flex: 1,
                            }}
                          >
                            <View
                              style={{
                                flexDirection:
                                  "row",
                                alignItems:
                                  "flex-end",
                                gap: spacing[1],
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={{
                                  color: "#ffffff",
                                  fontFamily:
                                    fonts.black,
                                  fontSize:
                                    fontSize["3xl"],
                                  fontWeight:
                                    fontWeight.black,
                                  flexShrink: 1,
                                }}
                              >
                                {
                                  currentProfile.name
                                }
                              </Text>

                              <Text
                                style={{
                                  paddingBottom:
                                    spacing[1],
                                  color:
                                    "rgba(255,255,255,0.85)",
                                  fontFamily:
                                    fonts.medium,
                                  fontSize:
                                    fontSize.xl,
                                  fontWeight:
                                    fontWeight.medium,
                                }}
                              >
                                {
                                  currentProfile.age
                                }
                              </Text>
                            </View>

                            <Text
                              style={{
                                marginTop:
                                  spacing[1],
                                color:
                                  "rgba(255,255,255,0.80)",
                                fontFamily:
                                  fonts.sans,
                                fontSize:
                                  fontSize.base,
                              }}
                            >
                              {
                                currentProfile.location
                              }{" "}
                              ·{" "}
                              {
                                currentProfile.price
                              }
                            </Text>
                          </View>

                          {/* MATCH */}

                          <View
                            style={{
                              alignItems:
                                "flex-end",
                            }}
                          >
                            <Text
                              style={{
                                color:
                                  colors.accent,
                                fontFamily:
                                  fonts.black,
                                fontSize:
                                  fontSize["4xl"],
                                fontWeight:
                                  fontWeight.black,
                                lineHeight:
                                  fontSize[
                                    "4xl"
                                  ],
                              }}
                            >
                              {
                                currentProfile.match
                              }
                              %
                            </Text>

                            <Text
                              style={{
                                marginTop:
                                  -spacing[1],
                                color:
                                  "rgba(255,255,255,0.75)",
                                fontFamily:
                                  fonts.sans,
                                fontSize:
                                  fontSize.sm,
                              }}
                            >
                              match
                            </Text>
                          </View>
                        </View>

                        {/* TAGS */}

                        <View
                          style={{
                            marginTop:
                              spacing[3],
                            flexDirection:
                              "row",
                            flexWrap:
                              "wrap",
                            gap: spacing[2],
                          }}
                        >
                          {currentProfile.tags.map(
                            (tag) => (
                              <Tag key={tag}>
                                {tag}
                              </Tag>
                            )
                          )}
                        </View>
                      </View>
                    </View>

                    {/* =================================================
                        PREFERENCES
                    ================================================= */}

                    <View
                      style={{
                        paddingHorizontal:
                          spacing[4],
                        paddingVertical:
                          spacing[3],
                      }}
                    >
                      <View
                        style={{
                          flexDirection:
                            "row",
                          flexWrap:
                            "wrap",
                          gap: spacing[2],
                        }}
                      >
                        {/* SLEEP */}

                        <View
                          style={{
                            flexDirection:
                              "row",
                            alignItems:
                              "center",
                            gap: spacing[1.5],
                            borderRadius:
                              radius.full,
                            backgroundColor:
                              colors.muted,
                            paddingHorizontal:
                              spacing[3],
                            paddingVertical:
                              spacing[2],
                          }}
                        >
                          <Ionicons
                            name="time-outline"
                            size={14}
                            color={
                              colors.primary
                            }
                          />

                          <Text
                            style={{
                              color:
                                colors.foreground,
                              fontFamily:
                                fonts.bold,
                              fontSize:
                                fontSize.sm,
                              fontWeight:
                                fontWeight.bold,
                            }}
                          >
                            {
                              currentProfile
                                .preferences
                                .sleepSchedule
                            }
                          </Text>
                        </View>

                        {/* NOISE */}

                        <View
                          style={{
                            flexDirection:
                              "row",
                            alignItems:
                              "center",
                            gap: spacing[1.5],
                            borderRadius:
                              radius.full,
                            backgroundColor:
                              colors.muted,
                            paddingHorizontal:
                              spacing[3],
                            paddingVertical:
                              spacing[2],
                          }}
                        >
                          <Ionicons
                            name="volume-mute-outline"
                            size={14}
                            color={
                              colors.primary
                            }
                          />

                          <Text
                            style={{
                              color:
                                colors.foreground,
                              fontFamily:
                                fonts.bold,
                              fontSize:
                                fontSize.sm,
                              fontWeight:
                                fontWeight.bold,
                            }}
                          >
                            {
                              currentProfile
                                .preferences
                                .noise
                            }
                          </Text>
                        </View>

                        {/* SMOKING */}

                        <View
                          style={{
                            flexDirection:
                              "row",
                            alignItems:
                              "center",
                            gap: spacing[1.5],
                            borderRadius:
                              radius.full,
                            backgroundColor:
                              colors.muted,
                            paddingHorizontal:
                              spacing[3],
                            paddingVertical:
                              spacing[2],
                          }}
                        >
                          <Ionicons
                            name="close-outline"
                            size={14}
                            color={
                              colors.primary
                            }
                          />

                          <Text
                            style={{
                              color:
                                colors.foreground,
                              fontFamily:
                                fonts.bold,
                              fontSize:
                                fontSize.sm,
                              fontWeight:
                                fontWeight.bold,
                            }}
                          >
                            {
                              currentProfile
                                .preferences
                                .smoking
                            }
                          </Text>
                        </View>

                        {/* PETS */}

                        <View
                          style={{
                            flexDirection:
                              "row",
                            alignItems:
                              "center",
                            gap: spacing[1.5],
                            borderRadius:
                              radius.full,
                            backgroundColor:
                              colors.muted,
                            paddingHorizontal:
                              spacing[3],
                            paddingVertical:
                              spacing[2],
                          }}
                        >
                          <Ionicons
                            name="paw-outline"
                            size={14}
                            color={
                              colors.primary
                            }
                          />

                          <Text
                            style={{
                              color:
                                colors.foreground,
                              fontFamily:
                                fonts.bold,
                              fontSize:
                                fontSize.sm,
                              fontWeight:
                                fontWeight.bold,
                            }}
                          >
                            {
                              currentProfile
                                .preferences
                                .pets
                            }
                          </Text>
                        </View>

                        {/* CLEANLINESS */}

                        <View
                          style={{
                            flexDirection:
                              "row",
                            alignItems:
                              "center",
                            gap: spacing[1.5],
                            borderRadius:
                              radius.full,
                            backgroundColor:
                              colors.muted,
                            paddingHorizontal:
                              spacing[3],
                            paddingVertical:
                              spacing[2],
                          }}
                        >
                          <Ionicons
                            name="sparkles-outline"
                            size={14}
                            color={
                              colors.primary
                            }
                          />

                          <Text
                            style={{
                              color:
                                colors.foreground,
                              fontFamily:
                                fonts.bold,
                              fontSize:
                                fontSize.sm,
                              fontWeight:
                                fontWeight.bold,
                            }}
                          >
                            {
                              currentProfile
                                .preferences
                                .cleanliness
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <View
                  style={{
                    height: spacing[16],
                    flexDirection:
                      "row",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    gap: spacing[5],
                  }}
                >
                  <ActionButton
                    tone="reject"
                    icon="close"
                    onPress={() =>
                      swipe("left")
                    }
                  />

                  <ActionButton
                    tone="save"
                    icon="star"
                    onPress={() =>
                      handleAction(
                        "save",
                        currentProfile
                      )
                    }
                  />

                  <ActionButton
                    tone="like"
                    icon="heart"
                    onPress={() =>
                      swipe("right")
                    }
                  />
                </View>
              </>
            ) : (
              /* =================================================
                 NO MORE PROFILES
              ================================================= */

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent:
                    "center",
                }}
              >
                <Text
                  style={{
                    color:
                      colors.foreground,
                    fontFamily:
                      fonts.black,
                    fontSize:
                      fontSize["2xl"],
                    fontWeight:
                      fontWeight.black,
                  }}
                >
                  No more profiles
                </Text>

                <Text
                  style={{
                    marginTop:
                      spacing[2],
                    textAlign: "center",
                    color:
                      colors.mutedForeground,
                    fontFamily:
                      fonts.sans,
                    fontSize:
                      fontSize.sm,
                  }}
                >
                  You've gone through
                  everyone for now.
                </Text>

                <Pressable
                  onPress={() => {
                    setCurrentIndex(0);

                    position.setValue({
                      x: 0,
                      y: 0,
                    });
                  }}
                  style={{
                    marginTop:
                      spacing[5],
                    borderRadius:
                      radius.full,
                    backgroundColor:
                      colors.primary,
                    paddingHorizontal:
                      spacing[6],
                    paddingVertical:
                      spacing[3],
                  }}
                >
                  <Text
                    style={{
                      color:
                        colors.primaryForeground,
                      fontFamily:
                        fonts.bold,
                      fontSize:
                        fontSize.sm,
                      fontWeight:
                        fontWeight.bold,
                    }}
                  >
                    Start again
                  </Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}