import DottedStringObject from "./DottedStringObject";

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
   
   /**
    * Combine styles from styles.js and React.Component.props.styles.
    * @param {*} styles React.Component.props.styles.
    * @param {*} stylesData array, each element of which is an array:
    * [0] - styles.js object with style properties;
    * [1] - dotted string with a name of a props.styles object.
    */
   static combine(styles, stylesData) {
      return stylesData.map(data => {
         const resultingStyle = new AlterStyles(data[0]);
         const styleObject = DottedStringObject.getProperty(styles, data[1], {});
         
         Object.keys(styleObject).forEach(stylePropertyName =>
            resultingStyle.addProperty(
               stylePropertyName,
               true,
               styleObject[stylePropertyName]));
         
         return [data[1], resultingStyle.build()];
      }).reduce((p, c) => {
         return DottedStringObject.setProperty(p, c[0], c[1]);
      }, {});
   }
}
