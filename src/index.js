import React from 'react';
import ReacDOM from 'react-dom';
import { AppointmentsDayView } from './Appointment';
import { sampleAppointments } from './sampleData';

ReacDOM.render(<AppointmentsDayView appointments={sampleAppointments} />, document.getElementById('root'));
