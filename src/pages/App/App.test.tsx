import React from 'react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import { mocks } from '../../mocks/mocks';

describe('App', () => {
  it('should render App component', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree?.props.className).toBe('App');
  });
});
