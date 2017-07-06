import React from "react";
import { Text } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";
import AlterStyles from "../../AlterStyles";
import ImageToggleButton from "./ImageToggleButton";

@autobind
export default class TextToggleButton extends ImageToggleButton {
   _renderButton(isCurrent) {
      return <Text style={new AlterStyles(this.styles.label)
         .addProperty("color", isCurrent, this.styles.activeColors.label)
         .build()}>{this.props.value}</Text>;
   }
   
   _fillStylesData(stylesData) {
      super._fillStylesData(stylesData);
      
      stylesData.push([styles.toggleButtons.$button.label, "label"]);
   }
}
