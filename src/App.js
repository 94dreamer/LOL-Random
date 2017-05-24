import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import CanvasBg from './components/CanvasBg';

class App extends Component {

  random = () => {
    //数组乱序
    /*function shuffle(arr) {
      var res = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        var j = Math.floor(Math.random() * arr.length);
        res[i] = arr[j];
        arr.splice(j, 1);
      }
      return res;
    }*/
  };

  render() {
    return (
      <div className="App">
        <CanvasBg />
        <div id="big-box">
          <Card />
        </div>
        <div>
          <select id="select-name"></select>
          <p id="random">随机</p>
          <p id="reset">重置</p>
        </div>
      </div>
    );
  }
}

export default App;
