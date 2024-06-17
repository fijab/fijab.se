export interface BlogPost {
  id: number;
  title: string;
  link: string;
  content: string;
  author: string;
  date: Date;
  image?: string;
  category?: string;
  featured?: boolean;
}
