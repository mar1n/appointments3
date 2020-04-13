import React, { useState, useCallback } from 'react';
import { AppointmentFormLoader } from './AppointmentFormLoader';
import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';
import { CustomerForm } from './CustomerForm';

export const App = () => {
    const [customer, setCustomer] = useState();
    const [view, setView] = useState('dayView');
    const transitionToAddCustomer = useCallback(
        () => setView('addCustomer'),
        []
      );
      const transitionToAddAppointment = useCallback(customer => {  setCustomer(customer);  setView('addAppointment');}, []);
    switch (view) {
        case 'addCustomer':
            return (
                <CustomerForm onSave={transitionToAddAppointment} />
            );
        case 'addAppointment':
            return (
                <AppointmentFormLoader />
            );
        default:
            return (
                <React.Fragment>
                    <div className="button-bar">
                        <button
                            type="button"
                            id="addCustomer"
                            onClick={transitionToAddCustomer}>
                                Add Customer and appointment
                            </button>
                    </div>
                    <AppointmentsDayViewLoader today={today} />
                </React.Fragment>
            )
    }
};