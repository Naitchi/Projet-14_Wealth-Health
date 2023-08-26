/**
 * Module dependencies.
 */
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getEmployees } from '@/redux/employeesSlice';

// Styles
import styles from './EmployeesArray.module.css';

/**
 * Component to display an array of employees in a table with
 * pagination, sorting and searching capabilities.
 *
 * @returns {ReactElement} Rendered component
 */
export default function EmployeesArray() {
  /**
   * Columns to be displayed in the table.
   */
  const columns = useMemo(
    () => [
      'firstName',
      'lastName',
      'startDate',
      'department',
      'dateOfBirth',
      'street',
      'city',
      'states',
      'zipCode',
    ],
    [],
  );

  /**
   * Array of unsorted employees from store.
   */
  const employees = useSelector(getEmployees);

  /**
   * Parameters for display control.
   */
  const [params, setParams] = useState({
    show: 10, //number between 10 25 50 100
    sortBy: 'firstName', // nom du champ qui va trié le tableau
    order: true, // ordre de trie (true = croissant, false = décroissant)
    search: '', // input user from SearchBar
    page: 0, // chiffre de la page visualisé
  });

  /**
   * Filters employees based on a search text.
   *
   * @param {Array} employees - Array of employees to be filtered
   * @returns {Array} Filtered employees array
   */
  const sortByText = (employees) => {
    const text = params.search;
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

  /**
   * Sorts the employees based on a field and order.
   *
   * @param {Array} data - Array of employees to be sorted
   * @param {string} sortBy - Field name to sort by
   * @param {boolean} order - Sort order (true for ascending, false for descending)
   * @returns {Array} Sorted employees array
   */
  const sortEmployees = (data, sortBy, order) => {
    return [...data].sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      return order ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  };

  /**
   * Change the sorting criteria for the table.
   *
   * @param {string} name - Name of the column.
   */
  const changeSort = (name) => {
    if (params.sortBy === name) setParams({ ...params, order: !params.order });
    if (params.sortBy !== name) setParams({ ...params, sortBy: name, order: true });
  };

  /**
   * Calculates the maximum number of elements to display based on the current page.
   * @returns {number} - The maximum number of elements to display.
   */
  const showMaxElements = () => {
    if (params.show * (params.page + 1) < sortedEmployees.length)
      return params.show * (params.page + 1);
    else return sortedEmployees.length;
  };

  /**
   * Handles the event when a pagination button is clicked.
   * @param {number} i - The page number to switch to.
   */
  const handlePageClick = (i) => {
    setParams({ ...params, page: i });
  };

  /**
   * Switches to the previous page.
   */
  const handlePreviousPage = () => {
    if (params.page - 1 >= 0) setParams({ ...params, page: params.page - 1 });
  };

  /**
   * Switches to the next page.
   */
  const handleNextPage = () => {
    const pagesMax = employees.length / params.show;
    if (params.page + 1 <= pagesMax) setParams({ ...params, page: params.page + 1 });
  };

  /**
   * Renders the "Previous" button for pagination.
   * @returns {React.Element} - The "Previous" button element.
   */
  const showPrevious = () => {
    const { page } = params;
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

  // Calculate sorted employees and paginated employees data
  const { sortedEmployees, sortedEmployeesOfThisPage } = useMemo(() => {
    let data = sortByText(employees);
    if (data?.length) {
      data = sortEmployees(data, params.sortBy, params.order);
      return {
        sortedEmployeesOfThisPage: data.slice(
          params.show * params.page,
          params.show * params.page + params.show,
        ),
        sortedEmployees: data,
      };
    }
    return {
      sortedEmployeesOfThisPage: [],
      sortedEmployees: [],
    };
  }, [employees, params]);

  /**
   * Renders the pagination buttons based on the number of pages.
   * @returns {Array} - An array of button elements for pagination.
   */
  const showPagesNumber = () => {
    const { show, page } = params;
    const pagesNumber = sortedEmployees.length / show;
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

  // Memoized calculation of pagination buttons
  const paginationButtons = useMemo(() => {
    return showPagesNumber();
  }, [params.show, sortedEmployees.length, params.page]);

  /**
   * Renders the "Next" button for pagination.
   * @returns {React.Element} - The "Next" button element.
   */
  const showNext = () => {
    const { page, show } = params;
    const pagesNumber = sortedEmployees.length / show;

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

  return (
    <div className={styles.component}>
      <div className={styles.top}>
        <div className={styles.row}>
          <p>Show</p>
          <select
            className={styles.show}
            onChange={(event) => {
              setParams({ ...params, show: parseInt(event.target.value), page: 0 });
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
          {params.search.length !== 0 && (
            <button
              className={styles.cross}
              onClick={() => {
                setParams({ ...params, search: '' });
              }}
            >
              x
            </button>
          )}
          <label htmlFor="search">Seach:</label>
          <input
            id="search"
            name="search"
            className={styles.search}
            type="text"
            value={params.search} // Lie la valeur de l'input au state
            onChange={(event) => {
              setParams({ ...params, search: event.target.value });
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
                 ${params.sortBy === 'firstName' ? styles.active : ''}`}
              >
                {params.sortBy !== 'firstName' && '⇅'}
                {params.sortBy === 'firstName' && params.order === true && '↑'}
                {params.sortBy === 'firstName' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('lastName')}>
              Last Name
              <p
                className={`${styles.arrow} 
                 ${params.sortBy === 'lastName' ? styles.active : ''}`}
              >
                {params.sortBy !== 'lastName' && '⇅'}
                {params.sortBy === 'lastName' && params.order === true && '↑'}
                {params.sortBy === 'lastName' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('startDate')}>
              Start Date
              <p className={`${styles.arrow} `}>
                {params.sortBy !== 'startDate' && '⇅'}
                {params.sortBy === 'startDate' && params.order === true && '↑'}
                {params.sortBy === 'startDate' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('department')}>
              Departement
              <p
                className={`${styles.arrow} 
                 ${params.sortBy === 'department' ? styles.active : ''}`}
              >
                {params.sortBy !== 'department' && '⇅'}
                {params.sortBy === 'department' && params.order === true && '↑'}
                {params.sortBy === 'department' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('dateOfBirth')}>
              Date of Birth
              <p
                className={`${styles.arrow} 
                 ${params.sortBy === 'dateOfBirth' ? styles.active : ''}`}
              >
                {params.sortBy !== 'dateOfBirth' && '⇅'}
                {params.sortBy === 'dateOfBirth' && params.order === true && '↑'}
                {params.sortBy === 'dateOfBirth' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('street')}>
              Street
              <p
                className={`${styles.arrow} 
                 ${params.sortBy === 'street' ? styles.active : ''}`}
              >
                {params.sortBy !== 'street' && '⇅'}
                {params.sortBy === 'street' && params.order === true && '↑'}
                {params.sortBy === 'street' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('city')}>
              City
              <p
                className={`${styles.arrow} 
                 ${params.sortBy === 'city' ? styles.active : ''}`}
              >
                {params.sortBy !== 'city' && '⇅'}
                {params.sortBy === 'city' && params.order === true && '↑'}
                {params.sortBy === 'city' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('states')}>
              State
              <p
                className={`${styles.arrow} 
                ${params.sortBy === 'states' ? styles.active : ''}`}
              >
                {params.sortBy !== 'states' && '⇅'}
                {params.sortBy === 'states' && params.order === true && '↑'}
                {params.sortBy === 'states' && params.order === false && '↓'}
              </p>
            </th>
            <th className={`${styles.th}`} onClick={() => changeSort('zipCode')}>
              Zip Code
              <p
                className={`${styles.arrow} 
                 ${params.sortBy === 'zipCode' ? styles.active : ''}`}
              >
                {params.sortBy !== 'zipCode' && '⇅'}
                {params.sortBy === 'zipCode' && params.order === true && '↑'}
                {params.sortBy === 'zipCode' && params.order === false && '↓'}
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
                {columns.map((column) => (
                  <td key={column} className={params.sortBy === column ? styles.activeColumn : ''}>
                    {employee[column] instanceof Date
                      ? employee[column].toLocaleDateString()
                      : employee[column]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={`${styles.top}`}>
        <p>
          Showing
          {sortedEmployees.length !== 0
            ? ' ' + (params.show * params.page + 1) + ' '
            : ' ' + 0 + ' '}
          to
          {' ' + showMaxElements() + ' '}
          of
          {' ' + sortedEmployees.length + ' '}
          {params.search && sortedEmployees.length !== employees.length
            ? `(filtered from ${employees.length} total entries)`
            : 'entries'}
        </p>
        <div>
          {showPrevious()}
          {paginationButtons}
          {showNext()}
        </div>
      </div>
    </div>
  );
}
