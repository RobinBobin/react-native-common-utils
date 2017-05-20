export default class AlterStyles {
   constructor(...styles) {
      this.styles = styles;
      this.data = [];
   }
   
   addProperty(name, conditionToUseValue2, value2) {
      this.data.push({
         name,
         conditionToUseValue2,
         value2
      });
      
      return this;
   }
   
   build() {
      const retval = [];
      
      for (style of this.styles) {
         const oneStyle = [style];
         
         for (data of this.data) {
            if (data.conditionToUseValue2) {
               oneStyle.push({[data.name]: data.value2});
            }
         }
         
         retval.push(oneStyle);
      }
      
      return retval;
   }
}
