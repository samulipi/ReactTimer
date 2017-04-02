var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');


//var Timer = (props) => {
var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      timerStatus: 'paused'
    };
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus) {
        case 'started':
          this.handleStart();
          break;
        case 'stopped':
          this.setState({count: 0, timerStatus: 'stopped'});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  handleStart: function() {
    this.timer = setInterval( () => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      timerStatus: 'started'
    });
  },
  handleStatusChange: function (newStatus) {
    this.setState({timerStatus: newStatus});
  },
  render: function () {
    var {count, timerStatus} = this.state;
    var renderControlArea = () => {
      return <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>;

    };
  return(
    <div>
      <h1 className="text-center">Timer</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}

    </div>
  )
}
});

module.exports = Timer;
