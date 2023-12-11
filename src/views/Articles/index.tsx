import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Article from "./components/Article";
import { useEffect, useLayoutEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useArticlesContext } from "../../contexts/Articles";
import ArticlesListFooter from "./components/ArticlesListFooter";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "Articles"> {}

const Articles = ({ navigation }: Props) => {
  const {
    articles,
    isLoadingLocalData,
    loadFirstArticles,
    deleteArticle,
    loadMoreArticles,
  } = useArticlesContext();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "📰 Latest HN Articles!",
    });
  }, []);

  // Fetch articles but only after the local state is loaded
  useEffect(() => {
    if (!isLoadingLocalData) loadFirstArticles();
  }, [isLoadingLocalData]);

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadFirstArticles();

    setRefreshing(false);
  };

  const fetchNextArticles = async () => {
    setLoading(true);

    setPage((current) => current + 1);

    await loadMoreArticles(page + 1);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.objectID}
        renderItem={(data) => (
          <Article
            {...data.item}
            onDelete={(id) => {
              deleteArticle(id);
            }}
          />
        )}
        style={styles.list}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={fetchNextArticles}
        ListFooterComponent={<ArticlesListFooter loading={loading} />}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
