import React, { Component } from "react";
import Map from "lodash/map";

import {List, ListItem} from 'material-ui/List';

const styles = {
  channelDiv: {
    display: "flex",
    flex: 1,
    backgroundColor: "#2c3e50",
    flexDirection: "column",
    padding: "15px",
    color: "#EEEEEE"
  },
  header: {
    marginLeft: "10px"
  },
  channel: {
    marginLeft: "30px"
  }
};

class Channels extends Component {
  renderChannels() {
    let channelList = Map(this.props.channels, (channel, key) => {
      return (
        <ListItem primaryText={channel.name} key={key} onClick={() => this.props.selectChannel(key)} />
      );
    });
    return channelList;
  }

  render() {
    return (
      <div style={styles.channelDiv}>
        <h4 style={styles.header}> Channels </h4>
        <List>
          {this.renderChannels()}
        </List>

        <h4 style={styles.header}> Direct Messages </h4>
      </div>
    );
  }
}

export default Channels;
