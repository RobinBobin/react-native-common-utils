import StaticUtils from "../StaticUtils";
import ArrayStringifier from "../ArrayStringifier";

export default class Condition {
   constructor(column, whereBuilder) {
      this.column = column;
      this.whereBuilder = whereBuilder;
   }
   
   e(value) {
      return this.operator("=", value);
   }
   
   ne(value) {
      return this.operator("!=", value);
   }
   
   g(value) {
      return this.operator(">", value);
   }
   
   ge(value) {
      return this.operator(">=", value);
   }
   
   l(value) {
      return this.operator("<", value);
   }
   
   le(value) {
      return this.operator("<=", value);
   }
   
   in(array) {
      if (!this.inStringifier) {
         this.inStringifier = new ArrayStringifier()
            .setPrefix("(")
            .setPostfix(")");
      }
      
      return this.operator("in", this.inStringifier
         .setArray(array).process(), false);
   }
   
   operator(operator, value, quoteIfString = true) {
      this.operator = operator;
      this.value = quoteIfString ? StaticUtils.quoteIfString(value) : value;
      
      return this.whereBuilder;
   }
   
   toString() {
      return `${this.column} ${this.operator} ${this.value}`;
   }
}
