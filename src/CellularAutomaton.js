import React, { Component, PropTypes } from 'react'
import Cell from './Cell'


class CellularAutomaton extends Component {

  componentWillMount() {

    const { cellsNum, rowsNum, rules } = this.props

    // store the automaton rules as strings to ease matching
    const rulesSet = new Set(
      rules.map( row => row.toString() )
    )

    // cells are stored in a matrix
    const matrix = []

    // the cells in the first row have a random status
    const firstRow = []
    for (let i = 0; i < cellsNum; i++) {
      firstRow.push({isActive: this.randomBoolean(), isFlipped: false})
    }
    matrix.push(firstRow)

    // the cells in the following rows are calculated with the rules
    for (let i = 1; i < rowsNum; i++) {
      const prevRow = [
        matrix[i - 1][cellsNum - 1],
        ...matrix[i - 1],
        matrix[i - 1][0]
      ]
      const newRow = []
      for (let j = 0; j < cellsNum; j++) {
        const prevCellsState = prevRow.slice(j, j + 3).map(c => c.isActive)
        const isActive = rulesSet.has(prevCellsState.toString())
        newRow.push({isActive, isFlipped: false})
      }
      matrix.push(newRow)
    }

    // the state contains both the matrix of cells and the number of rows
    // already flipped
    // TODO use an immutable storage
    this.setState( { matrix , displayedRows : 0} )

  }

  componentDidMount() {

    // flip the rows of cells one by one at a fixed rate
    const intervalId = setInterval(
      () => {

        // stop the scheduling after all rows are flipped
        const { displayedRows } = this.state
        if (displayedRows === this.props.rowsNum) {
          clearInterval(intervalId)
          return
        }

        // store a new matrix that has an additional row of flipped cells
        const newMatrix = this.state.matrix.slice(0)
        newMatrix[displayedRows]
          .filter(cell => cell.isActive)
          .forEach(cell => cell.isFlipped = true)
        this.setState({displayedRows: displayedRows + 1, matrix: newMatrix})

      }
      , 100
    )

  }

  randomBoolean() {
    return Math.random() >= 0.5
  }

  render() {

    const rows = this.state.matrix.map(
      ( row, rowId ) => (
        <tr key={rowId}>
          {row.map( ( cell, cellId ) =>
            <Cell key={cellId} isActive={cell.isActive} isFlipped={cell.isFlipped} /> )}
        </tr>
      )
    )

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

CellularAutomaton.propTypes = {
  cellsNum: PropTypes.number.isRequired
}

export default CellularAutomaton
