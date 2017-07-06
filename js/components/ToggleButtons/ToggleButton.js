import React from "react";
import { TouchableOpacity } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";

@autobind
export default class ToggleButton extends React.Component {
   render() {
      const isCurrent = this.props.index == this.props.parent.currentIndex;
      
      return <TouchableOpacity
         style={this._getContainerStyle(isCurrent)}
         onPress={this.props.parent.onPress.bind(null, this.props.index)}
         activeOpacity={styles.activeOpacity}
         disabled={isCurrent}>
         {this._renderButton(isCurrent)}
      </TouchableOpacity>;
   }
}
