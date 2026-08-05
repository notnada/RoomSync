import { Tabs } from "expo-router";
import { tabs } from "../../constants/data";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, components } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

type TabIconProps = {
  focused: boolean;
  icon: any; // require() image source
  badgeCount?: number;
};

const TabIcon = ({ focused, icon, badgeCount }: TabIconProps) => {
  return (
    <View style={tabBar.item}>
      {focused ? (
        <LinearGradient
          colors={tabBar.iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[tabBar.iconBase, tabBar.iconActive]}
        >
          <Image
            source={icon}
            style={{ width: 20, height: 20, tintColor: tabBar.glyphActive }}
            resizeMode="contain"
          />
        </LinearGradient>
      ) : (
        <View style={tabBar.iconBase}>
          <Image
            source={icon}
            style={{ width: 20, height: 20, tintColor: tabBar.glyphInactive }}
            resizeMode="contain"
          />
          {!!badgeCount && (
            <View style={tabBar.badge}>
              <Text style={tabBar.badgeText}>{badgeCount}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...tabBar.bar,
          position: "absolute",
          bottom: 0,
          height: tabBar.bar.paddingTop + 40 + Math.max(insets.bottom, tabBar.bar.paddingBottom),
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} badgeCount={tab.badgeCount} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text style={[tabBar.label, focused && tabBar.labelActive]}>{tab.title}</Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;