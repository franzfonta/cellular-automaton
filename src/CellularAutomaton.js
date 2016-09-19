import React, { Component, PropTypes } from 'react'
import Cell from './Cell'


class CellularAutomaton extends Component {

  componentWillMount() {
    const { cellsNum, rules } = this.props

    const rulesSet = new Set(
      rules.map( row => row.toString() )
    )

    const matrix = []

    const firstRow = []
    for (let i = 0; i < cellsNum; i++) {
      firstRow.push(this.randomBoolean())
    }
    matrix.push(firstRow)

    for (let i = 0; i < 50; i++) {
      const row = []
      for (let j = 0; j < cellsNum; j++) {
        const prevRow = matrix[matrix.length - 1]
        let ruleToApply = []
        ruleToApply.push(prevRow[j === 0 ? prevRow.length - 1 : j - 1])
        ruleToApply.push(prevRow[j])
        ruleToApply.push(prevRow[j === prevRow.length - 1 ? 0 : j + 1])
        const status = rulesSet.has(ruleToApply.toString())
        row.push(status)
      }
      matrix.push(row)
    }
    this.setState( { matrix } )
  }

  randomBoolean() {
    return Math.random() >= 0.5
  }

  render() {

    const rows = this.state.matrix.map(
      ( row, rowId ) => (
        <tr key={rowId}>
          {row.map( ( cell, cellId ) => <Cell key={cellId} status={cell} /> )}
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
