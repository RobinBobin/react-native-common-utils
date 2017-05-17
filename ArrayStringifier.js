function setPrefixOrPostfix(obj, prefix, string, addIfArrayLength) {
   obj[prefix ? "prefix" : "postfix"] = {
      string,
      addIfArrayLength
   };
   
   return obj;
}

export default class ArrayStringifier {
   setPrefix(prefix, addIfArrayLength = true) {
      return setPrefixOrPostfix(this, true, prefix, addIfArrayLength);
   }
   
   setPostfix(postfix, addIfArrayLength = true) {
      return setPrefixOrPostfix(this, false, postfix, addIfArrayLength);
   }
   
   process(array, separator, stringifier) {
      let str = this.prefix && (!this.prefix.addIfArrayLength ||
         array.length) ? this.prefix.string : "";
      
      for (let i = 0; i < array.length; i++) {
         const element = array[i];
         
         str += `${stringifier ? stringifier(element) : element}`;
         str += `${i < array.length - 1 ? separator : ""}`;
      }
      
      if (this.postfix && (!this.postfix.addIfArrayLength || array.length)) {
         str += this.postfix.string;
      }
      
      return str;
   }
}
