import axios from "axios";
import { ArticlesResponse } from "./types";

const articlesClient = axios.create({
  baseURL: "https://hn.algolia.com/api/v1/",
});

export const getArticles = async (page?: number) => {
  const response: ArticlesResponse = await articlesClient.get(
    `search_by_date?query=mobile${page ? `&page=${page}` : ""}`
  );
  return response.data.hits.map((hit) => ({
    story_title: hit.story_title,
    title: hit.title,
    url: hit.url,
    story_url: hit.story_url,
    created_at: hit.created_at,
    author: hit.author,
    objectID: hit.objectID,
  }));
};
