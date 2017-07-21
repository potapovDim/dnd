import React, {Component, PropTypes} from 'react'
import ItemTypes from './ItemTypes'
import DraggableBox from './DraggableBox'
import snapToGrid from './snapToGrid'
import {DropTarget} from 'react-dnd'
import _ from 'lodash'

const styles = {
  width: 10000,
  height: 800,
  border: '1px solid black',
  position: 'relative'
}

const boxTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset()
    const item = monitor.getItem()

    let left = Math.round(item.left + delta.x)
    let top = Math.round(item.top + delta.y)
    if (props.snapToGrid) {
      [left, top] = snapToGrid(left, top)
    }
    props.moveBox(item.id, left, top)
  }
}

@DropTarget(ItemTypes.BOX, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    snapToGrid: PropTypes.bool.isRequired
  }


  renderBox = (item, key) => {
    const {removeBox, addBox} = this.props
    return (
      <DraggableBox
        {...item}
        key={key}
        id={key}
        removeBox={removeBox}
        addBloc={addBox}/>
    )
  }


  render() {
    const {connectDropTarget, boxes} = this.props
    console.log('RENDER  DROP ZONE')
    return connectDropTarget(
      <div style={styles}>
        {Object
          .keys(boxes)
          .map(key => this.renderBox(boxes[key], key))
        }
      </div>
    )
  }
}