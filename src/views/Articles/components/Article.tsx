import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { ArticlesItem } from "../../../services/articles/types";
import { getFormattedDate } from "../../../utils/dates";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useArticlesContext } from "../../../contexts/Articles";
import { memo } from "react";

interface Props extends ArticlesItem {
  onDelete: (id: string) => void;
}

const renderRightActions = (
  progress: Animated.AnimatedInterpolation<number>,
  _dragAnimatedValue: Animated.AnimatedInterpolation<number>
) => {
  const CONTAINER_WIDTH = 192;

  const transformPosition = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CONTAINER_WIDTH, 0],
  });

  const opacityValues = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View
      style={[
        {
          width: CONTAINER_WIDTH,
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: opacityValues,
          flex: 1,
          transform: [{ translateX: transformPosition }],
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Animated.View>
    </View>
  );
};

const Article = ({
  title,
  story_title,
  author,
  created_at,
  url,
  story_url,
  objectID,
  onDelete,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Articles">>();

  const onSwipeOpen = (direction: "left" | "right") => {
    if (direction === "right") {
      onDelete(objectID);
    }
  };

  const onPress = () => {
    navigation.push("Details", {
      title: story_title || title,
      url: story_url || url,
    });
  };

  return (
    <View style={styles.container}>
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={onSwipeOpen}
        overshootFriction={8}
        friction={1}
        enableTrackpadTwoFingerGesture
        overshootRight={false}
        rightThreshold={150}
      >
        <Pressable
          style={({ pressed }) => [
            styles.pressableContainer,
            pressed && styles.pressed,
          ]}
          onPress={onPress}
        >
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{story_title || title}</Text>
            </View>
            <Text style={styles.information}>
              {author} - {getFormattedDate(created_at)}
            </Text>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );
};

export default memo(Article);

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#000",
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  titleContainer: {
    marginBottom: 6,
  },
  information: {
    fontSize: 12,
    fontWeight: "300",
    color: "#424242",
  },
  deleteButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    padding: 10,
    fontWeight: "700",
  },
  pressableContainer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
