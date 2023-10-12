// layout will go here
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// prob not the "correct" way to change status bar but it works... only if you commetn it out then back in after starting expo
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: (props) => <StatusBar style="light" />,
      }}
    />
  );
};
export default Layout;
