import { Image } from "expo-image";
import { styled } from "nativewind";
import * as React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import {
	Card,
	CardContent
} from "./_components/card";

const SafeAreaView = styled(RNSafeAreaView);

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

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "accent" }) {
  const toneClasses =
    tone === "accent"
      ? "bg-[#6d7cff] text-white"
      : "bg-lime-300 text-black";

  return (
    <View className={`rounded-full px-3 py-1 ${toneClasses}`}>
      <Text className="text-xs font-sans-bold">{children}</Text>
    </View>
  );
}

type ListingFilter = "all" | "guild-ready";

const Listings = () => {
	const [activeFilter, setActiveFilter] = React.useState<ListingFilter>("all");

	const visibleListings = React.useMemo(
		() =>
			activeFilter === "guild-ready"
				? listings.filter((listing) => listing.guildOk)
				: listings,
		[activeFilter]
	);

	return (
		<SafeAreaView className="flex-1 bg-[#0d1020]">
			<ScrollView
				className="flex-1 px-3"
				contentContainerClassName="gap-4 pb-28 pt-3"
				showsVerticalScrollIndicator={false}
			>
				<View className="px-2 pb-2 pt-1">
					<Text className="text-4xl font-sans-extrabold text-white">Listings</Text>
					<Text className="mt-1 text-base text-[#8e90b8]">Verified properties only</Text>
				</View>

				<View className="flex-row gap-2 px-1">
					<Pressable
						onPress={() => setActiveFilter("all")}
						className={`rounded-full px-4 py-2 ${activeFilter === "all" ? "bg-[#8d67ff]" : "bg-[#2a2d4b]"}`}
					>
						<Text className={`font-sans-bold ${activeFilter === "all" ? "text-white" : "text-[#8e90b8]"}`}>
							All
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setActiveFilter("guild-ready")}
						className={`rounded-full px-4 py-2 ${activeFilter === "guild-ready" ? "bg-[#8d67ff]" : "bg-[#2a2d4b]"}`}
					>
						<Text className={`font-sans-bold ${activeFilter === "guild-ready" ? "text-white" : "text-[#8e90b8]"}`}>
							Guild-Ready
						</Text>
					</Pressable>
				</View>

				{visibleListings.map((listing) => (
					<Card key={listing.id} className="overflow-hidden border border-[#252845] bg-[#151735]">
						<View className="relative h-56 w-full">
							<Image source={{ uri: listing.image }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
							<View className="absolute inset-0 bg-black/35" />
							<View className="absolute left-3 top-3 flex-row gap-2">
								<Badge>{listing.verified ? "Verified" : "Unverified"}</Badge>
								{listing.guildOk ? <Badge tone="accent">Guild OK</Badge> : null}
							</View>

							<View className="absolute bottom-4 left-4 right-4 flex-row items-end justify-between gap-4">
								<View className="flex-1">
									<Text className="text-2xl font-sans-extrabold text-white" numberOfLines={1}>
										{listing.title}
									</Text>
									<Text className="mt-1 text-sm text-white/85" numberOfLines={1}>
										{listing.location}
									</Text>
								</View>
								<View className="items-end">
									<Text className="text-2xl font-sans-extrabold text-white">
										{listing.price}
									</Text>
									<Text className="text-sm text-white/75">{listing.subprice}</Text>
								</View>
							</View>
						</View>

						<CardContent className="gap-4 px-4 pb-4 pt-4">
							<View className="flex-row items-center gap-3">
								<Text className="text-sm text-[#8e90b8]">{listing.details}</Text>
								<Text className="text-sm text-[#8e90b8]">·</Text>
								<Text className="text-sm font-sans-bold text-[#c8f34c]">
									{listing.availability}
								</Text>
							</View>

							<View className="flex-row flex-wrap gap-2">
								{listing.tags.map((tag) => (
									<View key={tag} className="rounded-full bg-[#242744] px-3 py-1">
										<Text className="text-sm font-sans-semibold text-white/90">{tag}</Text>
									</View>
								))}
							</View>

							<View className="pt-1">
								<View className="rounded-full bg-[#8d67ff] px-5 py-4">
									<Text className="text-center font-sans-bold text-base text-white">View Details</Text>
								</View>
							</View>
						</CardContent>
					</Card>
				))}

				{visibleListings.length === 0 ? (
					<View className="rounded-[28px] border border-[#252845] bg-[#151735] px-5 py-8">
						<Text className="text-center text-lg font-sans-bold text-white">
							No guild-ready listings right now.
						</Text>
						<Text className="mt-2 text-center text-sm text-[#8e90b8]">
							Try switching back to All to see the full feed.
						</Text>
					</View>
				) : null}
			</ScrollView>
        </SafeAreaView>
	);
};

export default Listings;
