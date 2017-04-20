import React from "react";
import {
   View,
   ListView,
} from "react-native";

export default class ListViewHelper {
   constructor(items, itemType, ref) {
      this.setItems(items);
      this.setItemType(itemType);
      
      this.ref = ref;
      
      this.dataSource = new ListView.DataSource({
         rowHasChanged() {
            return false;
         }
      });
   }
   
   setItems(items) {
      this.items = items;
   }
   
   setItemType(itemType) {
      this.itemType = itemType;
   }
   
   setOnPress(onPress) {
      this.onPress = onPress;
   }
   
   setOnLongPress(onLongPress) {
      this.onLongPress = onLongPress;
   }
   
   setStyle(style) {
      this.style = style;
   }
   
   setPageSize(pageSize) {
      this.pageSize = pageSize;
   }
   
   setSeparatorStyle(separatorStyle) {
      this.separatorStyle = separatorStyle;
   }
   
   createListView() {
      return <ListView
         ref={this.ref}
         pageSize={this.pageSize}
         style={this.style}
         dataSource={this.dataSource.cloneWithRows(this.items)}
         renderRow={data => React.createElement(this.itemType, {
            data,
            onPress: this.onPress,
            onLongPress: this.onLongPress
         })}
         renderSeparator={(sectionId, rowId) => rowId == this.items.length - 1 ?
            null : <View key={`${sectionId.toString()}_${rowId.toString()}`}
               style={this.separatorStyle} />} />
   }
};
