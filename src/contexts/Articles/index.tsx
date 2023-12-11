import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ArticlesItem } from "../../services/articles/types";
import { ArticlesContextActions, articlesContextReducer } from "./reducer";
import {
  deleteArticleAction,
  loadFirstArticlesAction,
  loadMoreArticlesAction,
} from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialProps = {
  articles: [] as ArticlesItem[],
  latestArticles: [] as ArticlesItem[],
  blacklistedArticles: [] as string[],
  isLoadingLocalData: true as boolean,
};

export type ArticlesState = typeof initialProps;

export const ArticlesContext = createContext(initialProps);
const DispatchContext = createContext<Dispatch<ArticlesContextActions>>(
  () => {}
);

export const ArticlesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(articlesContextReducer, initialProps);

  const fetchLocalData = async () => {
    const data = await AsyncStorage.getItem("articles-state-v1");

    if (!data) dispatch({ type: "FINISH_LOCAL_FETCH" });

    if (data) dispatch({ type: "SET_LOCAL_DATA", data: JSON.parse(data) });
  };

  const storeData = async () => {
    await AsyncStorage.setItem(
      "articles-state-v1",
      JSON.stringify({ ...state, articles: [] })
    );
  };

  useEffect(() => {
    fetchLocalData();
  }, []);

  useEffect(() => {
    storeData();
  }, [state]);

  return (
    <ArticlesContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ArticlesContext.Provider>
  );
};

export const useArticlesContext = () => {
  const state = useContext(ArticlesContext);
  const dispatch = useContext(DispatchContext);

  return {
    ...state,
    loadFirstArticles: loadFirstArticlesAction(dispatch),
    loadMoreArticles: loadMoreArticlesAction(dispatch),
    deleteArticle: deleteArticleAction(dispatch),
  };
};
