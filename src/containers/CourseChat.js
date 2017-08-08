import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import ChannelMembers from '../components/Chat/ChannelMembers';
import Channels from '../components/Chat/Channels';
import MessageFeed from '../components/Chat/MessageFeed';


//TODO
//Split up each of these into separate components

const styles = {
  chatRoom: {
    display: "flex",
    flexDirection: "row",
    height: "100%"
  },
};

class CourseChat extends Component {
   constructor() {
    super();

    this.selectChannel = this.selectChannel.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchCourseChannels(this.props.selectedCourse);
    // this.props.actions.fetchChannelMessages(this.props.selectedCourse);
    // this.props.actions.fetchChannelMembers()
  }

  selectChannel = (channelID) => {
    this.props.actions.selectChannel(channelID);
  }

  render() {
    return (
      <div style={styles.chatRoom}>
        <Channels channels={this.props.channels} selectChannel={this.selectChannel}/>
        <MessageFeed selectedChannel={this.props.selectedChannel} messageList={this.props.messages} />
        <ChannelMembers />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    selectedCourse: state.courses.selectedCourse,
    channels: state.chat.channels,
    selectedChannel: state.chat.selectedChannel,
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseChat);
