import { Tabs } from "expo-router";
import { tabs } from "../../constants/data";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { components } from "../../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

type TabIconProps = {
  focused: boolean;
  icon: any;
  badgeCount?: number;
};

const TabIcon = ({
  focused,
  icon,
  badgeCount,
}: TabIconProps) => {
  return (
    <View style={tabBar.item}>
      {focused ? (
        <LinearGradient
          colors={tabBar.iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            tabBar.iconBase,
            tabBar.iconActive,
          ]}
        >
          <Image
            source={icon}
            style={{
              width: 22,
              height: 22,
              tintColor: tabBar.glyphActive,
            }}
            resizeMode="contain"
          />
        </LinearGradient>
      ) : (
        <View style={tabBar.iconBase}>
          <Image
            source={icon}
            style={{
              width: 22,
              height: 22,
              tintColor: tabBar.glyphInactive,
            }}
            resizeMode="contain"
          />

          {!!badgeCount && (
            <View style={tabBar.badge}>
              <Text style={tabBar.badgeText}>
                {badgeCount}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  /*
   * 36px icon
   * 6px gap
   * 9px label
   * 12px bottom padding
   */
  const contentHeight = 36 + 6 + 9 + 12;

  const tabBarHeight =
    contentHeight + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          ...tabBar.bar,

          position: "absolute",
          bottom: 0,

          height: tabBarHeight,

          paddingTop: 6,
          paddingBottom: insets.bottom,
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
              <TabIcon
                focused={focused}
                icon={tab.icon}
                badgeCount={tab.badgeCount}
              />
            ),

            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  tabBar.label,
                  focused && tabBar.labelActive,
                ]}
              >
                {tab.title}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;