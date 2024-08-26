import React from "react";
import { useSelector } from "react-redux";
import { IoPersonOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { IoMdTime } from "react-icons/io";

const UpcomingAppointments = () => {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <div className="p-10">
      <h1 className="text-center font-semibold text text-3xl mb-10 text-blue-700">
        Upcoming Appointments
      </h1>
      <div className="flex flex-wrap gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={index}
              className=" bg-white shadow-md border border-gray-200 rounded-lg p-4 w-64 flex-shrink-0"
            >
              <p className="font-semibold text-neutral-700 flex items-center gap-2">
                <IoPersonOutline className="text-neutral-700" />
                Patient: {appointment.patient}
              </p>
              <p className="text-sm text-gray-600">
                Type: {appointment.appointmentType}
              </p>
              <p className="text-sm mt-2 text-neutral-700 flex items-center gap-2">
                <CgCalendarDates />
                Date: {new Date(appointment.time.start).toLocaleDateString()}
              </p>
              <p className="text-sm text-neutral-700 flex items-center gap-2">
                <IoMdTime />
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
            </div>
          ))
        ) : (
          <p className="text-xl text-neutral-700">
            No upcoming appointments....
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
