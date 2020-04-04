import React, { useState } from 'react';

const TimeSlotTable = () => <table id="time-slots" />;

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit
}) => {
  const [appointment, setAppointment] = useState({ service });

  const handleServiceChange = ({ target: { value } }) =>
    setAppointment(appointment => ({
      ...appointment,
      service: value
    }));

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Salon service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleServiceChange}>
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <TimeSlotTable />
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
};