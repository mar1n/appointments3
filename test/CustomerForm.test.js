import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
      ({ render, container } = createContainer());
    });
  
    const form = id => container.querySelector(`form[id="${id}"]`);

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };
    const fierstNameField = () => form('customer').elements.firstName;
    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });
    it('renders the first name field as text box', () => {
        render(<CustomerForm />);
        expectToBeInputFieldOfTypeText(fierstNameField());
    });
    it('includes the existing value for first name', () => {
        render(<CustomerForm firstName="Ashley" />);
        expect(fierstNameField().value).toEqual('Ashley');
    });
});