import React, { useState } from 'react';

export const CustomerForm = ({ firstName, lastName, phone, fetch }) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phone });

  const handleChangeFirstName = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      firstName: target.value
    }));
  const handleChangeLastName = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      lastName: target.value
    }));
  const handleChangePhoneNumber = ({ target }) =>
    setCustomer(customer => ({
      ...customer,
      phone: target.value
    }))
  const handleSubmit = () => {
    window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
  };
  return <form id="customer" onSubmit={handleSubmit}>
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      name="firstName"
      id="firstName"
      value={firstName}
      onChange={handleChangeFirstName}
    />
    <label htmlFor="lastName">Last name</label>
    <input
      type="text"
      name="lastName"
      id="lastName"
      value={lastName}
      onChange={handleChangeLastName}
    />
    <label htmlFor="phone">Phone</label>
    <input
      type="text"
      name="phone"
      id="phone"
      value={phone}
      onChange={handleChangePhoneNumber}
    />
    <input
      type="submit"
      value="Add"
    />
  </form>
};