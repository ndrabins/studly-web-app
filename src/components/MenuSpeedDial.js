import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  SpeedDial,
  BubbleList,
  BubbleListItem
} from "../../node_modules/react-speed-dial";

import Avatar from "material-ui/Avatar";
import IconEdit from "material-ui/svg-icons/image/edit";
import IconJoin from "material-ui/svg-icons/social/person-add";
import IconSend from "material-ui/svg-icons/content/send";

import InvitePeople from "./InvitePeople";

const styles = {
  MenuSpeedDial: {
    // height:"100%",
  }
};

class MenuSpeedDial extends Component {
  constructor(props) {
    super(props);
    this.onCreateCourse = this.onCreateCourse.bind(this);
    this.openInviteDialog = this.openInviteDialog.bind(this);
    this.closeInviteDialog = this.closeInviteDialog.bind(this);

    this.state = {
      dialogStatus: false,
      list: [
        {
          primaryText: "Create Course",
          leftAvatar: (
            <Avatar
              backgroundColor={"#e67e22"}
              icon={<IconEdit />}
              style={{ marginRight: "10px" }}
            />
          )
        },
        {
          primaryText: "Join Course",
          leftAvatar: (
            <Avatar
              backgroundColor={"#e67e22"}
              icon={<IconJoin />}
              style={{ marginRight: "10px" }}
            />
          )
        },
        {
          primaryText: "Invite",
          leftAvatar: (
            <Avatar
              backgroundColor={"#e67e22"}
              icon={<IconSend />}
              style={{ marginRight: "10px" }}
            />
          )
        }
      ]
    };
  }

  // style={{width:"70%"}}
  onCreateCourse() {
    this.props.history.push(`/newCourse`);
  }

  openInviteDialog() {
    console.log("inviting");
    this.setState({ dialogStatus: true });
  }

  closeInviteDialog() {
    console.log("closing");
    this.setState({ dialogStatus: false });
  }

  render() {
    return (
      <div style={styles.MenuSpeedDial}>
        <SpeedDial
          hasBackdrop={false}
          style={{ width: "68%" }}
          floatingActionButtonProps={{ backgroundColor: "#e67e22" }}
        >
          <BubbleList className="bubbleList">
            <BubbleListItem
              key={1}
              {...this.state.list[0]}
              onClick={this.onCreateCourse}
            />
            <BubbleListItem
              key={2}
              {...this.state.list[1]}
              onClick={this.onCreateCourse}
            />
            <BubbleListItem
              key={3}
              {...this.state.list[2]}
              onClick={this.openInviteDialog}
            />
          </BubbleList>
        </SpeedDial>
        <InvitePeople
          courses={this.props.courses}
          dialogStatus={this.state.dialogStatus}
          closeInviteDialog={this.closeInviteDialog}
          openInviteDialog={this.openInviteDialog}
        />
      </div>
    );
  }
}

// export default MenuSpeedDial;
export default withRouter(MenuSpeedDial);
