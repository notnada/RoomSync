import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";

const ListingDetails = () => {
    const {id} = useLocalSearchParams<{id: string}>()
  return (
    <View>
      <Text>Listing Details: {id}</Text>
      <Link href="/(tabs)/listings">Go back to listings</Link>
    </View>
  )
}



export default ListingDetails
