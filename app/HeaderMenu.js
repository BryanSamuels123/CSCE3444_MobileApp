import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons } from "../constants";
import { StatusBar } from "expo-status-bar";
import * as React from 'react';

const HeaderMenu = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkSecond },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default HeaderMenu;
