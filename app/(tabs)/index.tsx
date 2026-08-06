import "@/global.css"

import { Text, View } from "react-native";
import { Link } from "expo-router";

import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 bg-primary text-blue-500">
        Go to Onboarding
      </Link>
      <Link href="/(auth)/signin" className="mt-4 bg-primary text-blue-500">
        Go to Signin
      </Link>
      <Link href="/(auth)/signup" className="mt-4 bg-primary   text-blue-500">
        Go to Signup
      </Link>
      <Link href="/(tabs)/listings" className="mt-4 bg-primary rounded px-4 text-blue-500">
        Go to Listings
      </Link>
    </SafeAreaView>
  );
}