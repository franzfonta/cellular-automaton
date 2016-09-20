import React from 'react';
import { render } from 'react-dom'

import CellularAutomaton from './CellularAutomaton'
import './index.css';

const rules = [
  [true, true, true],
  [true, false, false],
  [false, true, false],
  [false, false, true]
]

render(
  <CellularAutomaton cellsNum={30} rowsNum={30} rules={rules} />,
  document.getElementById( 'cellular-automaton' )
)
