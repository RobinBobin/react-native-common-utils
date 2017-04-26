import Preference from "./Preference";

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
         
         for (let weightIndex = 0; weightIndex < rawArray.
            length / this.fieldsPerLine; weightIndex++)
         {
            const index = weightIndex * this.fieldsPerLine;
            
            array.push([]);
            
            for (let i = 0; i < this.fieldsPerLine; i++) {
               array[array.length - 1].push(Number(rawArray[index + i]));
            }
         }
      }
      
      return array;
   }
}
