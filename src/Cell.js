import React, { Component, PropTypes } from 'react'
import './Cell.css';

class Cell extends Component {

  shouldComponentUpdate(nextProps) {
    const { isActive, isFlipped = false } = this.props
    if(isActive === nextProps.isActive && isFlipped === nextProps.isFlipped) {
      return false
    }
    return true
  }

  render() {

    const { isActive, isFlipped = false } = this.props

    let elem
    if (isActive) {
      elem = (
        <td className={'flip-container active ' + (isFlipped ? 'hover' : '') }>
          <div className="flipper">
            <div className="front"></div>
            <div className="back"></div>
          </div>
        </td>
      )
    } else {
      elem = <td className={'inactive'}></td>
    }

    return elem
  }

}

Cell.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isFlipped: PropTypes.bool
}

export default Cell
