import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer, { act } from 'react-test-renderer';
import Home from './Home';
import { mocks } from '../../mocks/mocks';
import { render } from '@testing-library/react';

describe('Home', () => {
  it('should render Home component', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    );

    const tree = component.toJSON();
    expect(tree?.type).toBe('div');
  });

  it('should match Home snapshot', async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      );
    });
    expect(rendered).toMatchSnapshot();
  });
});
