import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Field, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../components/Button/Button';
import { ADD_NUTRITION_DATA, GET_NUTRITION_DATA } from '../../queries/queries';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Error from '../../components/Error/Error';

const validationSchema = yup.object({
  dessert: yup.string().required('Required'),
  calories: yup.number().required('Required'),
  fat: yup.number().required('Required'),
  carb: yup.number().required('Required'),
  protein: yup.number().required('Required'),
});

const FormField = ({ label, name, type }: any) => (
  <div className="pt2">
    <div>
      <label htmlFor={name}>{label}</label>
    </div>
    <div>
      <Field type={type} style={{ width: 300 }} id={name} name={name} />
    </div>
  </div>
);

const AddData = () => {
  const history = useHistory();
  const [addNutritionData] = useMutation(ADD_NUTRITION_DATA, {
    refetchQueries: [
      {
        query: GET_NUTRITION_DATA,
      },
    ],
  });

  const formik = useFormik({
    initialValues: {
      dessert: '',
      calories: '',
      fat: '',
      carb: '',
      protein: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      addNutritionData({
        variables: values,
      });
      resetForm();
      history.push('/');
    },
  });
  return (
    <Layout>
      <div>
        <Button color="gray" onClick={() => history.push('/')}>
          Back
        </Button>
        <div className="flex flex-column items-center">
          <div className="bg-gold tc pa2">
            Please fill all the details before you submit
          </div>
          <div className="pt2">
            <FormikProvider value={formik}>
              <form onSubmit={formik.handleSubmit}>
                <FormField name="dessert" label="Dessert *" type="text" />
                <Error name="dessert" />
                <FormField name="calories" label="Calories *" type="number" />
                <Error name="calories" />
                <FormField name="fat" label="Fat *" type="number" />
                <Error name="fat" />
                <FormField name="carb" label="Carbs *" type="number" />
                <Error name="carb" />
                <FormField name="protein" label="Protein *" type="number" />
                <Error name="protein" />
                <div className="pt2 tc">
                  <Button type="submit" color="green" width="100">
                    Add Data
                  </Button>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddData;
