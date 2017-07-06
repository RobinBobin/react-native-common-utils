import React from "react";
import { View } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";
import AlterStyles from "../../AlterStyles";

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
            button.component, {
               ...button,
               index,
               key: index,
               parent: this
            }))}
      </View>
   }
}
