import React, { Component } from 'react';

import { Scrollbars } from "react-custom-scrollbars";

import MessageEntry from './MessageEntry';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';

import Map from "lodash/map";

const styles = {
  messages: {
    display: "flex",
    flex: 5,
    flexDirection: "column",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  },
  messageFeed: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    overflow: "auto",
  },
  userMessages:{
    display:"flex",
    width:"97%",
    flexDirection: "row",
    paddingLeft: "5px",
  },
  messageContent:{
    width:"95%",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    paddingLeft: "5px",
    display:"flex",
    flexDirection: "Column",
  },
  samePreviousMessageContent:{
    marginLeft: "69px",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    display:"flex",
    flexDirection: "Column",
  },
  text:{
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    paddingLeft: "5px",
    marginBottom: "3px",
  },
  avatar:{
    marginTop:"9px",
    marginRight:"4px",
    marginLeft:"15px"
  }
};

class MessageFeed extends Component {
  renderMessages() {
    var lastUser = null;
    var previousTimeStamp = null;
    var enoughTimeHasPassed = false;

    let messageList = Map(this.props.messageList, (message, key) => {
      let diff = moment(message.timestamp).diff(moment(), 'minutes');
      let timestamp = moment().add(diff, 'minutes').calendar();

      //don't render avatar,time,name unless 5 minutes have passed.
      if (previousTimeStamp !== null){
        let recentDiff = moment(message.timestamp).diff(previousTimeStamp, 'minutes');
        if(recentDiff < 5){
          enoughTimeHasPassed = true;
        }else{
          enoughTimeHasPassed=false;
        }
      }
      //render differently if last message is by the same user AND within 5 minutes
      if(lastUser === message.userId && enoughTimeHasPassed){
        return (
          <div key={key} style={styles.samePreviousMessageContent}>
            <p style={styles.text}>{message.message}</p>
          </div>
        );
      }

      lastUser = message.userId;
      previousTimeStamp = message.timestamp;

      return (
        <div style={styles.userMessages} key={key}>
          <Avatar
            style={styles.avatar}
            src={message.avatar}
            size={40}
          />
          <div style={styles.messageContent}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
              <h5 style={{fontWeight:"bold", paddingLeft:"5px", marginBottom:"3px" }}>{message.displayName} </h5>
              <h6 style={{marginLeft:"3px", color:"#767778", marginBottom:"3px"}}>{timestamp}</h6>
            </div>
            <p style={styles.text}>{message.message}</p>
          </div>
        </div>
      );
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
