import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

//import custom css
import "../styles/dashboardCalendar.css";

BigCalendar.momentLocalizer(moment);

//This is the structure events needs to be passed into calendar
// const events = [
//   {
//     title: "Assignment 1",
//     dueDate: moment().startOf("day").hour(13).minute(0).toDate(),
//     endDate: moment().startOf("day").hour(13).minute(1).toDate(),
//     desc: "Stuff stuff stuff"
//   },
// ];



class MyCalendar extends Component {
  eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
    };
    return {
        style: style
    };
  }

  render() {
    // let minimumTime = new Date();
    // minimumTime.setHours(5,0,0,0);

    // let maximumTime = new Date();
    // maximumTime.setHours(24,0,0,0);

    // onSelectEvent={event => alert(event.title)}
    return (
      <BigCalendar
        style={{height: '100%', display:"flex", flex:5, marginRight: 10}}
        events={this.props.events}
        step={120}
        timeslots={1}
        startAccessor="dueDate"
        endAccessor="endDate"
        defaultView="week"
        scrollToTime={new Date()}
        eventPropGetter={(this.eventStyleGetter)}
        popup
      />
    );
  }
}

export default MyCalendar;
