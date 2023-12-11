import { Dispatch } from "react";
import { ArticlesContextActions } from "./reducer";
import { getArticles } from "../../services/articles";

export const loadFirstArticlesAction =
  (dispatch: Dispatch<ArticlesContextActions>) => async () => {
    const articles = await getArticles();
    dispatch({ type: "LOAD_ARTICLES", articles });
  };

export const loadMoreArticlesAction =
  (dispatch: Dispatch<ArticlesContextActions>) => async (page: number) => {
    const articles = await getArticles(page);
    dispatch({ type: "LOAD_MORE_ARTICLES", articles });
  };

export const deleteArticleAction =
  (dispatch: Dispatch<ArticlesContextActions>) => (objectID: string) => {
    dispatch({ type: "DELETE_ARTICLE", objectID });
  };
