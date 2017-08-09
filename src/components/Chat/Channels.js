import React, { Component } from "react";
import Map from "lodash/map";

import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { transparent } from "material-ui/styles/colors";

const styles = {
  channelDiv: {
    display: "flex",
    // flex: 1,
    width:"270px",
    backgroundColor: "#476264",
    flexDirection: "column",
    padding: "15px",
    color: "#EEEEEE"
  },
  header: {
    marginLeft: "10px"
  },
  channel: {
   color:"#FFFFFF"
  }
};

class Channels extends Component {
  renderChannels() {
    let channelList = Map(this.props.channels, (channel, key) => {
      return (
        <ListItem
          leftAvatar={
            <Avatar
              color={"#FFFFFF"}
              backgroundColor={transparent}
              style={{ left: 8 }}
            >
              #
            </Avatar>
          }
          style={styles.channel}
          innerDivStyle={{paddingLeft: 40}}
          primaryText={channel.name}
          key={key}
          onClick={() => this.props.selectChannel(key)}
        />
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
