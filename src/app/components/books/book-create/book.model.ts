export class NewBook {
  name: string;
  year: number;
  authorFirstName: string;
  authorLastName: string;
  publisherName: string;
  rate: number;
  count: number;
  constructor(
    name: string,
    year: number,
    authorFirstName: string,
    authorLastName: string,
    publisherName: string,
    rate: number,
    count: number
  ) {
    (this.name = name),
      (this.year = year),
      (this.authorFirstName = authorFirstName),
      (this.authorLastName = authorLastName),
      (this.publisherName = publisherName),
      (this.rate = rate),
      (this.count = count);
  }
}
