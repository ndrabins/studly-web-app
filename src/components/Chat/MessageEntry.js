import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";


import TextField from "material-ui/TextField";

const styles = {
  messageEntry: {
    alignSelf: "flex-end",
    margin: "3px"
  }
};

class MessageEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  sendMessage = () => {
    this.props.actions.createMessage(this.state.value, this.props.selectedChannel)

    this.setState({
      value:'',
    });
  }

  render() {
    return (
      <div>
        <TextField
          disabled={this.props.selectedChannel===null}
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.messageEntry}
          floatingLabelText="Enter Message"
          floatingLabelFixed={true}
          multiLine={true}
          rows={1}
          rowsMax={4}
          fullWidth={true}
          onKeyPress={ev => {
            if (ev.key === "Enter" && !ev.shiftKey) {
              this.sendMessage();
              ev.preventDefault();
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageEntry);
