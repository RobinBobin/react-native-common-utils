function setPrefixOrPostfix(obj, prefix, string, addIfArrayLength) {
   obj[prefix ? "prefix" : "postfix"] = {
      string,
      addIfArrayLength
   };
   
   return obj;
}

export default class ArrayStringifier {
   constructor(array) {
      this.array = array;
      
      this.setSeparator(", ");
   }
   
   setPrefix(prefix, addIfArrayLength = true) {
      return setPrefixOrPostfix(this, true, prefix, addIfArrayLength);
   }
   
   setSeparator(separator) {
      this.separator = separator;
      
      return this;
   }
   
   setElementProcessor(elementProcessor) {
      this.elementProcessor = elementProcessor;
      
      return this;
   }
   
   setPostfix(postfix, addIfArrayLength = true) {
      return setPrefixOrPostfix(this, false, postfix, addIfArrayLength);
   }
   
   process() {
      let str = this.prefix && (!this.prefix.addIfArrayLength ||
         this.array.length) ? this.prefix.string : "";
      
      for (let i = 0; i < this.array.length; i++) {
         const rawElement = this.elementProcessor ? this.
            elementProcessor(this.array[i]) : this.array[i];
         
         const element = rawElement.hasOwnProperty("getElement") ?
            rawElement.getElement() : rawElement;
         
         const separator = i == this.array.length - 1 ? "" : element ==
            rawElement ? this.separator : rawElement.getSeparator();
         
         str += `${element}${separator}`;
      }
      
      if (this.postfix && (!this.postfix.addIfArrayLength || this.array.length)) {
         str += this.postfix.string;
      }
      
      return str;
   }
}
