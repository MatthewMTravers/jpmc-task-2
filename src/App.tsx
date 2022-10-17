import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 * 
 * This is an interface to define properties for 'data' amd 'showGraph' wherever IState may be called in the file
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {

  //Since IState is being extended, 'data' and 'showGraph' must be present and represented
  constructor(props: {}) {
    super(props);

    this.state = {
      
      //Allows data to be collected and represented
      data: [],

      //Initialized to false to have the graph hidden until user clicks the button, has to be boolean
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    
    //If the value of showGraph is false, then don't show the graph
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
      
    //Initialize variables
    let x = 0;
    let timedDelay = 100;
    let maxDelay = 10000;

    //Wrap the method call in the setInterval function 
    const delay = setInterval(() => {
        
      //Check server
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
          
        //Display values for data and graph 
        this.setState({ 
          data: serverResponds,
          showGraph: true,
        });
      });

      //When it has ran for long enough, clear the interval and end the repeating call
      if (x > maxDelay) {
        clearInterval(delay);
      }
    }, timedDelay);
  }


  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
