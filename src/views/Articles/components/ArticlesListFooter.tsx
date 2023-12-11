import { ActivityIndicator, StyleSheet, View } from "react-native";

const ArticlesListFooter = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ArticlesListFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
