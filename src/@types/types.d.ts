
export type FormData = {
  title: string;
  text: string;
  sources: {url: string; text: string}[];
};

export type NewArticle = {
  id?: string;
  title: string;
  text: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}