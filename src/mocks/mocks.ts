import { GET_NUTRITION_DATA } from '../queries/queries';

export const mocks = [
  {
    request: {
      query: GET_NUTRITION_DATA,
      variables: {
        dessert: 'Oreo',
      },
    },
    result: {
      data: {
        nutritionData: { dessert: 'Oreo', nutritionInfo: {} },
      },
    },
  },
];
