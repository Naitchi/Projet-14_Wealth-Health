import React, { useEffect, useState, useMemo } from 'react';
import styles from './EmployeesArray.module.css';

export default function EmployeesArray() {
  const [state, setState] = useState({
    employees: [],
    params: {
      show: 10, //number between 10 25 50 100
      sortBy: 'firstName', // nom du champ qui va trié le tableau
      order: true, // ordre de trie (true = croissant, false = décroissant)
      search: '', // input user from SearchBar
      page: 0, // chiffre de la page visualisé
    },
  });

  const sortByText = (employees) => {
    const text = state.params.search;
    if (text.length === 0) return employees;
    const result = employees
      .map((employee) => {
        if (
          employee.firstName.toLowerCase().includes(text.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(text.toLowerCase()) ||
          employee.startDate.toLowerCase().includes(text.toLowerCase()) ||
          employee.department.toLowerCase().includes(text.toLowerCase()) ||
          employee.dateOfBirth.toLowerCase().includes(text.toLowerCase()) ||
          employee.street.toLowerCase().includes(text.toLowerCase()) ||
          employee.city.toLowerCase().includes(text.toLowerCase()) ||
          employee.states.toLowerCase().includes(text.toLowerCase()) ||
          employee.zipCode.toLowerCase().includes(text.toLowerCase())
        )
          return employee;
        else return false;
      })
      .filter((employee) => employee !== false);
    return result;
  };

  const sortEmployees = (data, sortBy, order) => {
    return [...data].sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      return order ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  };

  const changeSort = (name) => {
    if (state.params.sortBy === name)
      setState({ ...state, params: { ...state.params, order: !state.params.order } });
    if (state.params.sortBy !== name)
      setState({ ...state, params: { ...state.params, sortBy: name, order: true } });
  };

  const showMaxElements = () => {
    if (state.params.show * (state.params.page + 1) < sortedEmployees.length)
      return state.params.show * (state.params.page + 1);
    else return sortedEmployees.length;
  };

  const showPagesNumber = () => {
    const { show, page } = state.params;
    const pagesNumber = state.employees.length / show;
    const buttons = [];
    for (let i = 0; i < pagesNumber; i++) {
      i === page
        ? buttons.push(
            <button
              className={styles.pageActive}
              disabled
              key={i}
              onClick={() => handlePageClick(i)}
            >
              {i + 1}
            </button>,
          )
        : buttons.push(
            <button className={styles.page} key={i} onClick={() => handlePageClick(i)}>
              {i + 1}
            </button>,
          );
    }
    return buttons;
  };

  const handlePageClick = (i) => {
    setState({ ...state, params: { ...state.params, page: i } });
  };

  const handlePreviousPage = () => {
    if (state.params.page - 1 >= 0)
      setState({ ...state, params: { ...state.params, page: state.params.page - 1 } });
  };

  const handleNextPage = () => {
    const pagesMax = state.employees.length / state.params.show;
    if (state.params.page + 1 <= pagesMax)
      setState({ ...state, params: { ...state.params, page: state.params.page + 1 } });
  };

  const showPrevious = () => {
    const { page } = state.params;
    return page - 1 < 0 ? (
      <button className={styles.page} disabled onClick={handlePreviousPage}>
        Previous
      </button>
    ) : (
      <button className={styles.page} onClick={handlePreviousPage}>
        Previous
      </button>
    );
  };

  const showNext = () => {
    const { page, show } = state.params;
    const pagesNumber = state.employees.length / show;

    return page + 1 > pagesNumber ? (
      <button className={styles.page} disabled onClick={handleNextPage}>
        Next
      </button>
    ) : (
      <button className={styles.page} onClick={handleNextPage}>
        Next
      </button>
    );
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('employees'));
    setState({ ...state, employees: storage });
  }, []);

  const { sortedEmployees, sortedEmployeesOfThisPage } = useMemo(() => {
    const { employees, params } = state;
    let data = sortByText(employees);
    data = sortEmployees(data, params.sortBy, params.order);
    return {
      sortedEmployeesOfThisPage: data.slice(
        state.params.show * state.params.page,
        state.params.show * state.params.page + state.params.show,
      ),
      sortedEmployees: data,
    };
  }, [state]);

  return (
    <div className={styles.component}>
      <div className={styles.top}>
        <div className={styles.row}>
          <p>Show</p>
          <select
            className={styles.show}
            onChange={(event) => {
              setState({ ...state, params: { ...state.params, show: event.target.value } });
            }}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <p>entries</p>
        </div>
        <div className={styles.row}>
          {state.params.search.length !== 0 && (
            <button
              className={styles.cross}
              onClick={() => {
                setState({ ...state, params: { ...state.params, search: '' } });
              }}
            >
              x
            </button>
          )}
          <p>Seach:</p>
          <input
            className={styles.search}
            type="text"
            value={state.params.search} // Lie la valeur de l'input au state
            onChange={(event) => {
              setState({ ...state, params: { ...state.params, search: event.target.value } });
            }}
          />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th}`} onClick={() => changeSort('firstName')}>
              First Name
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'firstName' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'firstName' && '⇅'}
                {state.params.sortBy === 'firstName' && state.params.order === true && '↑'}
                {state.params.sortBy === 'firstName' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('lastName')}>
              Last Name
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'lastName' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'lastName' && '⇅'}
                {state.params.sortBy === 'lastName' && state.params.order === true && '↑'}
                {state.params.sortBy === 'lastName' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('startDate')}>
              Start Date
              <p className={`${styles.arrow} `}>
                {state.params.sortBy !== 'startDate' && '⇅'}
                {state.params.sortBy === 'startDate' && state.params.order === true && '↑'}
                {state.params.sortBy === 'startDate' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('department')}>
              Departement
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'department' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'department' && '⇅'}
                {state.params.sortBy === 'department' && state.params.order === true && '↑'}
                {state.params.sortBy === 'department' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('dateOfBirth')}>
              Date of Birth
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'dateOfBirth' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'dateOfBirth' && '⇅'}
                {state.params.sortBy === 'dateOfBirth' && state.params.order === true && '↑'}
                {state.params.sortBy === 'dateOfBirth' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('street')}>
              Street
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'street' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'street' && '⇅'}
                {state.params.sortBy === 'street' && state.params.order === true && '↑'}
                {state.params.sortBy === 'street' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('city')}>
              City
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'city' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'city' && '⇅'}
                {state.params.sortBy === 'city' && state.params.order === true && '↑'}
                {state.params.sortBy === 'city' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('states')}>
              State
              <p
                className={`${styles.arrow} 
                ${state.params.sortBy === 'states' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'states' && '⇅'}
                {state.params.sortBy === 'states' && state.params.order === true && '↑'}
                {state.params.sortBy === 'states' && state.params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('zipCode')}>
              Zip Code
              <p
                className={`${styles.arrow} 
                 ${state.params.sortBy === 'zipCode' ? styles.active : ''}`}
              >
                {state.params.sortBy !== 'zipCode' && '⇅'}
                {state.params.sortBy === 'zipCode' && state.params.order === true && '↑'}
                {state.params.sortBy === 'zipCode' && state.params.order === false && '↓'}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployeesOfThisPage.length === 0 ? (
            <tr>
              <td>No matching records found</td>
            </tr>
          ) : (
            sortedEmployeesOfThisPage.map((employee, key) => (
              <tr key={key} className={`${key % 2 === 0 ? styles.greyRow : ''}`}>
                <td className={state.params.sortBy === 'firstName' ? styles.activeColumn : ''}>
                  {employee.firstName}
                </td>
                <td className={state.params.sortBy === 'lastName' ? styles.activeColumn : ''}>
                  {employee.lastName}
                </td>
                <td className={state.params.sortBy === 'startDate' ? styles.activeColumn : ''}>
                  {employee.startDate}
                </td>
                <td className={state.params.sortBy === 'department' ? styles.activeColumn : ''}>
                  {employee.department}
                </td>
                <td className={state.params.sortBy === 'dateOfBirth' ? styles.activeColumn : ''}>
                  {employee.dateOfBirth}
                </td>
                <td className={state.params.sortBy === 'street' ? styles.activeColumn : ''}>
                  {employee.street}
                </td>
                <td className={state.params.sortBy === 'city' ? styles.activeColumn : ''}>
                  {employee.city}
                </td>
                <td className={state.params.sortBy === 'states' ? styles.activeColumn : ''}>
                  {employee.states}
                </td>
                <td className={state.params.sortBy === 'zipCode' ? styles.activeColumn : ''}>
                  {employee.zipCode}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={`${styles.top}`}>
        <p>
          Showing
          {sortedEmployees.length !== 0
            ? ' ' + (state.params.show * state.params.page + 1) + ' '
            : ' ' + 0 + ' '}
          to
          {' ' + showMaxElements() + ' '}
          of
          {' ' + sortedEmployees.length + ' '}
          {state.params.search && sortedEmployees.length !== state.employees.length
            ? `(filtered from ${state.employees.length} total entries)`
            : 'entries'}
        </p>
        <div>
          {showPrevious()}
          {showPagesNumber()}
          {showNext()}
        </div>
      </div>
    </div>
  );
}
