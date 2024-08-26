import React, { useState } from "react";
import CustomCalendar from "../components/calender";
import { useDispatch } from "react-redux";
import { addAppointment } from "../features/apptSlice";
import { Link } from "react-router-dom";

const Scheduling = () => {
  const dispatch = useDispatch();
  const [appointmentDetails, setAppointmentDetails] = useState({
    patient: "",
    appointmentType: "",
    time: null,
  });

  const handleSlotSelect = (slotInfo) => {
    setAppointmentDetails({
      ...appointmentDetails,
      time: {
        start: slotInfo.start,
        end: slotInfo.end,
      },
    });
  };

  const handleSubmit = () => {
    if (!appointmentDetails.time) {
      alert("Please select a time slot before scheduling.");
      return;
    } else if (!appointmentDetails.patient) {
      alert("Please enter patient name.");
      return;
    } else if (!appointmentDetails.appointmentType) {
      alert("Please select appointment type.");
      return;
    }

    const serializableAppointmentDetails = {
      ...appointmentDetails,
      time: {
        start: appointmentDetails.time.start.toISOString(),
        end: appointmentDetails.time.end.toISOString(),
      },
    };
    alert("Appointment scheduled successfully!");
    dispatch(addAppointment(serializableAppointmentDetails));
  };

  return (
    <div className="p-10">
      <h1 className="text-center font-semibold text text-3xl mb-10 text-blue-700">
        Schedule an Appointment
      </h1>
      <div className="flex justify-end">
        <Link to={"/upcoming"}>
          <button className="mb-5 border rounded-full p-1 w-56 bg-blue-700 text-white hover:bg-blue-600">
            Upcoming Appointments
          </button>
        </Link>
      </div>
      <div className="border border-gray-300 p-4 rounded-lg shadow-m">
        <CustomCalendar onSlotSelect={handleSlotSelect} />
      </div>
      <div className="mt-5">
        <input
          className="border-b-2 border-neutral-100 focus:outline-none text-neutral-700"
          type="text"
          placeholder="Patient Name"
          value={appointmentDetails.patient}
          onChange={(e) =>
            setAppointmentDetails({
              ...appointmentDetails,
              patient: e.target.value,
            })
          }
        />
        <select
          className="mr-7 ml-7 focus:outline-none border rounded border-neutral-200 p-2 text-neutral-500"
          value={appointmentDetails.appointmentType}
          onChange={(e) =>
            setAppointmentDetails({
              ...appointmentDetails,
              appointmentType: e.target.value,
            })
          }
        >
          <option>Select an option</option>
          <option value="Follow-up">Follow-up</option>
          <option value="New consult">New Consult</option>
          <option value="Pre-op">Pre-op</option>
          <option value="Urgent">Urgent</option>
          <option value="Annual exam">Annual Exam</option>
          <option value="New physical">New Physical</option>
        </select>
        <button
          className="ml-5 border rounded-full p-1 w-32 bg-blue-700 text-white hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Schedule
        </button>
      </div>
    </div>
  );
};

export default Scheduling;
