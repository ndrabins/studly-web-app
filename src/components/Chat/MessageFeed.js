import React, { Component } from 'react';

import { Scrollbars } from "react-custom-scrollbars";

import MessageEntry from './MessageEntry';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';

import Map from "lodash/map";

const styles = {
  messages: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
  },
  messageFeed: {
    height: "100%",
    backgroundColor: "#ecf0f1",
    overflow: "auto",
  },
  otherUserMessages:{
    display:"flex",
    flexDirection: "row",
    padding: "5px",
  },
  myMessages:{
    display:"flex",
    flexDirection: "row",
    padding: "5px",
    justifyContent:"flex-end",
    marginRight:"10px"
  },
  myMessageContent:{
    borderRadius: "15px",
    padding: "5px",
    display:"flex",
    flexDirection: "Column",
    backgroundColor: "#e67e22",
    width:"50%",
    color:"#FFFFFF"
  },
  otherMessageContent:{
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    padding: "5px",
    display:"flex",
    flexDirection: "Column",
    width:"50%",
  },
  text:{
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  avatar:{
    alignSelf: "center",
    marginRight:"4px"
  }
};

class MessageFeed extends Component {
  renderMessages() {
    let messageList = Map(this.props.messageList, (message, key) => {
      //render differently if it is current users messages
      var diff = moment(message.timestamp).diff(moment(), 'minutes');
      let timestamp = moment().add(diff, 'minutes').calendar();
      // let timestamp = moment(message.timestamp).format('lll');

      if(message.userId === this.props.userId){
        return (
        <div style={styles.myMessages} key={key}>
          <div style={styles.myMessageContent}>
            <h6>{timestamp}</h6>
            <p style={styles.text}>{message.message}</p>
          </div>
          <Avatar
            style={{alignSelf: "center", marginLeft:"4px"}}
            src={message.avatar}
            size={40}
          />
        </div>
        );
      }else {
        return (
          <div style={styles.otherUserMessages} key={key}>
            <Avatar
              style={styles.avatar}
              src={message.avatar}
              size={40}
            />
            <div style={styles.otherMessageContent}>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <h5 style={{fontWeight:"bold" }}>{message.displayName} </h5>
                <h6>{timestamp}</h6>
              </div>
              <p style={styles.text}>{message.message}</p>
            </div>
          </div>
        );
      }
    });
    return messageList;
  }

  componentDidUpdate(){
    this.refs.messageList.scrollToBottom();
  }

  render() {
    return (
      <div style={styles.messages}>
        <div style={styles.messageFeed}>
          <Scrollbars
            ref="messageList"
          >
            {this.renderMessages()}

            {/*this is here just to add some padding after the last message */}
            <div style={{height:"10px"}}> </div>
          </Scrollbars>
        </div>
        <MessageEntry />
      </div>
    );
  }
}

export default MessageFeed;
