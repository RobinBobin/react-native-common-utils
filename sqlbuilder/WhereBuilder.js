import StaticUtils from "../StaticUtils";
import ArrayStringifier from "../ArrayStringifier"
import Condition from "./Condition";

export default class WhereBuilder {
   constructor() {
      this.entries = [];
   }
   
   condition(condition) {
      this.conditionString = condition;
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
      return new ArrayStringifier().setPrefix(" WHERE\n" + (this.conditionString
         || ""), !this.conditionString).process(StaticUtils.addSeparator(this.
            entries, ",\n"));
   }
}
