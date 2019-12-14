export class UpdateBook {
  constructor(id: number, name: string, year: number) {
    this.id = id;
    this.name = name;
    this.year = year;
  }
  id: number;
  name: string;
  year: number;
}
