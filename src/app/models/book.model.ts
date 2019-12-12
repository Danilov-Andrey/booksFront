import { Author } from "./author.model";
import { Publisher } from "./publisher.model";
import { Copies } from "./copies.model";

export interface Book {
  id: number;
  name: string;
  year: number;
  author: Author;
  publisher: Publisher;
  copies: Copies;
}
