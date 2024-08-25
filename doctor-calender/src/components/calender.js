import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CustomCalendar = ({ onSlotSelect }) => {
  const [events, setEvents] = useState([]);

  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      title: "Selected Time Slot",
      start: slotInfo.start,
      end: slotInfo.end,
    };

    // Add the new event to the existing events
    setEvents([...events, newEvent]);

    console.log("Selected Slot Info: ", slotInfo);
    // Pass the selected slot info to the parent component
    onSlotSelect(slotInfo);
  };

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView="week"
      step={30} // Time step in minutes
      timeslots={2} // Number of timeslots per step
      onSelectSlot={handleSelectSlot}
      style={{ height: 500 }}
    />
  );
};

export default CustomCalendar;
