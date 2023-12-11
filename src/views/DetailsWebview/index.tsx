import { WebView } from "react-native-webview";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props extends NativeStackScreenProps<RootStackParamList, "Details"> {}

const DetailsWebview = ({ route, navigation }: Props) => {
  const { url, title } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  if (!url) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          This article doesn't have a related view 🙁
        </Text>
      </View>
    );
  }

  return <WebView source={{ uri: url }} style={styles.webviewContainer} />;
};

export default DetailsWebview;

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    fontSize: 12,
  },
});
