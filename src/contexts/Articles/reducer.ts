import { ArticlesState } from ".";
import { ArticlesItem } from "../../services/articles/types";

export type ArticlesContextActions =
  | { type: "LOAD_ARTICLES"; articles: ArticlesItem[] }
  | { type: "LOAD_MORE_ARTICLES"; articles: ArticlesItem[] }
  | { type: "DELETE_ARTICLE"; objectID: string }
  | { type: "FINISH_LOCAL_FETCH" }
  | { type: "SET_LOCAL_DATA"; data: ArticlesState };

export const articlesContextReducer = (
  state: ArticlesState,
  action: ArticlesContextActions
): ArticlesState => {
  switch (action.type) {
    case "LOAD_ARTICLES": {
      const newestArticles = action.articles
        .filter(
          (item) =>
            !state.articles.find(
              (oldItem) => oldItem.objectID === item.objectID
            )
        )
        .filter((item) => !state.blacklistedArticles.includes(item.objectID));

      const articles = [...newestArticles, ...state.articles];
      return {
        ...state,
        articles,
        latestArticles: newestArticles,
      };
    }
    case "LOAD_MORE_ARTICLES": {
      const newArticles = action.articles
        .filter(
          (item) =>
            !state.articles.find(
              (oldItem) => oldItem.objectID === item.objectID
            )
        )
        .filter((item) => !state.blacklistedArticles.includes(item.objectID));

      const articles = [...state.articles, ...newArticles];
      return {
        ...state,
        articles,
      };
    }
    case "DELETE_ARTICLE":
      return {
        ...state,
        blacklistedArticles: [...state.blacklistedArticles, action.objectID],
        articles: state.articles.filter(
          (item) =>
            ![...state.blacklistedArticles, action.objectID].includes(
              item.objectID
            )
        ),
        latestArticles: state.latestArticles.filter(
          (item) =>
            ![...state.blacklistedArticles, action.objectID].includes(
              item.objectID
            )
        ),
      };
    case "FINISH_LOCAL_FETCH":
      return {
        ...state,
        isLoadingLocalData: false,
      };
    case "SET_LOCAL_DATA":
      return {
        ...state,
        latestArticles: action.data.latestArticles,
        articles: action.data.latestArticles,
        blacklistedArticles: action.data.blacklistedArticles,
        isLoadingLocalData: false,
      };
    default:
      throw new Error(
        `Action type ${(action as any).type} is not handled by ArticlesContext`
      );
  }
};
