import React from "react";
import { View } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";
import AlterStyles from "../../AlterStyles";

@autobind
export default class ToggleButtons extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
         currentIndex: this.props.initialIndex | 0
      };
   }
   
   onPress(index) {
      this.setState({currentIndex: index});
      
      if (this.props.onPress) {
         this.props.onPress(index);
      }
   }
   
   render() {
      const clone = child => React.cloneElement(
         child, {index: child.key, parent: this});
      
      return <View style={AlterStyles.combine(this.props.styles,
         [[styles.toggleButtons._container, "container"]]).container}>
         {Array.isArray(this.props.children) ? this.props.children.
            map(child => clone(child)) : clone(this.props.children)}
      </View>
   }
}
