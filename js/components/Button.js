import React from "react";
import {
   TouchableOpacity,
   Text
} from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../styles";
import AlterStyles from "../AlterStyles";

@autobind
export default class Button extends React.Component {
   static defaultProps = {
      styles: {}
   };
   
   render() {
      const stls = {
         container: this.props.styles.container || styles.button.container,
         text: this.props.styles.text || styles.button.text
      };
      
      return <TouchableOpacity
         onPress={this.props.onPress || (() => alert(this.props.text))}
         disabled={this.props.disabled}
         activeOpacity={styles.activeOpacity}
         style={new AlterStyles(stls.container)
            .addProperty("backgroundColor", this.props.
               disabled, styles.textColorDisabled)
            .build()}>
         <Text style={stls.text}>{this.props.text}</Text>
      </TouchableOpacity>;
   }
}
