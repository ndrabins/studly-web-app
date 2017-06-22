import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
// import MobileTearSheet from "../../../MobileTearSheet";

import RaisedButton from "material-ui/RaisedButton";
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from "material-ui/List";
import Dialog from 'material-ui/Dialog';

import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ContentSend from "material-ui/svg-icons/content/send";

import CreateClassButton from "./CreateClassButton";


export default class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.open };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleNestedListToggle = item => {
    this.setState({
      open: item.state.open
    });
  };

  render() {
    return (
      <div>
        <Drawer
          open={this.state.open}
          docked={true}
          containerStyle={{ height: "calc(100% - 64px)", top: 64 }}
        >

          <div>
            <List>
              <Subheader>Courses</Subheader>
              <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
              <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
              <ListItem
                primaryText="Inbox"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={1}
                    primaryText="Starred"
                    leftIcon={<ActionGrade />}
                  />,
                  <ListItem
                    key={2}
                    primaryText="Sent Mail"
                    leftIcon={<ContentSend />}
                  />
                ]}
              />
            </List>
          </div>

          <CreateClassButton />

        </Drawer>
      </div>
    );
  }
}
