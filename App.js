/**
 * MiniQ Frontend Implementation
 * COSC 189
 * Jeong Tae Bang
 * Sung Jun Park
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions
} from 'react-native';

const blocks = [
  { key: 'B1' }, { key: 'B2' }, { key: 'B3' }, { key: 'B4' }, { key: 'B5' }, { key: 'B6' }, 
  { key: 'B7' }, { key: 'B8' }, { key: 'B9' },
]


/*
 * Adapted from snack.expo.io@spencercarli/react-native-flatlist-grid
*/
const formatData = (data, numCol) => {
  return data
};


const numCol = 3;
export default class App extends React.Component {

  renderItem = ({item, idx}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}> {item.key} </Text>
      </View>
    );
  };


  render() {
    return (
      <FlatList 
        data={formatData(blocks, numCol)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numCol}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 33,
  },
  item: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});