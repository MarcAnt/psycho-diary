export type Entry = {
  id: string;
  date: string | Date;
  title?: string;
  description: string;
  comments: Comment[];
};

export type Comment = {
  comment: string | undefined;
  created_at: string | Date;
  id: string;
};
