import { AxiosResponse } from "axios";

export interface ArticlesItem {
  story_title: string;
  title: string;
  url: string;
  story_url: string;
  created_at: string;
  author: string;
  objectID: string;
}

interface ArticlesResponse extends AxiosResponse {
  data: {
    hits: ArticlesItem[];
  };
}
