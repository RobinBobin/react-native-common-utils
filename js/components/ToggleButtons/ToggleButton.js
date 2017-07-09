import React from "react";
import { TouchableOpacity } from "react-native";
import { autobind } from "core-decorators";
import { styles } from "../../styles";
import AlterStyles from "../../AlterStyles";

@autobind
export default class ToggleButton extends React.Component {
   render() {
      return <TouchableOpacity
         style={new AlterStyles(this.props.style)
            .addProperty("flex", this.props.parent.props.fullWidth, 1)
            .build()}
         onPress={this.props.parent.onPress.bind(null, this.props.index)}
         activeOpacity={styles.activeOpacity}
         disabled={this.props.index == this.props.parent.state.currentIndex}>
         {this.props.children}
      </TouchableOpacity>;
   }
}
