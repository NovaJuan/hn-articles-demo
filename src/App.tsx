import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import Articles from "./views/Articles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsWebview from "./views/DetailsWebview";
import { ArticlesContextProvider } from "./contexts/Articles";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ArticlesContextProvider>
      <NavigationContainer>
        <StatusBar style="auto" />

        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen name="Articles" component={Articles} />
              <Stack.Screen name="Details" component={DetailsWebview} />
            </Stack.Navigator>
          </View>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ArticlesContextProvider>
  );
};

export default registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
