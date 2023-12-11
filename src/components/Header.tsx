import { StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
}

const Header = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cccccc",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
