import React, { useState } from "react";
import CustomCalendar from "../components/calender";
import { useDispatch } from "react-redux";
import { addAppointment } from "../features/apptSlice";
import { Link } from "react-router-dom";
import patients from "../data/patients.json";

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

  const [selectedPatient, setSelectedPatient] = useState(null);
  const handlePatientSelect = (patientMrn) => {
    const patient = patients.find((p) => p.mrn === patientMrn);
    // Check if the patient was found before setting state
    if (patient) {
      setSelectedPatient(patient);
      setAppointmentDetails({
        ...appointmentDetails,
        patient: patient.name, // Set the patient name for the appointment
      });
    } else {
      console.error("Patient not found for MRN:", patientMrn);
      setSelectedPatient(null);
    }
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
      patientDetails: selectedPatient,
      time: {
        start: appointmentDetails.time.start.toISOString(),
        end: appointmentDetails.time.end.toISOString(),
      },
    };
    alert("Appointment scheduled successfully!");
    dispatch(addAppointment(serializableAppointmentDetails));
  };

  return (
    <div className="px-10 py-5">
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
        {/* <input
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
        /> */}
        <select
          className="border-b-2 border-neutral-100 focus:outline-none text-neutral-700"
          value={selectedPatient ? selectedPatient.mrn : ""}
          onChange={(e) => handlePatientSelect(e.target.value)}
        >
          <option>Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient.mrn} value={patient.mrn}>
              {patient.name}
            </option>
          ))}
        </select>

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
      {selectedPatient && (
        <div className="mt-5 text-neutral-600 bg-white shadow-md flex w-fit gap-5 border rounded-lg p-5">
          {/* <h3>Patient Details:</h3> */}
          <img
            src={selectedPatient.photo}
            alt={`Profile of ${selectedPatient.name}`}
          />
          <div>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {selectedPatient.name}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {selectedPatient.DOB}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {selectedPatient.phone}
            </p>
          </div>

          <div>
            {/* <h4>Insurance Details:</h4> */}
            <p>
              <span className="font-semibold">Insurance Name:</span>{" "}
              {selectedPatient.insurance.name}
            </p>
            <p>
              <span className="font-semibold">Insurance ID:</span>{" "}
              {selectedPatient.insurance.id}
            </p>
            <p>
              <span className="font-semibold">Insurance Group:</span>{" "}
              {selectedPatient.insurance.group}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;
