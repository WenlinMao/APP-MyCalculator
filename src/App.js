/**
 * Time: Feb 13, 2018
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  TextInput
} from 'react-native';

import InputButton from './InputButton';
import Style from './Style';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+'],
  ['c', 'ce']
];

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.initialState = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null
    };

    this.state = this.initialState;
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this.renderButton()}
        </View>
      </View>

    );
  }


  renderButton() {
    
    let views = inputButtons.map( (row, idx) => {
      let inputRow = row.map( (buttonVal, columnIdx) => {
          return <InputButton 
                    value={buttonVal} 
                    onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                    key={'butt-' + columnIdx}/>;
      });

      return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>;
    });
    return views;
  }

  onInputButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this.handleNumberInput(input);
      default:
        return this.handleStringInput(input);
    }
  }

  handleNumberInput(num){

    // append 10 to each input
    let inputValue = (this.state.inputValue * 10) + num;

    this.setState({
      inputValue: inputValue
    });
  }

  handleStringInput(str){
    switch(str){
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;

        if (!symbol){
          return;
        }

        // eval will take every string and evaluate, do not use it 
        // directly to input
        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;

      case 'ce':
        this.setState(this.initialState);
        break;

      case 'c':
        this.setState({inputValue: 0});
        break;

      // case '.':
      //   // append 10 to each input

    }
  } 

}
