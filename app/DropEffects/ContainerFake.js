import React, {Component, PropTypes} from 'react'
import update from 'react/lib/update'
import ItemTypes from './ItemTypes'
import DraggableBox from './DraggableBox'
import snapToGrid from './snapToGrid'
import {DropTarget} from 'react-dnd'
import _ from 'lodash'
import uuid from 'node-uuid'

const styles = {
  width: 10000,
  height: 800,
  border: '1px solid black',
  position: 'relative'
}

export default class ContainerFace extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    snapToGrid: PropTypes.bool.isRequired
  }


  state = {
    boxes: {
      'насос': {top: 10, left: 50, title: 'Насосна станція'},
      'башта': {top: 80, left: 50, title: 'Водонапірна башта', parentId: 'насос', waterNeedingForThisBuild: 0.0001}
    }
  }
  addBox = (parentId, top, left, newBoxTitle) => {
    const id = uuid.v1()
    const _state = this.state
    _state.boxes[id] = {top: top + 5, left: left + 5, title: newBoxTitle, parentId}
    this.setState(_state)
  }
  removeBox = (id) => {
    const boxes = this.state.boxes
    const newBox = _.omit(boxes, [id])
    this.setState({boxes: newBox})
  }
  renderBox(item, key) {
    return (
      <DraggableBox
        {...item}
        key={key}
        id={key}
        removeBox={this.removeBox}
        addBloc={this.addBox}/>
    )
  }
  render() {
    const {boxes} = this.state
    return (
      <div style={styles}>
        {Object
          .keys(boxes)
          .map(key => this.renderBox(boxes[key], key))
        }
      </div>
    )
  }
}