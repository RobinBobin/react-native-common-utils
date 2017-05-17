import StaticUtils from "../StaticUtils";
import Condition from "./Condition";

export default class WhereBuilder {
   constructor() {
      this.entries = [];
   }
   
   condition(condition) {
      this.condition = condition;
   }
   
   column(column) {
      return StaticUtils.pushAndReturnElement(
         this.entries, new Condition(column, this));
   }
   
   and() {
      this.entries.push("AND");
      
      return this;
   }
   
   toString() {
      return " WHERE\n" + (this.condition || StaticUtils.
         addSeparator(this.entries, ",\n"));
   }
}
