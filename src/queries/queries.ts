import { gql } from '@apollo/client';

export const GET_NUTRITION_DATA: any = gql`
  query {
    nutritionData {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

export const ADD_NUTRITION_DATA = gql`
  mutation addNutritionData(
    $dessert: String!
    $calories: Int
    $fat: Int
    $carb: Int
    $protein: Int
  ) {
    addNutritionData(
      dessert: $dessert
      calories: $calories
      fat: $fat
      carb: $carb
      protein: $protein
    ) {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

export const DELETE_NUTRITION_DATA = gql`
  mutation deleteNutritionData($dessert: String!) {
    deleteNutritionData(dessert: $dessert)
  }
`;
