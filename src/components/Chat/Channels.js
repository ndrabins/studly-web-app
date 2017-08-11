import React, { Component } from "react";
import Map from "lodash/map";

import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { transparent } from "material-ui/styles/colors";

import CreateChannel from "./CreateChannel";

const styles = {
  channelDiv: {
    display: "flex",
    // flex: 1,
    width:"270px",
    backgroundColor: "#3F3F3F",
    flexDirection: "column",
    padding: "15px",
    color: "#EEEEEE"
  },
  header: {
    marginLeft: "10px",
    fontSize: "18px",
    marginTop: "10px",
  },
  channelHeader:{
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between"
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
        <div style={styles.channelHeader}>
          <h3 style={styles.header}> Channels </h3>
          <CreateChannel />
        </div>
        <List>
          {this.renderChannels()}
        </List>


        {/* <h3 style={styles.header}> Direct Messages </h3> */}
      </div>
    );
  }
}

export default Channels;
