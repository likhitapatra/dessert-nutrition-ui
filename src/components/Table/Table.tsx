import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableData from '../TableData/TableData';
import TableHeader from '../TableHeader/TableHeader';
import Button from '../Button/Button';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import './Table.css';
import { useMutation } from '@apollo/client';
import {
  DELETE_NUTRITION_DATA,
  GET_NUTRITION_DATA,
} from '../../queries/queries';

const Table = (props: any) => {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const [state, setState] = useState(props.data.nutritionData);

  const [checked, setChecked] = useState(
    [...Array(props.data?.nutritionData.length)].map(() => false)
  );
  const [allChecked, setAllChecked] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedDessert, setSelectedDessert] = useState('');
  const [deleteNutritionData] = useMutation(DELETE_NUTRITION_DATA);

  const handleSelected = (event: any, currentIndex: any) => {
    const _checked = [...checked];
    _checked[currentIndex] = event.target.checked;
    setChecked(_checked);
    event.target.checked
      ? setSelectedDessert(props.data.nutritionData[currentIndex].dessert)
      : setSelectedDessert('');

    const checkedCount = _checked.filter((val) => val === true).length;
    setSelectedCount(checkedCount);
  };

  const handleSelectAll = (event: any) => {
    setAllChecked(event.target.checked);
    setChecked((checked) => checked.map(() => event.target.checked));
    !allChecked ? setSelectedCount(checked.length) : setSelectedCount(0);
  };

  const handleAdd = () => {
    history.push('/add');
  };

  const handleDeleteSelected = () => {
    deleteNutritionData({
      variables: { dessert: selectedDessert },
      refetchQueries: [{ query: GET_NUTRITION_DATA }],
    });
  };

  const sortAscending = (sortKey: string) => {
    setToggle(!toggle);
    const sortedData = props.data?.nutritionData;
    const result = sortedData
      .slice()
      .sort((a: any, b: any) => (a[sortKey] > b[sortKey] ? 1 : -1));

    setState(result);
  };

  const sortDescending = (sortKey: string) => {
    setToggle(!toggle);
    const sortedData = props.data?.nutritionData;
    const result = sortedData
      .slice()
      .sort((a: any, b: any) => (a[sortKey] < b[sortKey] ? 1 : -1));

    setState(result);
  };

  const tableHeaders = [
    {
      name: (
        <input
          type="checkbox"
          id="desserts"
          name="desserts"
          checked={allChecked}
          onChange={handleSelectAll}
        />
      ),
      key: 'something',
    },
    { name: 'Dessert (100g serving)', key: 'dessert' },
    { name: 'Calories', key: 'calories' },
    { name: 'Fat (g)', key: 'fat' },
    { name: 'Carbs (g)', key: 'carb' },
    { name: 'Protein (g)', key: 'protein' },
  ];

  return (
    <div>
      <div className="container">
        <div className="selection">{selectedCount} Selected</div>
        <div className="button-container">
          <div className="ph2">
            <Button color="green" onClick={handleAdd}>
              + Add New
            </Button>
          </div>
          <Button color="red" onClick={handleDeleteSelected}>
            - Delete
          </Button>
        </div>
      </div>
      <div className="pa4">
        <div className="overflow-auto">
          <table className="f6 w-100 mw12 center" cellSpacing="0">
            <thead>
              <tr>
                {tableHeaders.map(({ name, key }: any, index) => (
                  <TableHeader key={index}>
                    {toggle ? (
                      <TiArrowSortedUp onClick={() => sortAscending(key)} />
                    ) : (
                      <TiArrowSortedDown onClick={() => sortDescending(key)} />
                    )}
                    {name}
                  </TableHeader>
                ))}
              </tr>
            </thead>
            <tbody className="lh-copy">
              {state.map((values: any, index: string) => (
                <tr key={index}>
                  <TableData>
                    <input
                      type="checkbox"
                      checked={checked[parseInt(index)]}
                      onChange={(event) =>
                        handleSelected(event, parseInt(index))
                      }
                    />
                  </TableData>
                  <TableData>{values.dessert}</TableData>
                  <TableData>{values.nutritionInfo.calories}</TableData>
                  <TableData>{values.nutritionInfo.fat}</TableData>
                  <TableData>{values.nutritionInfo.carb}</TableData>
                  <TableData>{values.nutritionInfo.protein}</TableData>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
