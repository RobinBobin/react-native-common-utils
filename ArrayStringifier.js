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
   
   process(array, separator, elementProcessor) {
      let str = this.prefix && (!this.prefix.addIfArrayLength ||
         array.length) ? this.prefix.string : "";
      
      for (let i = 0; i < array.length; i++) {
         str += (elementProcessor ? elementProcessor(
            array[i]) : array[i]).toString();
         
         str += `${i < array.length - 1 ? separator : ""}`;
      }
      
      if (this.postfix && (!this.postfix.addIfArrayLength || array.length)) {
         str += this.postfix.string;
      }
      
      return str;
   }
}
