import * as React from 'react';
import { Link } from 'react-router-dom';
const styles = require('./appStyles.scss');

export const App: React.StatelessComponent = (props) => {
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">Login</Link>
        <Link to="/student-list">Student List</Link>
        <Link to="/student-detail">Student Detail</Link>
      </header>
      <div>
        {props.children}
      </div>
    </div>
  );
}
