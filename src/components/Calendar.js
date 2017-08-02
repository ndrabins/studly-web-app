import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

  render() {
    return (
      <BigCalendar
        selectable
        events={this.props.events}
        step={60}
        timeslots={1}
        startAccessor="dueDate"
        endAccessor="endDate"
        defaultView="week"
        onSelectEvent={event => alert(event.title)}
      />
    );
  }
}

export default MyCalendar;
