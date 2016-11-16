import * as React from 'react'
import { Link } from 'react-router'

export const App = (props: { children? }) => {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Login</Link>
        {' '}
        <Link to="/student-list">Student List</Link>
        {' '}
        <Link to="/student-detail">Student Detail</Link>
      </header>
      <div style={{ marginTop: '1.5em' }}>{props.children}</div>
    </div>
  )
}
