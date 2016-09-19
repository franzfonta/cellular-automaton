import React, { PropTypes } from 'react'
import './Cell.css';

const Cell = ( { status } ) => (
  <td className={status ? 'active' : 'inactive'}></td>
)

Cell.propTypes = {
  status: PropTypes.bool.isRequired
}

export default Cell
