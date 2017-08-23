import React, { Component } from 'react';

const styles = {
  members: {
    display: "flex",
    flex: 1,
    backgroundColor: "#3F3F3F",
    flexDirection:"column",
    padding: "15px",
    color: "#EEEEEE",
  },
  header: {
    marginLeft:"10px"
  },
  member: {
    marginLeft:"30px"
  }
};

class ChannelMembers extends Component {
  render() {
    return (
      <div style={styles.members}>
        <h4 style={styles.header}>Channel Members</h4>
        <p style={styles.member}>Andy </p>
        <p style={styles.member}>Noah </p>
        <p style={styles.member}>Danny </p>
      </div>
    );
  }
}

export default ChannelMembers;
