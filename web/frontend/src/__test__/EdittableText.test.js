import { fireEvent, render } from '@testing-library/react';
import EdittableText from '../components/EdittableText';
import React from 'react';

test('Value defaults to 0 for EdittableText in Number Type', () => {
    render(
        <EdittableText
            onChange={() => {
                // This is here to prevent a warning
            }}
            type="number"
            value=""
        />
    );

    const input = document.querySelector('input');
    fireEvent.blur(input);

    expect(input.value).toBe('0');
});

test('Value defaults for EdittableText in Text Type', () => {
    render(
        <EdittableText
            onChange={() => {
                // This is here to prevent a warning
            }}
            type="text"
            value=""
        />
    );

    const input = document.querySelector('input');
    fireEvent.blur(input);

    expect(input.value).toBe('Please Enter A Value');
});

test('Text unchanged in EdittableText', () => {
    render(
        <EdittableText
            onChange={() => {
                // This is here to prevent a warning
            }}
            type="text"
            value="Hello"
        />
    );

    const input = document.querySelector('input');
    fireEvent.blur(input);

    expect(input.value).toBe('Hello');
});

test('Number cannot be letters in EdittableText', () => {
    render(
        <EdittableText
            onChange={() => {
                // This is here to prevent a warning
            }}
            type="number"
            value="Hello"
        />
    );

    const input = document.querySelector('input');
    fireEvent.blur(input);

    expect(input.value).toBe('0');
});
