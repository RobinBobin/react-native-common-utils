import StaticUtils from "../StaticUtils";
import Entry from "./Entry";

class UniqueEntry extends Entry{
   constructor(name) {
      super(name);
   }
   
   collate(collation) {
      return this.attr(`COLLATE ${collation}`);
   }
   
   order(direction) {
      return this.attr(direction);
   }
   
   toString() {
      return `${this.name} ${StaticUtils.addSeparator(this.attrs, " ")}`;
   }
}

export default class UniqueBuilder {
   constructor() {
      this.entries = [];
   }
   
   column(name) {
      return StaticUtils.pushAndReturnElement(this.entries, new UniqueEntry(name));
   }
   
   toString() {
      return `UNIQUE (\n${StaticUtils.addSeparator(this.entries, ",\n")})`;
   }
}
