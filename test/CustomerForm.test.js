import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

const singleArgumentSpy = () => {
    let receivedArgument;
    return {
        fn: arg => (receivedArgument = arg),
        receivedArgument: () => receivedArgument
    };
};
describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);
    const field = name => form('customer').elements[name];
    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    };

    it('renders a form', () => {
        render(<CustomerForm />);
        expect(form('customer')).not.toBeNull();
    });

    const itRendersAsATextBox = (fieldName) =>
        it('renders the first name field as text box', () => {
            render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });

    const itIncludesTheExistingValue = (fieldName) =>
        it('includes the existing value for first name', () => {
            render(<CustomerForm {...{ [fieldName]: 'value' }} />);
            expect(field(fieldName).value).toEqual('value');
        });
    const itRendersLabelALabel = (fieldName, text) =>
        it('renders a label for the first name field', () => {
            render(<CustomerForm />);
            expect(labelFor(fieldName)).not.toBeNull();
            expect(labelFor(fieldName).textContent).toEqual(text);
        });
    const itAssignsIdThatMatchesTheLabel = fieldName =>
        it('assigns an id that matches the label id to the first name field', () => {
            render(<CustomerForm />);
            expect(field(fieldName).id).toEqual(fieldName);
        });
    const itSubmitExistingValue = fieldName =>
        it('saves existing first name when submitted', async () => {
            const submitSpy = singleArgumentSpy();
            
            render(
                <CustomerForm
                    {...{ [fieldName]: 'value' }}
                    onSubmit={submitSpy.fn}
                />
            );
            await ReactTestUtils.Simulate.submit(form('customer'));
            expect(submitSpy.receivedArgument()).toBeDefined();
            expect(submitSpy.receivedArgument()[fieldName]).toEqual('value');
        });
    const itSubmitsNewValue = (fieldName, value) =>
        it('saves new value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{ [fieldName]: 'existingValue' }}
                    onSubmit={props =>
                        expect(props[fieldName]).toEqual(value)
                    }
                />
            );
            await ReactTestUtils.Simulate.change(field(fieldName), {
                target: { value }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });

    describe('first name field', () => {
        itRendersAsATextBox('firstName');
        itIncludesTheExistingValue('firstName');
        itRendersLabelALabel('firstName', 'First name');
        itAssignsIdThatMatchesTheLabel('firstName');
        itSubmitExistingValue('firstName', 'value');
        itSubmitsNewValue('firstName', 'newValue');
    });
    describe('last name field', () => {
        itRendersAsATextBox('lastName');
        itIncludesTheExistingValue('lastName');
        itRendersLabelALabel('lastName', 'Last name');
        itAssignsIdThatMatchesTheLabel('lastName');
        itSubmitExistingValue('lastName', 'value');
        itSubmitsNewValue('lastName', 'newValue');
    });
    describe('phone field', () => {
        itRendersAsATextBox('phone');
        itIncludesTheExistingValue('phone');
        itRendersLabelALabel('phone', 'Phone');
        itAssignsIdThatMatchesTheLabel('phone');
        itSubmitExistingValue('phone', 'value');
        itSubmitsNewValue('phone', 'newValue');
    });

    it('has a submit button', () => {
        render(<CustomerForm />)
        const submitButton = container.querySelector('input[type="submit"]');
        expect(submitButton).not.toBeNull();
    });
});