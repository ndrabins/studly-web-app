import React, { Component } from 'react';

const styles = {
  container: {
    margin: "15px",
    height: "90%"
  },
  weekContainer: {
    display: "flex",
    flexDirection: "row",
    height:"90%",
  },
  dayContainer : {
    backgroundColor: "#EEEEEE",
    flex:1,
    height:"100%",
    border:"1px solid black",
    margin:"3px"

  }
}

class DashboardContent extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Welcome to Studly</h1>
        <h4>Here is your schedule for the week</h4>
        <div style={styles.weekContainer }>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
          <div style={styles.dayContainer }></div>
        </div>
      </div>
    );
  }
}

export default DashboardContent;
