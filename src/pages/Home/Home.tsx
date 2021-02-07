import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import Layout from '../../components/Layout/Layout';
import { useQuery } from '@apollo/client';
import { GET_NUTRITION_DATA } from '../../queries/queries';
import { initialState } from './mockData';

const Home = () => {
  const [state, setState]: any = useState({});

  const { loading, data } = useQuery(GET_NUTRITION_DATA, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleReset = () => {
    setState(initialState);
  };

  return (
    <Layout>
      <div className="app-container">
        <div>
          <h3 className="f3 measure">Nutrition List</h3>
        </div>
        <div>
          <Button color="gray" onClick={handleReset}>
            Reset Data
          </Button>
        </div>
      </div>
      {loading ? 'Loading...' : <Table data={state} />}
    </Layout>
  );
};

export default Home;
