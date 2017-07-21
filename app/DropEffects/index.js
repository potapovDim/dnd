import React, {Component} from 'react';
import Container from './Container';
import update from 'react/lib/update';
import CustomDragLayer from './CustomDragLayer';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropTargets from './DropTargets'
import uuid from 'node-uuid'

@DragDropContext(HTML5Backend)
export default class DragAroundCustomDragLayer extends Component {
  state = {
    boxes: {
      'насос': {top: 10, left: 50, title: 'Насосна станція'},
      'башта': {top: 80, left: 50, title: 'Водонапірна башта', parentId: 'насос', waterNeedingForThisBuild: 0.0001}
    },
    napToGridAfterDrop: false,
    snapToGridWhileDragging: false,
    diffTypeMoveElement: false
  }
  handleSnapToGridAfterDropChange = () => {
    this.setState({
      snapToGridAfterDrop: !this.state.snapToGridAfterDrop
    })
  }

  moveBox = (id, left, top) => {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
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

  diffTypeMoveElement = () => {
    console.log('dsjhakjdjkahsdjahsjkdask')
    this.setState({
      diffTypeMoveElement: !this.state.diffTypeMoveElement
    })
  }
  handleSnapToGridWhileDraggingChange =() => {
    this.setState({
      snapToGridWhileDragging: !this.state.snapToGridWhileDragging
    })
  }

  render() {
    const {snapToGridAfterDrop, snapToGridWhileDragging, diffTypeMoveElement, boxes} = this.state;

    return (
      <div>
        {
        diffTypeMoveElement ? 
        <DropTargets />
        :
        <div>
          <Container 
              addBox={this.addBox}
              removeBox={this.removeBox}
              moveBox={this.moveBox}
              boxes={boxes}
              snapToGrid={snapToGridAfterDrop}
          />
          <CustomDragLayer snapToGrid={snapToGridWhileDragging}/>
          </div>
          
        }
        <p>
        <br />
          <label>
            <input type='checkbox'
                   checked={diffTypeMoveElement}
                   onChange={this.diffTypeMoveElement}/>
            <small>Інший спосіб переміщення компонентів</small>
          </label>
          <label>
            <input type='checkbox'
                   checked={snapToGridWhileDragging}
                   onChange={this.handleSnapToGridWhileDraggingChange}/>
            <small>Дозволити переміщення тільки по сітці</small>
          </label>
          <br />
          <label>
            <input type='checkbox'
                   checked={snapToGridAfterDrop}
                   onChange={this.handleSnapToGridAfterDropChange}/>
            <small>Вирівняти по сітці після закінчення переміщення</small>
          </label>
        </p>
      </div>
    );
  }
}