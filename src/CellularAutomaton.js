import React, { Component, PropTypes } from 'react'
import Cell from './Cell'


class CellularAutomaton extends Component {

  componentWillMount() {

    const { cellsNum, rowsNum, rules } = this.props

    const rulesSet = new Set(
      rules.map( row => row.toString() )
    )

    const matrix = []

    const firstRow = []
    for (let i = 0; i < cellsNum; i++) {
      firstRow.push({isActive: this.randomBoolean(), isFlipped: false})
    }
    matrix.push(firstRow)

    let prevRow = firstRow
    for (let i = 0; i < rowsNum - 1; i++) {
      const row = []
      for (let j = 0; j < cellsNum; j++) {
        let ruleToApply = []
        ruleToApply.push(prevRow[j === 0 ? prevRow.length - 1 : j - 1].isActive)
        ruleToApply.push(prevRow[j].isActive)
        ruleToApply.push(prevRow[j === prevRow.length - 1 ? 0 : j + 1].isActive)
        const isActive = rulesSet.has(ruleToApply.toString())
        row.push({isActive, isFlipped: false})
      }
      matrix.push(row)
      prevRow = row
    }

    this.setState( { matrix , displayedRows : 0} )

  }

  componentDidMount() {

    const { rowsNum } = this.props

    const intervalId = setInterval(
      () => {
        const {displayedRows} = this.state
        if (displayedRows === rowsNum) {
          clearInterval(intervalId)
          return
        }
        const newMatrix = this.state.matrix.slice(0)
        newMatrix[displayedRows]
          .filter(cell => cell.isActive)
          .forEach(cell => cell.isFlipped = true)
        this.setState({displayedRows: this.state.displayedRows + 1, matrix: newMatrix})
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
