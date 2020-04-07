import React from 'react';
import ReacDOM from 'react-dom';
import 'whatwg-fetch';
import { AppointmentsDayView } from './AppointmentsDayView';
import { sampleAppointments } from './sampleData';
import { CustomerForm } from './CustomerForm';

ReacDOM.render(<CustomerForm />, document.getElementById('root'));
