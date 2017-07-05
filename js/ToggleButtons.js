import React from "react";
import {
   View,
   Text,
   TouchableOpacity
} from "react-native";
import { autobind } from "core-decorators";
import { styles } from "./styles";
import AlterStyles from "./AlterStyles";
import DottedStringObject from "./DottedStringObject";


/**
 * ToggleButton.
 */
@autobind
class ToggleButton extends React.Component {
   static defaultProps = {
      styles: {}
   };
   
   constructor(props) {
      super(props);
      
      const buttonTypeStyle = styles.toggleButtons[`$${this.props.type}`];
      
      this.styles = AlterStyles.combineStyles(
         this.props.styles, [
            [buttonTypeStyle.container, `${this.props.type}.container`],
            [buttonTypeStyle.label, `${this.props.type}.label`]
         ]);
      
      this.styles.activeColors = DottedStringObject.getProperties(
         this.props.styles.activeColors, styles.toggleButtons.$activeColors);
      
      if (this.props.parent.props.fullWidth) {
         this.styles[this.props.type].container = new AlterStyles(
            this.styles[this.props.type].container)
            .addProperty("flex", true, 1)
            .build();
      }
   }
   
   render() {
      const isCurrent = this.props.index == this.props.parent.currentIndex;
      
      return <TouchableOpacity
         style={new AlterStyles(this.styles[this.props.type].container)
            .addProperty("backgroundColor", isCurrent,
               this.styles.activeColors.background)
            .build()}
         onPress={this.props.parent.onPress.bind(null, this.props.index)}
         activeOpacity={styles.activeOpacity}
         disabled={isCurrent}>
         <Text style={new AlterStyles(this.styles[this.props.type].label)
            .addProperty("color", isCurrent, this.styles.activeColors.label)
            .build()}>{this.props.value}</Text>
      </TouchableOpacity>;
   }
}


/**
 * ToggleButtons.
 */
@autobind
export default class ToggleButtons extends React.Component {
   constructor(props) {
      super(props);
      
      this.styles = AlterStyles.combineStyles(this.props.styles,
         [[styles.toggleButtons._container, "container"]]);
      
      this.currentIndex = this.props.initialIndex | 0;
   }
   
   onPress(index) {
      this.currentIndex = index;
      this.forceUpdate();
      
      if (this.props.onPress) {
         this.props.onPress(index);
      }
   }
   
   render() {
      return <View style={this.styles.container}>
         {this.props.buttons.map((button, index) => React.createElement(
            button.component || ToggleButton, {
               ...button,
               index,
               key: index,
               parent: this,
               type: `${button.type}Button`
            }))}
      </View>
   }
}
