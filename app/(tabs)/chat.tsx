import { CHATS } from "@/constants/data";
import theme from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

function ChatRow({ item }: { item: (typeof CHATS)[number] }) {
  const initials =
    item.initials ??
    item.name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("");

  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => ({
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: theme.spacing[4],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        {/* =========================
            AVATAR
        ========================= */}

        <View
          style={{
            position: "relative",
          }}
        >
          <LinearGradient
            colors={theme.colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: theme.spacing[10],
              height: theme.spacing[10],
              borderRadius: theme.radius.full,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.colors.primaryForeground,
                fontFamily: theme.fonts.black,
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.black,
              }}
            >
              {initials}
            </Text>
          </LinearGradient>

          {/* =========================
              UNREAD BADGE
          ========================= */}

          {!!item.unreadCount && (
            <View
              style={{
                position: "absolute",
                right: -theme.spacing[1],
                top: -theme.spacing[1],
                width: theme.spacing[5],
                height: theme.spacing[5],
                borderRadius: theme.radius.full,
                backgroundColor: theme.colors.accent,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: theme.colors.background,
              }}
            >
              <Text
                style={{
                  color: theme.colors.accentForeground,
                  fontFamily: theme.fonts.black,
                  fontSize: theme.fontSize.xs,
                  fontWeight: theme.fontWeight.black,
                  lineHeight: theme.fontSize.xs * theme.lineHeight.tight,
                }}
              >
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>

        {/* =========================
            CHAT INFORMATION
        ========================= */}

        <View
          style={{
            flex: 1,
            marginLeft: theme.spacing[4],
          }}
        >
          {/* NAME + TIME */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: theme.spacing[2],
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: theme.colors.foreground,
                fontFamily: theme.fonts.black,
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.black,
                lineHeight:
                  theme.fontSize.sm * theme.lineHeight.snug,
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: theme.colors.mutedForeground,
                fontFamily: theme.fonts.sans,
                fontSize: theme.fontSize.xs,
                fontWeight: theme.fontWeight.normal,
              }}
            >
              {item.time}
            </Text>
          </View>

          {/* LAST MESSAGE */}

          <Text
            numberOfLines={1}
            style={{
              color: theme.colors.mutedForeground,
              marginTop: theme.spacing[1],
              fontFamily: theme.fonts.sans,
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.normal,
              lineHeight:
                theme.fontSize.sm * theme.lineHeight.normal,
            }}
          >
            {item.lastMessage}
          </Text>
        </View>

        {/* =========================
            ARROW
        ========================= */}

        <View
          style={{
            marginLeft: theme.spacing[3],
            width: theme.spacing[5],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.mutedForeground,
              fontFamily: theme.fonts.sans,
              fontSize: theme.fontSize.xl,
              lineHeight: theme.fontSize.xl,
            }}
          >
            ›
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  const unreadCount = CHATS.reduce(
    (total, chat) => total + (chat.unreadCount ?? 0),
    0
  );

  return (
    <RNSafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      edges={["top"]}
    >
      {/* =========================
          HEADER
      ========================= */}

      <View
        style={{
          paddingHorizontal: theme.spacing[4],
          paddingTop: theme.spacing[4],
          paddingBottom: theme.spacing[2],
        }}
      >
        <Text
          style={{
            color: theme.colors.foreground,
            fontFamily: theme.fonts.black,
            fontSize: theme.fontSize["2xl"],
            fontWeight: theme.fontWeight.black,
            lineHeight:
              theme.fontSize["2xl"] * theme.lineHeight.tight,
          }}
        >
          Messages
        </Text>

        <Text
          style={{
            color: theme.colors.mutedForeground,
            marginTop: theme.spacing[1],
            fontFamily: theme.fonts.sans,
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.normal,
          }}
        >
          {unreadCount}{" "}
          {unreadCount === 1 ? "unread" : "unread"}
        </Text>
      </View>

      {/* =========================
          CHAT LIST
      ========================= */}

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing[4],
          paddingTop: theme.spacing[2],
          paddingBottom:
            theme.spacing[20] + insets.bottom,
        }}
        renderItem={({ item }) => <ChatRow item={item} />}
      />
    </RNSafeAreaView>
  );
}