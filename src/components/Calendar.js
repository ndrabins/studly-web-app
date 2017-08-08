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
    // console.log(event);
    var backgroundColor = event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
    };
    return {
        style: style
    };
  }

  render() {
    return (
      <BigCalendar
        style={{height: '100%'}}
        selectable
        events={this.props.events}
        step={120}
        timeslots={1}
        startAccessor="dueDate"
        endAccessor="endDate"
        defaultView="week"
        scrollToTime={new Date()}
        onSelectEvent={event => alert(event.title)}
        eventPropGetter={(this.eventStyleGetter)}
      />
    );
  }
}

export default MyCalendar;
