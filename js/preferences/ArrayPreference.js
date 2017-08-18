import Preference from "./Preference";

//
// TODO dimensions.
// TODO variable element length for multidimensional arrays.
//
export default class ArrayPreference extends Preference {
   getFieldsPerLine() {
      return this.fieldsPerLine;
   }
   
   setFieldsPerLine(fieldsPerLine) {
      this.fieldsPerLine = fieldsPerLine;
   }
   
   getValue() {
      const value = super.getValue();
      const array = Array.isArray(value) ? value : [];
      
      if (!array.length) {
         const rawArray = value.split(",");
         
         for (let rawIndex = 0; rawIndex < rawArray.
            length / this.fieldsPerLine; rawIndex++)
         {
            const index = rawIndex * this.fieldsPerLine;
            
            array.push([]);
            
            for (let i = 0; i < this.fieldsPerLine; i++) {
               array[array.length - 1].push(Number(rawArray[index + i]));
            }
         }
      }
      
      this.value = array;
      
      return array;
   }
}
