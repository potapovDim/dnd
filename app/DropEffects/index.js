import React, {Component} from 'react';
import Container from './Container';
import CustomDragLayer from './CustomDragLayer';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropTargets from './DropTargets'
@DragDropContext(HTML5Backend)
export default class DragAroundCustomDragLayer extends Component {
  state = {
    napToGridAfterDrop: false,
    snapToGridWhileDragging: false,
    diffTypeMoveElement: false
  }
  handleSnapToGridAfterDropChange = () => {
    this.setState({
      snapToGridAfterDrop: !this.state.snapToGridAfterDrop
    })
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

  buildings = {
    cows: [{name: 'Корівник', heads: 200}, {name: 'Корівник', heads: 100}],
    calves: [{name: 'Приміщення для молодняку', heads: 300}],
    cows_before_20days: [{name: 'Родильне відділення з профілакторієм', heads: 160},
      {name: 'Родильне відділення з профілакторієм', heads: 160}]
  }

  render() {
    const {snapToGridAfterDrop, snapToGridWhileDragging, diffTypeMoveElement} = this.state;
    console.log(diffTypeMoveElement)

    return (
      <div>
        {
        diffTypeMoveElement ? 
        <DropTargets />
        :
        <div>
          <Container snapToGrid={snapToGridAfterDrop} buildings={this.buildings}/>
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