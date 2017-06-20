import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.open };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <Drawer
          open={this.state.open}
          docked={true}
          containerStyle={{ height: "calc(100% - 64px)", top: 64 }}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
