import React from 'react';
import ReacDOM from 'react-dom';
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';

ReacDOM.render(<AppointmentsDayView appointments={sampleAppointments} />, document.getElementById('root'));
