import "@/global.css"
import { Text, View } from "react-native";
import { Link } from "expo-router";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 text-blue-500">
        Go to Onboarding
      </Link>
      <Link href="/(auth)/signin" className="mt-4 text-blue-500">
        Go to Signin
      </Link>
      <Link href="/(auth)/signup" className="mt-4 text-blue-500">
        Go to Signup
      </Link>
      <Link href="/(tabs)/listings" className="mt-4 text-blue-500">
        Go to Listings
      </Link>
    </View>
  );
}