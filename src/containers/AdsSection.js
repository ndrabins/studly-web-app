import React, { Component } from 'react';

const styles = {
  container: {
    border: "2px solid black",
    maxWidth: 300,
    minWidth: 300,
    flex:1,
    display:"flex"
  }
}

class AdsSection extends Component {
  render() {
    return (
      <div style={styles.container}>
        ads
      </div>
    );
  }
}

export default AdsSection;
