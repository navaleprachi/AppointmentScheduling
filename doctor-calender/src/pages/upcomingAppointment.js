import React from "react";
import { useSelector } from "react-redux";

const UpcomingAppointments = () => {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <div>
      <h1>Upcoming Appointments</h1>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li key={index}>
              <p>Patient: {appointment.patient}</p>
              <p>Type: {appointment.appointmentType}</p>
              <p>
                Date: {new Date(appointment.time.start).toLocaleDateString()}
                <br />
                Time:{" "}
                {new Date(appointment.time.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(appointment.time.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </li>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </ul>
    </div>
  );
};

export default UpcomingAppointments;
