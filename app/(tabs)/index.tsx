import "@/global.css";

import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { styled } from "nativewind";
import * as React from "react";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView as RNSafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const profile = {
  name: "Priya M.",
  age: 23,
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop&auto=format",
  location: "Mission District · $1,200–1,600/mo",
  match: 94,
  tags: ["Early bird", "Non-smoker", "Neat"],
  warnings: [
    { label: "10pm–7am", icon: "time-outline" as const },
    { label: "Quiet", icon: "volume-mute-outline" as const },
    { label: "No", icon: "close-outline" as const },
    { label: "No pets", icon: "paw-outline" as const },
    { label: "Very neat", icon: "sparkles-outline" as const },
  ],
};

function Pill({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <View
      className={`rounded-full px-5 py-3 ${active ? "bg-[#7f5af0]" : "bg-[#23243c]"}`}
    >
      <Text className={`text-center font-sans-bold ${active ? "text-white" : "text-[#8e90b8]"}`}>
        {children}
      </Text>
    </View>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <View className="rounded-full bg-white/18 px-3 py-1.5">
      <Text className="text-sm font-sans-bold text-white">{children}</Text>
    </View>
  );
}

function ActionButton({
  icon,
  tone,
  compact,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  tone: "reject" | "save" | "like";
  compact: boolean;
}) {
  const styles = {
    reject: "border-2 border-[#a14667] bg-[#201726] text-[#ff5b82]",
    save: "border-2 border-[#4d427f] bg-[#201c34] text-[#9b8bff]",
    like: "border-2 border-[#8d67ff] bg-[#8d67ff] text-white",
  } as const;

  const size = compact
    ? tone === "like"
      ? "h-14 w-14"
      : "h-12 w-12"
    : tone === "like"
      ? "h-16 w-16"
      : "h-14 w-14";

  return (
    <Pressable className={`items-center justify-center rounded-full ${size} ${styles[tone]}`}>
      <Ionicons name={icon} size={compact ? (tone === "like" ? 26 : 22) : tone === "like" ? 30 : 26} color="currentColor" />
    </Pressable>
  );
}

export default function App() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const compact = height < 760;
  const heroHeight = Math.max(compact ? 190 : 220, Math.min(compact ? 250 : 300, Math.round(height * 0.24)));
  const titleSize = compact ? "text-3xl" : "text-4xl";
  const scoreSize = compact ? "text-4xl" : "text-5xl";
  return (
    <SafeAreaView className="flex-1 bg-[#0b0c16]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: bottom > 0 ? bottom + 12 : 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-3 flex-row items-start justify-between">
          <View>
            <Text className={`${titleSize} font-sans-extrabold text-white`}>Discover</Text>
            <Text className={`${compact ? "mt-0.5 text-sm" : "mt-1 text-base"} text-[#8e90b8]`}>
              Find your people
            </Text>
          </View>

          <Pressable className={`relative ${compact ? "h-10 w-10" : "h-11 w-11"} items-center justify-center rounded-full bg-[#23243c]`}>
            <Ionicons name="notifications-outline" size={compact ? 18 : 20} color="#e9eaff" />
            <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#c8f34c]" />
          </Pressable>
        </View>

        <View className={`${compact ? "mb-3 p-1" : "mb-4 p-1.5"} flex-row rounded-full bg-[#23243c]`}>
          <View className="flex-1">
            <Pill active>✦ Swipe</Pill>
          </View>
          <View className="flex-1">
            <Pill>⋯ Search</Pill>
          </View>
        </View>

        <View className="overflow-hidden rounded-2xl bg-[#18192d]">
          <View className="relative" style={{ height: heroHeight }}>
            <Image
              source={{ uri: profile.image }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
            <View className="absolute inset-0 bg-black/20" />
            <View className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-black/85 via-black/45 to-transparent" />

            <View className="absolute right-3 top-3 rounded-full bg-[#7b5cf3] px-3 py-1.5 flex-row items-center gap-1.5">
              <Feather name="shield" size={13} color="#fff" />
              <Text className="text-sm font-sans-bold text-white">Verified</Text>
            </View>

            <View className="absolute inset-x-4 bottom-3">
              <View className="flex-row items-end justify-between gap-3">
                <View className="flex-1">
                  <View className="flex-row items-end gap-1">
                    <Text className={`${compact ? "text-2xl" : "text-3xl"} font-sans-extrabold text-white`}>
                      {profile.name}
                    </Text>
                    <Text className={`${compact ? "pb-0.5 text-base" : "pb-1 text-xl"} font-sans-semibold text-white/85`}>
                      {profile.age}
                    </Text>
                  </View>
                  <Text className={`${compact ? "mt-0.5 text-sm" : "mt-1 text-base"} text-white/80`}>
                    {profile.location}
                  </Text>
                </View>

                <View className="items-end">
                  <Text className={`${scoreSize} font-sans-extrabold text-[#c8f34c]`}>
                    {profile.match}%
                  </Text>
                  <Text className="-mt-1 text-sm text-white/75">match</Text>
                </View>
              </View>

              <View className={`${compact ? "mt-2 gap-1.5" : "mt-3 gap-2"} flex-row flex-wrap`}>
                {profile.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </View>
            </View>
          </View>

          <View className={`${compact ? "px-3 pb-3 pt-2" : "px-4 pb-4 pt-3"}`}>
            <View className={`${compact ? "gap-1.5" : "gap-2"} flex-row flex-wrap`}>
              {profile.warnings.map((item) => (
                <View key={item.label} className={`flex-row items-center rounded-full bg-[#242544] ${compact ? "gap-1 px-2.5 py-1.5" : "gap-1.5 px-3 py-2"}`}>
                  <Ionicons name={item.icon} size={compact ? 12 : 14} color="#8d67ff" />
                  <Text className={`${compact ? "text-xs" : "text-sm"} font-sans-bold text-white`}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className={`${compact ? "mt-4 gap-4" : "mt-5 gap-5"} flex-row items-center justify-center`}>
          <ActionButton tone="reject" icon="close" compact={compact} />
          <ActionButton tone="save" icon="star" compact={compact} />
          <ActionButton tone="like" icon="heart" compact={compact} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}