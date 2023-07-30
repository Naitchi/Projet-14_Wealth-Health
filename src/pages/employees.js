import Head from 'next/head';
import React from 'react';
import styles from '../styles/Employees.module.css';

import EmployeesArray from '@/components/EmployeesArray/EmployeesArray';

export default function Employees() {
  return (
    <>
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
        <a href="/">Home</a>
      </main>
    </>
  );
}
