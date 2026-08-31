import { Image } from "expo-image";
import { styled } from "nativewind";
import * as React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import {
  colors,
  components,
  fontSize,
  fonts,
  fontWeight,
  radius,
  spacing,
} from "@/constants/theme";

import {
  Card,
  CardContent,
} from "../components/card";

const SafeAreaView = styled(RNSafeAreaView);

const listingCard = components.listingCard;

const listings = [
  {
    id: "sunny-2br-mission",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&auto=format",
    verified: true,
    guildOk: false,
    title: "Sunny 2BR Mission",
    location: "18th & Valencia, SF",
    price: "$1,450",
    subprice: "/mo per room",
    details: "2 bed · 1 bath",
    availability: "Available Aug 1",
    tags: ["Laundry", "Parking", "Pet ok"],
  },
  {
    id: "modern-soma-loft",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&auto=format",
    verified: true,
    guildOk: false,
    title: "Modern SOMA Loft",
    location: "Brannan St, SOMA, SF",
    price: "$1,800",
    subprice: "/mo per room",
    details: "2 bed · 2 bath",
    availability: "Available Jul 15",
    tags: ["Gym", "Rooftop", "Bike store"],
  },
  {
    id: "victorian-3br-flat",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&auto=format",
    verified: true,
    guildOk: true,
    title: "Victorian 3BR Flat",
    location: "Haight St, SF",
    price: "$1,100",
    subprice: "/mo per room",
    details: "3 bed · 1 bath",
    availability: "Available Aug 15",
    tags: ["Backyard", "High ceilings", "3 rooms"],
  },
  {
    id: "spacious-4br-sunset",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop&auto=format",
    verified: true,
    guildOk: true,
    title: "Spacious 4BR Sunset",
    location: "Irving St, Sunset, SF",
    price: "$950",
    subprice: "/mo per room",
    details: "4 bed · 2 bath",
    availability: "Available Sep 1",
    tags: ["Garden", "Garage", "Quiet street", "4 rooms"],
  },
];

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <View
      style={{
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        borderRadius: radius.full,
        backgroundColor:
          tone === "accent"
            ? colors.primary
            : colors.accent,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.bold,
          fontSize: fontSize.xs,
          fontWeight: fontWeight.bold,
          color:
            tone === "accent"
              ? colors.primaryForeground
              : colors.accentForeground,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

type ListingFilter = "all" | "guild-ready";

const Listings = () => {
  const [activeFilter, setActiveFilter] =
    React.useState<ListingFilter>("all");

  const visibleListings = React.useMemo(
    () =>
      activeFilter === "guild-ready"
        ? listings.filter((listing) => listing.guildOk)
        : listings,
    [activeFilter]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: spacing[3],
          paddingTop: spacing[3],
          paddingBottom: spacing[24],
          gap: spacing[4],
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View
          style={{
            paddingHorizontal: spacing[2],
            paddingTop: spacing[1],
            paddingBottom: spacing[2],
          }}
        >
          <Text
            style={{
              fontFamily: fonts.black,
              fontSize: fontSize["4xl"],
              fontWeight: fontWeight.black,
              lineHeight:
                fontSize["4xl"] *
                1.25,
              color: colors.foreground,
            }}
          >
            Listings
          </Text>

          <Text
            style={{
              marginTop: spacing[1],
              fontFamily: fonts.sans,
              fontSize: fontSize.base,
              color: colors.mutedForeground,
            }}
          >
            Verified properties only
          </Text>
        </View>

        {/* FILTERS */}

        <View
          style={{
            flexDirection: "row",
            gap: spacing[2],
            paddingHorizontal: spacing[1],
          }}
        >
          <Pressable
            onPress={() =>
              setActiveFilter("all")
            }
            style={{
              paddingHorizontal: spacing[4],
              paddingVertical: spacing[2],
              borderRadius: radius.full,
              backgroundColor:
                activeFilter === "all"
                  ? colors.primary
                  : colors.muted,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.bold,
                color:
                  activeFilter === "all"
                    ? colors.primaryForeground
                    : colors.mutedForeground,
              }}
            >
              All
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setActiveFilter("guild-ready")
            }
            style={{
              paddingHorizontal: spacing[4],
              paddingVertical: spacing[2],
              borderRadius: radius.full,
              backgroundColor:
                activeFilter === "guild-ready"
                  ? colors.primary
                  : colors.muted,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.bold,
                color:
                  activeFilter ===
                  "guild-ready"
                    ? colors.primaryForeground
                    : colors.mutedForeground,
              }}
            >
              Guild-Ready
            </Text>
          </Pressable>
        </View>

        {/* LISTINGS */}

        {visibleListings.map((listing) => (
          <Card
            key={listing.id}
            style={{
              ...listingCard.card,
            }}
          >
            {/* IMAGE */}

            <View
              style={{
                position: "relative",
                height: 224,
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri: listing.image,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    colors.muted,
                }}
                contentFit="cover"
              />

              {/* IMAGE OVERLAY */}

              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundColor:
                    "rgba(0,0,0,0.35)",
                }}
              />

              {/* BADGES */}

              <View
                style={{
                  position: "absolute",
                  left: spacing[3],
                  top: spacing[3],
                  flexDirection: "row",
                  gap: spacing[2],
                }}
              >
                <Badge>
                  {listing.verified
                    ? "Verified"
                    : "Unverified"}
                </Badge>

                {listing.guildOk ? (
                  <Badge tone="accent">
                    Guild OK
                  </Badge>
                ) : null}
              </View>

              {/* IMAGE INFO */}

              <View
                style={{
                  position: "absolute",
                  left: spacing[4],
                  right: spacing[4],
                  bottom: spacing[4],
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: spacing[4],
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: fonts.black,
                      fontSize: fontSize["2xl"],
                      fontWeight: fontWeight.black,
                      color: "#ffffff",
                    }}
                  >
                    {listing.title}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      marginTop: spacing[1],
                      fontFamily: fonts.sans,
                      fontSize: fontSize.sm,
                      color:
                        "rgba(255,255,255,0.85)",
                    }}
                  >
                    {listing.location}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.black,
                      fontSize: fontSize["2xl"],
                      fontWeight: fontWeight.black,
                      color: "#ffffff",
                    }}
                  >
                    {listing.price}
                  </Text>

                  <Text
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: fontSize.sm,
                      color:
                        "rgba(255,255,255,0.75)",
                    }}
                  >
                    {listing.subprice}
                  </Text>
                </View>
              </View>
            </View>

            {/* CARD CONTENT */}

            <CardContent
              style={{
                paddingHorizontal: spacing[4],
                paddingTop: spacing[4],
                paddingBottom: spacing[4],
                gap: spacing[4],
              }}
            >
              {/* DETAILS */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing[3],
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: fontSize.sm,
                    color: colors.mutedForeground,
                  }}
                >
                  {listing.details}
                </Text>

                <Text
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: fontSize.sm,
                    color: colors.mutedForeground,
                  }}
                >
                  ·
                </Text>

                <Text
                  style={{
                    fontFamily: fonts.bold,
                    fontSize: fontSize.sm,
                    fontWeight: fontWeight.bold,
                    color: colors.accent,
                  }}
                >
                  {listing.availability}
                </Text>
              </View>

              {/* TAGS */}

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: spacing[2],
                }}
              >
                {listing.tags.map((tag) => (
                  <View
                    key={tag}
                    style={{
                      paddingHorizontal:
                        spacing[3],
                      paddingVertical:
                        spacing[1],
                      borderRadius:
                        radius.full,
                      backgroundColor:
                        colors.muted,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily:
                          fonts.medium,
                        fontSize:
                          fontSize.sm,
                        fontWeight:
                          fontWeight.medium,
                        color:
                          colors.secondaryForeground,
                      }}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              {/* CTA */}

              <View
                style={{
                  paddingTop: spacing[1],
                }}
              >
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => [
                    {
                      minHeight: 52,
                      borderRadius:
                        radius.lg,
                      backgroundColor:
                        colors.primary,
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                    },
                    pressed && {
                      opacity: 0.8,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: fonts.black,
                      fontSize: fontSize.base,
                      fontWeight:
                        fontWeight.black,
                      color:
                        colors.primaryForeground,
                    }}
                  >
                    View Details
                  </Text>
                </Pressable>
              </View>
            </CardContent>
          </Card>
        ))}

        {/* EMPTY STATE */}

        {visibleListings.length === 0 ? (
          <View
            style={{
              borderRadius: radius["3xl"],
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              paddingHorizontal: spacing[5],
              paddingVertical: spacing[8],
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: fonts.bold,
                fontSize: fontSize.lg,
                fontWeight: fontWeight.bold,
                color: colors.foreground,
              }}
            >
              No guild-ready listings
              right now.
            </Text>

            <Text
              style={{
                marginTop: spacing[2],
                textAlign: "center",
                fontFamily: fonts.sans,
                fontSize: fontSize.sm,
                color: colors.mutedForeground,
              }}
            >
              Try switching back to All
              to see the full feed.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Listings;