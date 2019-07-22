import { DottedStringObject } from "simple-common-utils";

/**
 * @deprecated Since version 6.0.1. Please use combineStyles() from react-native-common-ui-components/js/styles.js.
 */
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
    * Combines styles from React.Component.props.styles and styles.js.
    * @param {*} styles React.Component.props.styles.
    * @param {*} stylesData array, each element of which is an array:
    * [0] - styles.js object with style properties;
    * [1] - dotted string with a name of a props.styles object.
    * @return An object with combined styles.
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
   
   /**
    * Like combine() but combines everything including standalone variables.
    * @param {*} propsStyles React.Component.props.styles.
    * @param {*} stylesStyle top-level style from styles.js.
    * @return An object with combined styles.
    */
   static combineEx(propsStyles, stylesStyle) {
      const standaloneVars = [];
      const stylesData = [];
      
      Object.keys(stylesStyle).forEach(name => {
         const field = stylesStyle[name];
         
         typeof field == "object" ? undefined : name[0] == "$" ?
            standaloneVars.push(name) : stylesData.push([field, name]);
      });
      
      const result = AlterStyles.combine(propsStyles, stylesData);
      
      standaloneVars.forEach(name => {
         result[name] = stylesStyle[name];
         
         if (propsStyles && propsStyles[name]) {
            result[name] = propsStyles[name];
         }
      });
      
      return result;
   }
}
