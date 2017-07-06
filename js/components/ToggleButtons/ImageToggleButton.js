import React from "react";
import { Image } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";
import AlterStyles from "../../AlterStyles";
import DottedStringObject from "../../DottedStringObject";
import ToggleButton from "./ToggleButton";

@autobind
export default class ImageToggleButton extends ToggleButton {
   static defaultProps = {
      styles: {}
   };
   
   componentWillMount() {
      const stylesData = [];
      
      this._fillStylesData(stylesData);
      
      this.styles = AlterStyles.combineStyles(this.props.styles, stylesData);
      
      this.styles.activeColors = DottedStringObject.getProperties(
         this.props.styles.activeColors, styles.toggleButtons.$activeColors);
      
      if (this.props.parent.props.fullWidth) {
         this.styles.container = new AlterStyles(this.styles.container)
            .addProperty("flex", true, 1)
            .build();
      }
   }
   
   _getContainerStyle(isCurrent) {
      return new AlterStyles(this.styles.container)
         .addProperty("backgroundColor", isCurrent,
            this.styles.activeColors.background)
         .build();
   }
   
   _renderButton() {
      return <Image source={this.props.value} />;
   }
   
   _fillStylesData(stylesData) {
      stylesData.push([styles.toggleButtons.$button.container, "container"]);
   }
}
