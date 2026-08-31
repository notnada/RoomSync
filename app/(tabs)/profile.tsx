import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import {
    PROFILE_USER,
    PROFILE_STATS,
    LIFESTYLE_ITEMS,
    LIKED_ROOMMATES,
    SAVED_LISTINGS,
    SETTINGS_ACCOUNT,
    SETTINGS_VERIFICATION,
    SETTINGS_PREFERENCES,
    type ProfileTab,
    type LikedRoommate,
    type SavedListing,
} from "../../constants/data";

import { icons } from "../../constants/icons";
import { colors, fonts, spacing, radius } from "../../constants/theme";

export default function ProfileScreen() {
    const [activeTab, setActiveTab] =
        useState<ProfileTab>("profile");

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.background}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {/* ═══════════════════════════════════════
                    PROFILE HEADER
                ═══════════════════════════════════════ */}

                <LinearGradient
                    colors={["#7854F6", "#9A6BFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.profileCard}
                >
                    <View style={styles.userRow}>
                        {/* Avatar */}

                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {PROFILE_USER.initials}
                            </Text>
                        </View>

                        {/* User information */}

                        <View style={styles.userInfo}>
                            <Text style={styles.name}>
                                {PROFILE_USER.name}
                            </Text>

                            <Text style={styles.location}>
                                {PROFILE_USER.role} ·{" "}
                                {PROFILE_USER.location}
                            </Text>

                            <View style={styles.badgesRow}>
                                {!PROFILE_USER.verified && (
                                    <View
                                        style={
                                            styles.unverifiedBadge
                                        }
                                    >
                                        <View
                                            style={
                                                styles.unverifiedDot
                                            }
                                        />

                                        <Text
                                            style={
                                                styles.unverifiedText
                                            }
                                        >
                                            Not verified
                                        </Text>
                                    </View>
                                )}

                                <View
                                    style={
                                        styles.profileBadge
                                    }
                                >
                                    <Text
                                        style={
                                            styles.profileBadgeText
                                        }
                                    >
                                        {
                                            PROFILE_USER.profileCompletion
                                        }
                                        % profile
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Stats */}

                    <View style={styles.statsRow}>
                        <Stat
                            value={String(
                                PROFILE_STATS.matches
                            )}
                            label="Matches"
                        />

                        <Stat
                            value={String(
                                PROFILE_STATS.saved
                            )}
                            label="Saved"
                        />

                        <Stat
                            value={`${PROFILE_STATS.topScore}%`}
                            label="Top score"
                        />
                    </View>
                </LinearGradient>

                {/* ═══════════════════════════════════════
                    PROFILE / SAVED / SETTINGS TABS
                ═══════════════════════════════════════ */}

                <View style={styles.segmentedControl}>
                    <TabButton
                        label="Profile"
                        active={
                            activeTab === "profile"
                        }
                        onPress={() =>
                            setActiveTab("profile")
                        }
                    />

                    <TabButton
                        label="Saved"
                        heart
                        active={
                            activeTab === "saved"
                        }
                        onPress={() =>
                            setActiveTab("saved")
                        }
                    />

                    <TabButton
                        label="Settings"
                        settings
                        active={
                            activeTab === "settings"
                        }
                        onPress={() =>
                            setActiveTab("settings")
                        }
                    />
                </View>

                {/* ═══════════════════════════════════════
                    CONTENT
                ═══════════════════════════════════════ */}

                {activeTab === "profile" && (
                    <ProfileContent />
                )}

                {activeTab === "saved" && (
                    <SavedContent />
                )}

                {activeTab === "settings" && (
                    <SettingsContent />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

/* ═══════════════════════════════════════════════
   TAB BUTTON
═══════════════════════════════════════════════ */

function TabButton({
    label,
    heart,
    settings,
    active,
    onPress,
}: {
    label: string;
    heart?: boolean;
    settings?: boolean;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.segment,
                active && styles.segmentActive,
            ]}
        >
            {heart && (
                <Text
                    style={[
                        styles.tabHeart,
                        active &&
                            styles.tabHeartActive,
                    ]}
                >
                    ♥
                </Text>
            )}

            {settings && (
                <Image
                    source={icons.setting}
                    style={[
                        styles.segmentIcon,
                        {
                            opacity: active
                                ? 1
                                : 0.55,
                        },
                    ]}
                    resizeMode="contain"
                />
            )}

            <Text
                style={[
                    styles.segmentText,
                    active &&
                        styles.segmentActiveText,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

/* ═══════════════════════════════════════════════
   PROFILE CONTENT
═══════════════════════════════════════════════ */

function ProfileContent() {
    return (
        <>
            <View style={styles.lifestyleCard}>
                {LIFESTYLE_ITEMS.map(
                    (item, index) => (
                        <LifestyleRow
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            value={item.value}
                            isLast={
                                index ===
                                LIFESTYLE_ITEMS.length - 1
                            }
                        />
                    )
                )}
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.editButton,
                    pressed && styles.pressed,
                ]}
            >
                <Text
                    style={
                        styles.editButtonText
                    }
                >
                    Edit Lifestyle Profile
                </Text>
            </Pressable>
        </>
    );
}

/* ═══════════════════════════════════════════════
   LIFESTYLE ROW
═══════════════════════════════════════════════ */

function LifestyleRow({
    icon,
    label,
    value,
    isLast,
}: {
    icon: keyof typeof icons;
    label: string;
    value: string;
    isLast: boolean;
}) {
    return (
        <View
            style={[
                styles.lifestyleRow,
                !isLast &&
                    styles.lifestyleRowBorder,
            ]}
        >
            <View style={styles.lifestyleLeft}>
                <Image
                    source={icons[icon]}
                    style={styles.lifestyleIcon}
                    resizeMode="contain"
                />

                <Text
                    style={
                        styles.lifestyleLabel
                    }
                >
                    {label}
                </Text>
            </View>

            <Text
                style={
                    styles.lifestyleValue
                }
            >
                {value}
            </Text>
        </View>
    );
}

/* ═══════════════════════════════════════════════
   SAVED CONTENT
═══════════════════════════════════════════════ */

function SavedContent() {
    return (
        <View style={styles.savedContent}>
            <Text style={styles.sectionTitle}>
                LIKED ROOMMATES
            </Text>

            <View style={styles.savedList}>
                {LIKED_ROOMMATES.map(
                    (roommate) => (
                        <LikedRoommateCard
                            key={roommate.id}
                            {...roommate}
                        />
                    )
                )}
            </View>

            <Text
                style={[
                    styles.sectionTitle,
                    styles.listingsTitle,
                ]}
            >
                SAVED LISTINGS
            </Text>

            <View style={styles.savedList}>
                {SAVED_LISTINGS.map(
                    (listing) => (
                        <SavedListingCard
                            key={listing.id}
                            {...listing}
                        />
                    )
                )}
            </View>
        </View>
    );
}

/* ═══════════════════════════════════════════════
   LIKED ROOMMATE CARD
═══════════════════════════════════════════════ */

function LikedRoommateCard({
    initials,
    name,
    age,
    location,
    budget,
    score,
    avatarColor,
}: LikedRoommate) {
    return (
        <Pressable style={styles.roommateCard}>
            <View
                style={[
                    styles.roommateAvatar,
                    {
                        backgroundColor:
                            avatarColor,
                    },
                ]}
            >
                <Text
                    style={
                        styles.roommateInitials
                    }
                >
                    {initials}
                </Text>
            </View>

            <View style={styles.roommateInfo}>
                <Text
                    style={
                        styles.roommateName
                    }
                >
                    {name}, {age}
                </Text>

                <Text
                    style={
                        styles.roommateLocation
                    }
                    numberOfLines={1}
                >
                    {location} · {budget}
                </Text>
            </View>

            <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>
                    {score}
                </Text>
            </View>

            <View style={styles.heartButton}>
                <Text style={styles.heart}>
                    ♥
                </Text>
            </View>
        </Pressable>
    );
}

/* ═══════════════════════════════════════════════
   SAVED LISTING CARD
═══════════════════════════════════════════════ */

function SavedListingCard({
    title,
    location,
    price,
    availability,
    image,
}: SavedListing) {
    return (
        <Pressable
            style={styles.listingSavedCard}
        >
            <Image
                source={{ uri: image }}
                style={styles.listingImage}
            />

            <View style={styles.listingInfo}>
                <Text
                    style={styles.listingTitle}
                    numberOfLines={1}
                >
                    {title}
                </Text>

                <Text
                    style={
                        styles.listingLocation
                    }
                    numberOfLines={1}
                >
                    ◉ {location}
                </Text>

                <View style={styles.priceRow}>
                    <Text
                        style={
                            styles.listingPrice
                        }
                    >
                        ${price.toLocaleString()}
                    </Text>

                    <Text
                        style={
                            styles.priceMonth
                        }
                    >
                        /mo
                    </Text>

                    <View
                        style={
                            styles.availabilityBadge
                        }
                    >
                        <Text
                            style={
                                styles.availabilityText
                            }
                        >
                            {availability}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.starButton}>
                <Text style={styles.star}>
                    ★
                </Text>
            </View>
        </Pressable>
    );
}

/* ═══════════════════════════════════════════════
   SETTINGS CONTENT
═══════════════════════════════════════════════ */

function SettingsContent() {
    return (
        <View style={styles.settingsContent}>
            {/* ACCOUNT */}

            <SettingsSection title="ACCOUNT">
                {SETTINGS_ACCOUNT.map(
                    (item) => (
                        <AccountRow
                            key={item.id}
                            label={item.label}
                            value={item.value}
                            icon={item.icon}
                        />
                    )
                )}
            </SettingsSection>

            {/* VERIFICATION */}

            <SettingsSection title="VERIFICATION">
                {SETTINGS_VERIFICATION.map(
                    (item, index) => (
                        <VerificationRow
                            key={item.id}
                            label={item.label}
                            subtitle={
                                item.subtitle
                            }
                            icon={item.icon}
                            status={item.status}
                            action={item.action}
                            isLast={
                                index ===
                                SETTINGS_VERIFICATION.length -
                                    1
                            }
                        />
                    )
                )}
            </SettingsSection>

            {/* PREFERENCES */}

            <SettingsSection title="PREFERENCES">
                {SETTINGS_PREFERENCES.map(
                    (item, index) => (
                        <PreferenceRow
                            key={item.id}
                            label={item.label}
                            value={item.value}
                            isLast={
                                index ===
                                SETTINGS_PREFERENCES.length -
                                    1
                            }
                        />
                    )
                )}
            </SettingsSection>

            {/* DELETE */}

            <Pressable
                style={({ pressed }) => [
                    styles.deleteButton,
                    pressed &&
                        styles.pressed,
                ]}
            >
                <Text
                    style={
                        styles.deleteButtonText
                    }
                >
                    Delete Account
                </Text>
            </Pressable>

            {/* LOG OUT */}

            <Pressable
                style={({ pressed }) => [
                    styles.logoutButton,
                    pressed &&
                        styles.pressed,
                ]}
            >
                <Text
                    style={
                        styles.logoutButtonText
                    }
                >
                    Log Out
                </Text>
            </Pressable>
        </View>
    );
}

/* ═══════════════════════════════════════════════
   SETTINGS SECTION
═══════════════════════════════════════════════ */

function SettingsSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.settingsSection}>
            <Text
                style={
                    styles.settingsSectionTitle
                }
            >
                {title}
            </Text>

            <View style={styles.settingsCard}>
                {children}
            </View>
        </View>
    );
}

/* ═══════════════════════════════════════════════
   ACCOUNT ROW
═══════════════════════════════════════════════ */

function AccountRow({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: keyof typeof icons;
}) {
    return (
        <Pressable style={styles.accountRow}>
            <View style={styles.settingsRowLeft}>
                <Image
                    source={icons[icon]}
                    style={styles.settingsIcon}
                    resizeMode="contain"
                />

                <Text
                    style={styles.settingsLabel}
                >
                    {label}
                </Text>
            </View>

            <View
                style={
                    styles.settingsValueRow
                }
            >
                <Text
                    style={styles.settingsValue}
                >
                    {value}
                </Text>

                <Text style={styles.chevron}>
                    ›
                </Text>
            </View>
        </Pressable>
    );
}

/* ═══════════════════════════════════════════════
   VERIFICATION ROW
═══════════════════════════════════════════════ */

function VerificationRow({
    label,
    subtitle,
    icon,
    status,
    action,
    isLast,
}: {
    label: string;
    subtitle?: string;
    icon: keyof typeof icons;
    status: "action" | "verified";
    action: string;
    isLast: boolean;
}) {
    return (
        <Pressable
            style={[
                styles.verificationRow,
                !isLast &&
                    styles.settingsRowBorder,
            ]}
        >
            <View style={styles.settingsRowLeft}>
                <Image
                    source={icons[icon]}
                    style={[
                        styles.settingsIcon,
                        status === "action" &&
                            styles.verificationIcon,
                    ]}
                    resizeMode="contain"
                />

                <View>
                    <Text
                        style={
                            styles.verificationLabel
                        }
                    >
                        {label}
                    </Text>

                    {subtitle && (
                        <Text
                            style={
                                styles.verificationSubtitle
                            }
                        >
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>

            {status === "action" ? (
                <View
                    style={
                        styles.verifyButton
                    }
                >
                    <Text
                        style={
                            styles.verifyButtonText
                        }
                    >
                        {action}
                    </Text>
                </View>
            ) : (
                <View
                    style={
                        styles.verifiedBadge
                    }
                >
                    <Text
                        style={
                            styles.verifiedBadgeText
                        }
                    >
                        {action}
                    </Text>
                </View>
            )}
        </Pressable>
    );
}

/* ═══════════════════════════════════════════════
   PREFERENCE ROW
═══════════════════════════════════════════════ */

function PreferenceRow({
    label,
    value,
    isLast,
}: {
    label: string;
    value: string;
    isLast: boolean;
}) {
    return (
        <Pressable
            style={[
                styles.preferenceRow,
                !isLast &&
                    styles.settingsRowBorder,
            ]}
        >
            <Text
                style={styles.settingsLabel}
            >
                {label}
            </Text>

            <View
                style={
                    styles.settingsValueRow
                }
            >
                <Text
                    style={styles.settingsValue}
                >
                    {value}
                </Text>

                <Text style={styles.chevron}>
                    ›
                </Text>
            </View>
        </Pressable>
    );
}

/* ═══════════════════════════════════════════════
   STAT
═══════════════════════════════════════════════ */

function Stat({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <View style={styles.stat}>
            <Text style={styles.statValue}>
                {value}
            </Text>

            <Text style={styles.statLabel}>
                {label}
            </Text>
        </View>
    );
}

/* ═══════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════ */

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    container: {
        paddingHorizontal: spacing[4],
        paddingTop: spacing[2],
        paddingBottom: spacing[10],
    },

    /* ═════════ PROFILE HEADER ═════════ */

    profileCard: {
        borderRadius: radius.xl,
        padding: spacing[5],
        minHeight: 194,
        overflow: "hidden",
    },

    userRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,255,255,0.20)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing[4],
    },

    avatarText: {
        fontFamily: fonts.black,
        fontSize: 24,
        fontWeight: "800",
        color: "#FFFFFF",
    },

    userInfo: {
        flex: 1,
    },

    name: {
        fontFamily: fonts.black,
        fontSize: 19,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 2,
    },

    location: {
        fontFamily: fonts.sans,
        fontSize: 14,
        color: "rgba(255,255,255,0.72)",
    },

    badgesRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[2],
        marginTop: spacing[2],
    },

    unverifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    unverifiedDot: {
        width: 7,
        height: 7,
        borderRadius: radius.full,
        backgroundColor:
            colors.destructive,
    },

    unverifiedText: {
        fontFamily: fonts.medium,
        fontSize: 11,
        color: colors.destructive,
    },

    profileBadge: {
        backgroundColor: colors.accent,
        paddingHorizontal: spacing[2],
        paddingVertical: 5,
        borderRadius: radius.full,
    },

    profileBadgeText: {
        fontFamily: fonts.black,
        fontSize: 11,
        fontWeight: "800",
        color: colors.accentForeground,
    },

    /* ═════════ STATS ═════════ */

    statsRow: {
        flexDirection: "row",
        gap: spacing[2],
        marginTop: spacing[5],
    },

    stat: {
        flex: 1,
        height: 57,
        borderRadius: radius["2xl"],
        backgroundColor:
            "rgba(255,255,255,0.13)",
        alignItems: "center",
        justifyContent: "center",
    },

    statValue: {
        fontFamily: fonts.black,
        fontSize: 19,
        fontWeight: "800",
        lineHeight: 22,
        color: "#FFFFFF",
    },

    statLabel: {
        fontFamily: fonts.sans,
        fontSize: 11,
        color: "rgba(255,255,255,0.72)",
        marginTop: 1,
    },

    /* ═════════ TABS ═════════ */

    segmentedControl: {
        height: 36,
        marginTop: spacing[4],
        marginBottom: spacing[3],
        borderRadius: radius.full,
        backgroundColor: colors.secondary,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
    },

    segment: {
        flex: 1,
        height: 32,
        borderRadius: radius.full,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
    },

    segmentActive: {
        backgroundColor: colors.background,
    },

    segmentIcon: {
        width: 12,
        height: 12,
    },

    tabHeart: {
        fontSize: 12,
        color: colors.mutedForeground,
    },

    tabHeartActive: {
        color: "#FFFFFF",
    },

    segmentText: {
        fontFamily: fonts.bold,
        fontSize: 11,
        fontWeight: "700",
        color: colors.mutedForeground,
    },

    segmentActiveText: {
        fontFamily: fonts.black,
        fontSize: 11,
        fontWeight: "800",
        color: colors.foreground,
    },

    /* ═════════ LIFESTYLE ═════════ */

    lifestyleCard: {
        backgroundColor: colors.card,
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
    },

    lifestyleRow: {
        height: 49,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing[4],
    },

    lifestyleRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    lifestyleLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3],
    },

    lifestyleIcon: {
        width: 17,
        height: 17,
        opacity: 0.9,
    },

    lifestyleLabel: {
        fontFamily: fonts.sans,
        fontSize: 14,
        color: colors.mutedForeground,
    },

    lifestyleValue: {
        fontFamily: fonts.bold,
        fontSize: 14,
        fontWeight: "700",
        color: colors.foreground,
    },

    editButton: {
        height: 44,
        marginTop: spacing[4],
        borderRadius: radius.lg,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
    },

    editButtonText: {
        fontFamily: fonts.black,
        fontSize: 14,
        fontWeight: "800",
        color: colors.primary,
    },

    pressed: {
        opacity: 0.7,
    },

    /* ═════════ SAVED ═════════ */

    savedContent: {
        marginTop: spacing[1],
    },

    sectionTitle: {
        fontFamily: fonts.black,
        fontSize: 12,
        fontWeight: "800",
        color: colors.mutedForeground,
        letterSpacing: 0.4,
        marginBottom: spacing[3],
    },

    listingsTitle: {
        marginTop: spacing[4],
    },

    savedList: {
        gap: spacing[2],
    },

    /* ═════════ ROOMMATES ═════════ */

    roommateCard: {
        height: 74,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.xl,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing[3],
    },

    roommateAvatar: {
        width: 44,
        height: 44,
        borderRadius: radius.full,
        alignItems: "center",
        justifyContent: "center",
    },

    roommateInitials: {
        fontFamily: fonts.black,
        fontSize: 14,
        color: "#FFFFFF",
    },

    roommateInfo: {
        flex: 1,
        marginLeft: spacing[3],
        marginRight: spacing[2],
    },

    roommateName: {
        fontFamily: fonts.black,
        fontSize: 14,
        fontWeight: "800",
        color: colors.foreground,
    },

    roommateLocation: {
        fontFamily: fonts.sans,
        fontSize: 10,
        color: colors.mutedForeground,
        marginTop: 2,
    },

    scoreCircle: {
        width: 38,
        height: 38,
        borderRadius: radius.full,
        borderWidth: 4,
        borderColor: colors.accent,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing[2],
    },

    scoreText: {
        fontFamily: fonts.black,
        fontSize: 10,
        color: colors.accent,
    },

    heartButton: {
        width: 34,
        height: 34,
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,77,109,0.12)",
        alignItems: "center",
        justifyContent: "center",
    },

    heart: {
        fontSize: 17,
        color: colors.destructive,
    },

    /* ═════════ LISTINGS ═════════ */

    listingSavedCard: {
        height: 90,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.xl,
        flexDirection: "row",
        alignItems: "center",
        padding: spacing[2],
    },

    listingImage: {
        width: 62,
        height: 66,
        borderRadius: radius.lg,
        backgroundColor: colors.muted,
    },

    listingInfo: {
        flex: 1,
        marginLeft: spacing[3],
    },

    listingTitle: {
        fontFamily: fonts.black,
        fontSize: 14,
        fontWeight: "800",
        color: colors.foreground,
    },

    listingLocation: {
        fontFamily: fonts.sans,
        fontSize: 10,
        color: colors.mutedForeground,
        marginTop: 3,
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    listingPrice: {
        fontFamily: fonts.black,
        fontSize: 14,
        fontWeight: "800",
        color: colors.foreground,
    },

    priceMonth: {
        fontFamily: fonts.sans,
        fontSize: 10,
        color: colors.mutedForeground,
        marginLeft: 2,
    },

    availabilityBadge: {
        backgroundColor:
            "rgba(198,241,53,0.15)",
        borderRadius: radius.full,
        paddingHorizontal: spacing[2],
        paddingVertical: 3,
        marginLeft: spacing[2],
    },

    availabilityText: {
        fontFamily: fonts.black,
        fontSize: 9,
        fontWeight: "800",
        color: colors.accent,
    },

    starButton: {
        width: 34,
        height: 34,
        borderRadius: radius.full,
        backgroundColor:
            "rgba(255,77,109,0.12)",
        alignItems: "center",
        justifyContent: "center",
    },

    star: {
        fontSize: 16,
        color: colors.destructive,
    },

    /* ═════════ SETTINGS ═════════ */

    settingsContent: {
        paddingBottom: spacing[4],
    },

    settingsSection: {
        marginBottom: spacing[4],
    },

    settingsSectionTitle: {
        fontFamily: fonts.black,
        fontSize: 12,
        fontWeight: "800",
        color: colors.mutedForeground,
        letterSpacing: 0.4,
        marginBottom: spacing[2],
    },

    settingsCard: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.xl,
        overflow: "hidden",
    },

    accountRow: {
        height: 49,
        paddingHorizontal: spacing[4],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    settingsRowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[3],
    },

    settingsIcon: {
        width: 16,
        height: 16,
        opacity: 0.9,
    },

    settingsLabel: {
        fontFamily: fonts.sans,
        fontSize: 14,
        color: colors.mutedForeground,
    },

    settingsValueRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing[1],
    },

    settingsValue: {
        fontFamily: fonts.bold,
        fontSize: 14,
        fontWeight: "700",
        color: colors.foreground,
    },

    chevron: {
        fontFamily: fonts.sans,
        fontSize: 22,
        lineHeight: 22,
        color: colors.mutedForeground,
    },

    verificationRow: {
        minHeight: 62,
        paddingHorizontal: spacing[4],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    verificationIcon: {
        opacity: 1,
    },

    verificationLabel: {
        fontFamily: fonts.bold,
        fontSize: 14,
        fontWeight: "700",
        color: colors.foreground,
    },

    verificationSubtitle: {
        fontFamily: fonts.sans,
        fontSize: 12,
        color: colors.destructive,
        marginTop: 1,
    },

    verifyButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        borderRadius: radius.full,
    },

    verifyButtonText: {
        fontFamily: fonts.black,
        fontSize: 12,
        fontWeight: "800",
        color: "#FFFFFF",
    },

    verifiedBadge: {
        backgroundColor:
            "rgba(198,241,53,0.15)",
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        borderRadius: radius.full,
    },

    verifiedBadgeText: {
        fontFamily: fonts.black,
        fontSize: 11,
        fontWeight: "800",
        color: colors.accent,
    },

    preferenceRow: {
        height: 49,
        paddingHorizontal: spacing[4],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    settingsRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    deleteButton: {
        height: 47,
        borderRadius: radius.lg,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing[2],
    },

    deleteButtonText: {
        fontFamily: fonts.black,
        fontSize: 14,
        fontWeight: "800",
        color: colors.mutedForeground,
    },

    logoutButton: {
        height: 47,
        borderRadius: radius.lg,
        backgroundColor:
            "rgba(255,77,109,0.12)",
        alignItems: "center",
        justifyContent: "center",
    },

    logoutButtonText: {
        fontFamily: fonts.black,
        fontSize: 14,
        fontWeight: "800",
        color: colors.destructive,
    },
});