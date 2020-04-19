import React, { useEffect, useState, useCallback } from 'react';

const CustomerRow = ({ customer }) => (
    <tr>
        <td>{customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>{customer.phoneNumber}</td>
        <td />
    </tr>
);

const SearchButtons = ({ handleNext }) => (
    <div className="button-bar">
        <button role="button" id="next-page" onClick={handleNext}>
            Next
        </button>
    </div>
)

export const CustomerSearch = () => {
    const [customers, setCustomers] = useState([]);
    const [queryString, setQueryString] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const result = await window.fetch(`/customers${queryString}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' }
            });
            setCustomers(await result.json());
        };

        fetchData();
    }, [queryString]);

    const handleNext = useCallback(async () => {
        const after = customers[customers.length - 1].id;
        const newQueryString = `?after=${after}`;
        setQueryString(newQueryString);
    }, [customers]);

    return (
        <>
        <SearchButtons handleNext={handleNext} />
        <table>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Phone number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <CustomerRow customer={customer} key={customer.id} />
                ))}
            </tbody>
        </table>
        </>
    );
};