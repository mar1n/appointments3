import React from 'react';
import 'whatwg-fetch';
import { createContainer, withEvent } from './domManipulators';
import { CustomerSearch } from '../src/CustomerSearch';
import { fetchResponseOk } from './spyHelpers';

describe('CustomerSearch', () => {
    let renderAndWait, container, element, elements;

    beforeEach(() => {
    ({
        renderAndWait,
        container,
        element,
        elements,
    } = createContainer());
    jest
        .spyOn(window, 'fetch')
        .mockReturnValue(fetchResponseOk([]));
    });

    it('renders a table with four headings', async () => {
        await renderAndWait(<CustomerSearch />);
        const heading = elements('table th');
        expect(heading.map(h => h.textContent)).toEqual([
            'First name', 'Last name', 'Phone number', 'Actions'
        ]);
    });
})