export type Source = {
  id: string;
  url: string;
  text: string;
  isLoading: boolean;
  error: string | null;
};

export type FormData = {
  title: string;
  text: string;
  sources: {url: string; text: string}[];
};

export type State = {
  errors?: {
    articleTitle?: string[];
    articleText?: string[];
    sources?: string[];
  };
  message?: string | null;
};
