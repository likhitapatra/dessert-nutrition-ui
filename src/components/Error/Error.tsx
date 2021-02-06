import React from 'react';
import { ErrorMessage } from 'formik';

type Props = {
  name: string;
};

const Error = ({ name }: Props) => (
  <div className="pt2 red">
    <ErrorMessage name={name} />
  </div>
);

export default Error;
