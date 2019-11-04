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
  { key: 'QWER' }, { key: 'TYUI' }, { key: 'OP' }, { key: 'AS' }, { key: 'DFG' }, { key: 'HJKL' }, 
  { key: 'ZXC' }, { key: 'VB' }, { key: 'NM' },
]


/*
 * Adapted from snack.expo.io@spencercarli/react-native-flatlist-grid
*/
const formatData = (data, numCol) => {
  return data
};


const numCol = 3;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      blockList: [],
    };
  }

  renderWords = (words) => {
    let str = "";
    words.map( (word, idx) => {
      str = str + " " + word;
    });

    return str;
  };


  render() {
    const data = blocks;
    const wordList = this.state.wordList;
    return (
      <View>
        {/*<FlatList 
           data={formatData(blocks, numCol)}
           style={styles.container}
           renderItem={this.renderItem}
           numColumns={numCol}
        />*/}
        {/* Blocks 1-3 */}
        <View style={styles.item1} >
          <Text style={styles.itemText}> {data[0].key}</Text>
        </View>
        <View style={styles.item2} >
          <Text style={styles.itemText}> {data[1].key} </Text>
        </View>
        <View style={styles.item3} >
          <Text style={styles.itemText}> {data[2].key} </Text>
        </View>

        {/* Blocks 4-6 */}
        <View style={styles.item4} >
          <Text style={styles.itemText}> {data[3].key}</Text>
        </View>
        <View style={styles.item5} >
          <Text style={styles.itemText}> {data[4].key} </Text>
        </View>
        <View style={styles.item6} >
          <Text style={styles.itemText}> {data[5].key} </Text>
        </View>
        
        {/* Blocks 7-9 */}
        <View style={styles.item7} >
          <Text style={styles.itemText}> {data[6].key}</Text>
        </View>
        <View style={styles.item8} >
          <Text style={styles.itemText}> {data[7].key} </Text>
        </View>
        <View style={styles.item9} >
          <Text style={styles.itemText}> {data[8].key} </Text>
        </View>

        {/* Space */}
        <View style={styles.space} >
          <Text style={styles.itemText}> SPACE </Text>
        </View>

        {/* Words */}
        <View style={styles.results} >
          <Text sytle={styles.itemText}> {wordList.length == 0 ? '...' : this.renderWords()} </Text>
        </View>
      </View>
    );
  }
}


const vertOffset = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 33,
  },

  item1: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0 + vertOffset,
    left: 0,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },
  item2: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0 + vertOffset,
    left: Dimensions.get('window').width / numCol,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },
  item3: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0 + vertOffset,
    left: 2 * Dimensions.get('window').width / numCol,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },

  item4: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + Dimensions.get('window').width / numCol + 2,
    left: 0,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },
  item5: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + Dimensions.get('window').width / numCol + 2,
    left: Dimensions.get('window').width / numCol,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },
  item6: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + Dimensions.get('window').width / numCol + 2,
    left: 2 * Dimensions.get('window').width / numCol,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },

  item7: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 2 * Dimensions.get('window').width / numCol + 4,
    left: 0,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },
  item8: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 2 * Dimensions.get('window').width / numCol + 4,
    left: Dimensions.get('window').width / numCol,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },
  item9: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 2 * Dimensions.get('window').width / numCol + 4,
    left: 2 * Dimensions.get('window').width / numCol,
    margin: 1,
    height: Dimensions.get('window').width / numCol,
    width: Dimensions.get('window').width / numCol - 2,
  },

  space: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 3 * Dimensions.get('window').width / numCol + 6,
    left: 0,
    margin: 1,
  },

  results: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 4 * Dimensions.get('window').width / numCol + 8,
    left: 0,
    margin: 3,
  },

  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});