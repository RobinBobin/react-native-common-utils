import ArrayStringifier from "../ArrayStringifier";
import BuilderWithWhere from "./BuilderWithWhere";

export default class SelectBuilder extends BuilderWithWhere {
   constructor() {
      super();
      
      this.columns = [];
      this.tables = [];
      this.orderBys = [];
      this.limitString = "";
   }
   
   column(column, alias) {
      this.columns.push(alias ? [column, alias] : column);
      
      return this;
   }
   
   from(table) {
      this.tables.push(table);
      
      return this;
   }
   
   where(callbackOrConditionString, add = true) {
      super.where(callbackOrConditionString, add);
      
      return this;
   }
   
   orderBy(column, direction) {
      this.orderBys.push(`${column} ${direction}`);
      
      return this;
   }
   
   limit(limit, add = true) {
      if (add) {
         this.limitString = ` LIMIT ${limit}`;
      }
      
      return this;
   }
   
   toString() {
      return new ArrayStringifier(this.columns)
         .setPrefix("SELECT ")
         .setElementProcessor(column => Array.isArray(column) ?
            `${column[0]} AS ${column[1]}` : column)
         .process()
         
         + new ArrayStringifier(this.tables)
            .setPrefix(" FROM ")
            .process()
         
         + this.whereBuilder
         
         + new ArrayStringifier(this.orderBys)
            .setPrefix(" ORDER BY ")
            .process()
         
         + `${this.limitString};`;
   }
}
