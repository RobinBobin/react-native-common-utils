import StaticUtils from "../StaticUtils";

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
   
   operator(operator, value) {
      this.operator = operator;
      this.value = StaticUtils.quoteIfString(value);
      
      return this.whereBuilder;
   }
   
   toString() {
      return `${this.column} ${this.operator} ${this.value}`;
   }
}
