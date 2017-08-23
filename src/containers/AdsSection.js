import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import { Scrollbars } from "react-custom-scrollbars";

const styles = {
  container: {
    maxWidth: 330,
    minWidth: 330,
    flex:1,
    display:"flex",
    alignItems:"center",
    flexDirection: "column",
  },
  adSection: {
    display:"flex",
    alignItems:"center",
    flexDirection: "column",
  }
}



function CreateAd(){
  return {__html: '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=amazonprimestudent&banner=1HGXBVBWYEJGZ4DABA02&f=ifr&lc=pf4&linkID=073ce8c5e6ae21c5c5ce66ad28031d29&t=studlyapp-20&tracking_id=studlyapp-20" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'};
}

function CreateAd2(){
  return {__html:'<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=audible&banner=1KNMQ6Z91A8KDJ552HG2&f=ifr&lc=pf4&linkID=0108a6396e76a175953358c16dfb08de&t=studlyapp-20&tracking_id=studlyapp-20" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'};
}

function CreateAd3(){
  return {__html:'<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=twitchprime&banner=025E4WXKK5G4EXYGDD02&f=ifr&linkID=ad618ef80bd48751572165a6bc8ae563&t=studlyapp-20&tracking_id=studlyapp-20" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'};
}


class AdsSection extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h3>Student Deals </h3>
        <Scrollbars
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <Paper style={styles.adSection} zDepth={1}>
            <div dangerouslySetInnerHTML={CreateAd()} />
            <div style={{ paddingTop:"10px" }}dangerouslySetInnerHTML={CreateAd2()} />
            <div style={{ paddingTop:"10px" }}dangerouslySetInnerHTML={CreateAd3()} />
          </Paper>
        </Scrollbars>
      </div>
    );
  }
}

export default AdsSection;
