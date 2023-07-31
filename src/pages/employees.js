import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

import EmployeesArray from '@/components/EmployeesArray/EmployeesArray';

import styles from '../styles/Employees.module.css';

export default function Employees() {
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
