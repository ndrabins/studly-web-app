import React, { Component } from "react";
import Map from "lodash/map";
import { Scrollbars } from "react-custom-scrollbars";

import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Subheader from 'material-ui/Subheader';
import { transparent } from "material-ui/styles/colors";

import CreateChannel from "./CreateChannel";

const styles = {
  channelDiv: {
    display: "flex",
    // flex: 1,
    width:"256px",
    backgroundColor: "#3F3F3F",
    flexDirection: "column",
    paddingBottom:"15px",
    paddingTop: "12px",
    color: "#EEEEEE",
    overflow:"auto",
  },
  header: {
    marginLeft: "10px",
    fontSize: "18px",
    marginTop: "10px",
    fontFamily: "Roboto, sans-serif"
  },
  channelHeader:{
    color: "#EEEEEE",
    fontSize: "16px",
    fontFamily: "Roboto, sans-serif",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    paddingRight:"10px",
  },
  channel: {
   color:"#B9BBBE",
   fontSize: 14,
  },
  selectedChannel: {
    color:"#FFFFFF",
    fontSize: 14,
    border: "2px solid",
    borderLeft: "10px solid",
    borderColor: "#1FA186"
  }
};

class Channels extends Component {
  renderChannels() {
    let channelList = Map(this.props.channels, (channel, key) => {

      let renderedStyle = styles.channel;
      if(key===this.props.selectedChannel){
        renderedStyle = styles.selectedChannel;
      }

      return (
        <ListItem
          leftAvatar={
            <Avatar
              color={renderedStyle.color}
              backgroundColor={transparent}
              style={{ left: 8 }}
            >
              #
            </Avatar>
          }

          style={renderedStyle}
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
        <Scrollbars
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <List>
            <Subheader style={styles.channelHeader}>Channels <CreateChannel /></Subheader>
            {this.renderChannels()}
          </List>
        </Scrollbars>
         {/* <div style={styles.channelHeader}>
          <h3 style={styles.header}> Members </h3>
           {this.renderClassMembers()}
          </div>   */}


        {/* <h3 style={styles.header}> Direct Messages </h3> */}
      </div>
    );
  }
}

export default Channels;
