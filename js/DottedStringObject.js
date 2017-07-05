export default class DottedStringObject {
   static addProperty(object, fullPropertyName, value) {
      let obj = object;
      
      fullPropertyName.split("\.").forEach((part, index, array) => index == array.
         length - 1 ? obj[part] = value : ((!obj.hasOwnProperty(part) &&
            (obj[part] = {})), obj = obj[part]));
      
      return object;
   }
   
   static getProperty(object, fullPropertyName, defaultValue) {
      let obj = object;
      let value = defaultValue;
      const parts = fullPropertyName.split("\.");
      
      for (let i = 0; i < parts.length; i++) {
         if (!obj) {
            break;
         }
         
         const part = parts[i];
         
         if (i < parts.length - 1) {
            obj = obj[part];
         } else if (obj.hasOwnProperty(part)) {
            value = obj[part];
         }
      }
      
      return value;
   }
   
   static getProperties(object, defaultValues) {
      return Object.keys(defaultValues).map(key => [key, DottedStringObject.
         getProperty(object, key, defaultValues[key])]).reduce((p, c) => {
            p[c[0]] = c[1];
            return p;
         }, {});
   }
}
