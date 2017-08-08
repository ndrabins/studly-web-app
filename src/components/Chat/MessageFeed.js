import React, { Component } from 'react';


import MessageEntry from './MessageEntry';
import {List, ListItem} from 'material-ui/List';

import Map from "lodash/map";

const styles = {
  messages: {
    display: "flex",
    flex: 3,
    backgroundColor: "#FFFFFF",
    padding: "5px",
    flexDirection: "column"
  },
  messageFeed: {
    display: "flex",
    height: "100%",
    backgroundColor: "#767778"
  },
};

class MessageFeed extends Component {
  renderMessages() {
    console.log(this.props.messageList);
    let messageList = Map(this.props.messageList, (message, key) => {
      return (
        <ListItem primaryText={message.message} key={key} />
      );
    });
    return messageList;
  }

  render() {
    return (
      <div style={styles.messages}>
        <div style={styles.messageFeed} />
        <List>
          {this.renderMessages()}
        </List>
        <MessageEntry />
        </div>
    );
  }
}

export default MessageFeed;
