import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-test-renderer';

import { mocks } from '../../mocks/mocks';
import Table from './Table';
import { render } from '@testing-library/react';

describe('Table', () => {
  const props = { data: { nutritionData: [] } };
  it('should match Table snapshot', async () => {
    let rendered;
    await act(async () => {
      rendered = render(
        <MockedProvider mocks={mocks}>
          <Table {...props} />
        </MockedProvider>
      );
    });
    expect(rendered).toMatchSnapshot();
  });

  it('should render Table component', async () => {
    await act(async () => {
      const test = render(
        <MockedProvider mocks={mocks}>
          <Table {...props} />
        </MockedProvider>
      );
      expect(test).toBeTruthy();
    });
  });
});
