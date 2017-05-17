import StaticUtils from "../StaticUtils";
import BuilderWithWhere from "./BuilderWithWhere";

export default class SelectBuilder extends BuilderWithWhere {
   constructor() {
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
      this.orderBys.push([column, direction]);
      
      return this;
   }
   
   limit(limit, add = true) {
      if (add) {
         this.limitString = ` LIMIT ${limit}`;
      }
      
      return this;
   }
   
   toString() {
      const columns = StaticUtils.addSeparator(this.columns, ",\n", column =>
         Array.isArray(column) ? `${column[0]} AS ${column[1]}` : column);
      
      const orderBy = StaticUtils.addSeparator(this.orderBys, ",\n");
      
      return `SELECT\n${columns}`
         + ` FROM\n${StaticUtils.addSeparator(this.tables, ",\n")}`
         + this.whereBuilder
         + (!orderBy.length ? orderBy : ` ORDER BY\n${orderBy}`)
         + this.limitString;
   }
}
