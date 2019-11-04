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
  Dimensions,
} from 'react-native';

const blocks = [
  { key: 'QWE' }, { key: 'RTYU' }, { key: 'IOP' }, 
  { key: 'AS' }, { key: 'DFGH' }, { key: 'JKL' }, 
  { key: 'ZXC' }, { key: 'VB' }, { key: 'NM' },
]

/* constants */
const vertOffset = 20;
const numCol = 3;
const spaceH = 50;
const THRESH = 500;
const h = Dimensions.get('window').width / 2 / numCol;
var coords = [];
const MINIQURL = "https://swipemini.herokuapp.com/miniq";
const T9URL = "https://swipemini.herokuapp.com/t9";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      output: "",
    };

    this.recordMove = this.recordMove.bind(this);
    this.getInterpret = this.getInterpret.bind(this);
  }

  determineBlockIdx = (x, y) => {
    if (x < 0 || y < 0) {
      console.log("Can't process negative coordinates");
      return;
    }
    const xx = Math.floor(x / h);
    const yy = Math.floor((y - vertOffset) / h );

    var bCode = -1;

    switch (yy) {
      case 0:
        if (xx === 0) {
          bCode = 1;
          // console.log("Block 1");
        }
        if (xx === 1) {
          bCode = 2;
          // console.log("Block 2");
        }
        if (xx === 2) {
          bCode = 3;
          // console.log("Block 3");
        }
        break;
      case 1:
        if (xx === 0) {
          bCode = 4;
          // console.log("Block 4");
        }
        if (xx === 1) {
          bCode = 5;
          // console.log("Block 5");
        }
        if (xx === 2) {
          bCode = 6;
          // console.log("Block 6");
        }
        break;
      case 2:
        if (xx === 0) {
          bCode = 7;
          // console.log("Block 7");
        }
        if (xx === 1) {
          bCode = 8;
          // console.log("Block 8");
        }
        if (xx === 2) {
          bCode = 9;
          // console.log("Block 9");
        }
        break;   
      default:
        if (yy === 3 && y < vertOffset + 3*h + spaceH + 1) {
          bCode = 10;
          // console.log("Space");
        }
        break;
    }
    return bCode;
  };

  recordMove = (evt) => {
    const x = evt.nativeEvent.pageX;
    const y = evt.nativeEvent.pageY;
    const t = evt.nativeEvent.timestamp;

    const blockIdx = this.determineBlockIdx(x, y);
    if (blockIdx !== -1) {
      const pt = [blockIdx, t];
      coords.push(pt);
    }
  };

  getInterpret = (evt) => {
    // console.log(coords);
    // console.log("End Sequence");

    if (coords.length > 0) {
      var sanitized = [];
      var bCode = coords[0][0];
      var startT = coords[0][1];
      sanitized.push(bCode);

      coords.map( (val, idx) => {
        const currB = val[0];
        const currT = val[1];

        // momemnt of transition
        if (currB != bCode) {
          const duration = currT - startT;
          if (duration >= THRESH) {
            // console.log(`${currB}: ${currT} - ${startT}`);
            sanitized.push(bCode);
          }
          startT = currT;
          bCode = currB;
        }
      });
      
      const dataLen = coords.length;
      const sLen= sanitized.length;
      if (sanitized[sLen - 1] !== coords[dataLen - 1][0]) {
        sanitized.push(coords[dataLen - 1][0]);    // always include first and last block Code, if appropriate
      }
      if (sLen > 1 && sanitized[0] === sanitized[1]) {
        sanitized.shift();
      }

      console.log(sanitized);
      this.getWordsFromFlask(sanitized);
    }

    coords = [];
  };

  getWordsFromFlask(arr) {
    return fetch(MINIQURL, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      blocks: arr,
                  }),
                })
            .then((response) => {
              // console.log(response);
              return response.json()
            })
              .then((responseJson) => {
                console.log(responseJson);
                const flag = responseJson['is_sentence'];
                if (flag) {
                  this.setState({
                    output: responseJson['words'][0],
                  });
                } else {
                  this.setState({
                    wordList: responseJson['words'],
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                return null
              })
            .catch((err) => {
              console.log(err);
              return null;
            });
  }


  selectionHandler = (word, oldOut) => {
    const newOutput = oldOut + ' ' + word;
    this.setState({
      wordList: [],
      output: newOutput,
    });
  }


  render() {
    const data = blocks;
    const wordList = this.state.wordList;
    const output = this.state.output;
    return (
      <>
        <View
          onStartShouldSetResponder={(evt) => true}
          onMoveShouldSetResponder={(evt) => true}
          onResponderTerminationRequest={(evt) => true}
          onResponderGrant={(evt) => { console.log("Start Sequence"); }}
          onResponderTerminate={(evt) => { console.log("Responder terminated")}}
          onResponderMove={this.recordMove}
          onResponderRelease={this.getInterpret}
        >
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
        </View>

        <View>
          {/* Words  Selection*/}
          <View style={styles.selection1} >
            <Text
              style={styles.itemText}
              onPress={() => this.selectionHandler(wordList[0], output)}
            > {wordList.length === 0 ? '' : wordList[0]} </Text>
          </View>
          <View style={styles.selection2} >
            <Text sytle={styles.itemText}
              onPress={() => this.selectionHandler(wordList[1], output)}
            > {wordList.length <= 1 ? '' : wordList[1]} </Text>
          </View>
          <View style={styles.selection3} >
            <Text
              style={styles.itemText}
              onPress={() => this.selectionHandler(wordList[2], output)}
            > {wordList.length <= 2 ? '' : wordList[2]} </Text>
          </View>
        </View>

        <View>
          {/* Final Output*/}
          <View style={styles.output} >
            <Text sytle={styles.itemText}> {wordList === '' ? '' : output} </Text>
          </View>
        </View>
      </>
    );
  }
}


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
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },
  item2: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0 + vertOffset,
    left: h,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },
  item3: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0 + vertOffset,
    left: 2 * h,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },

  item4: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + h,
    left: 0,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },
  item5: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + h,
    left: h,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },
  item6: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + h,
    left: 2 * h,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },

  item7: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 2 * h,
    left: 0,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },
  item8: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 2 * h,
    left: h,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },
  item9: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 2 * h,
    left: 2 * h,
    borderColor: 'white',
    borderWidth: 1,
    height: h,
    width: h,
  },

  space: {
    width: Dimensions.get('window').width / 2,
    height: spaceH,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 3 * h,
    left: 0,
    marginVertical: 1,
  },

  selection1: {
    width:h,
    height: 50,
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 4 * h,
    left: 0,
    margin: 3,
  },
  selection2: {
    width:h,
    height: 50,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 4 * h,
    left: 0 + h,
    margin: 3,
  },
  selection3: {
    width:h,
    height: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 4 * h,
    left: 0 + 2*h,
    margin: 3,
  },

  output: {
    width: Dimensions.get('window').width / 2,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: vertOffset + 5 * h,
    left: 0,
    marginVertical: 10,
    marginLeft: 3,
  },

  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'white',
  },
});