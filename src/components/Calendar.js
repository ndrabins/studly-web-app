import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    title: "Assignment 1",
    dueDate: moment().startOf("day").hour(13).minute(0).toDate(),
    endDate: moment().startOf("day").hour(13).minute(1).toDate(),
    desc: "Stuff stuff stuff"
  },
  {
    title: "Assignment 2",
    dueDate: moment().startOf("day").hour(14).minute(0).toDate(),
    endDate: moment().startOf("day").hour(14).minute(1).toDate(),
    desc: "Stuff stuff stuff"
  },
  {
    title: "Assignment 3",
    dueDate: moment().startOf("day").hour(17).minute(0).toDate(),
    endDate: moment().startOf("day").hour(17).minute(1).toDate(),
    desc: "Stuff stuff stuff"
  },
  {
    title: "Assignment 3",
    dueDate: moment().startOf("day").hour(17).minute(0).toDate(),
    endDate: moment().startOf("day").hour(17).minute(1).toDate(),
    desc: "Stuff stuff stuff"
  },
  {
    title: "Assignment 3",
    dueDate: moment().startOf("day").hour(17).minute(0).toDate(),
    endDate: moment().startOf("day").hour(17).minute(1).toDate(),
    desc: "Stuff stuff stuff"
  }
];

class MyCalendar extends Component {
  componentDidMount() {
    console.log(events);
  }

  render() {
    return (
      <BigCalendar
        selectable
        events={events}
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
