/**
 * Module dependencies.
 */
import Head from 'next/head';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setEmployees } from '@/redux/employeesSlice';

// Custom Components
import EmployeesArray from '@/components/EmployeesArray/EmployeesArray';

// Styles
import styles from '../styles/Employees.module.css';

/**
 * Employees component - Represents the page showing the list of current employees.
 *
 * @component
 *
 * @returns {React.Component} The Employees component.
 */
export default function Employees() {
  const dispatch = useDispatch();

  // Fetches the employees data from local storage
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('employees'));
    dispatch(setEmployees({ content: storage }));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HRnet - Current Employees</title>
        <meta name="description" content="HRnet - Current Employees" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Current Employees</h1>
        </div>
        <EmployeesArray />
        <Link href="/">Home</Link>
      </main>
    </React.Fragment>
  );
}
