import StaticUtils from "../StaticUtils";
import BuilderWithWhere from "./BuilderWithWhere";

export default class InsertUpdateBuilder extends BuilderWithWhere {
   constructor(insert, table) {
      this.insert = insert;
      this.table = table;
      this.pairs = [];
   }
   
   columnValue(column, value) {
      this.pairs.push([column, value]);
      
      return this;
   }
   
   where(callbackOrConditionString, add = true) {
      super.where(callbackOrConditionString, add && !this.insert);
   }
   
   toString() {
      let str;
      
      if (this.insert) {
         const createList = index => "\n" + StaticUtils.
            addSeparator(this.pairs, ",\n", pair => pair[index]);
         
         str = `INSERT INTO ${this.table} (${createList(0)}) ` +
            `VALUES (${createList(1)});`;
      } else {
         str = `UPDATE ${this.table} SET\n` + StaticUtils.addSeparator(this.pairs,
            ",\n", pair => `${pair[0]} = ${pair[1]}`) + `${this.whereBuilder};`;
      }
      
      return str;
   }
}
