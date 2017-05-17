import WhereBuilder from "./WhereBuilder";

export default class BuilderWithWhere {
   constructor() {
      this.whereBuilder = new WhereBuilder();
   }
   
   where(callbackOrConditionString, add = true) {
      if (add) {
         callbackOrConditionString.constructor == String ?
            this.whereBuilder.condition(callbackOrConditionString)
            : callbackOrConditionString(this.whereBuilder);
      }
   }
}
