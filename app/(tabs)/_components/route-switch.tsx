import { Link } from "expo-router";
import { Text, View } from "react-native";

export function RouteSwitch() {
  return (
    <View className="flex-row gap-3 rounded-2xl border border-border bg-card p-2">
      <Link
        href="/"
        className="flex-1 rounded-xl bg-primary px-4 py-3"
      >
        <Text className="text-center font-sans-bold text-base text-primary-foreground">
          Home
        </Text>
      </Link>

      <Link
        href="/(tabs)/listings"
        className="flex-1 rounded-xl border border-border px-4 py-3"
      >
        <Text className="text-center font-sans-bold text-base text-foreground">
          Listings
        </Text>
      </Link>
    </View>
  );
}