import React, {Component, PropTypes} from 'react';
import ItemTypes from './ItemTypes';
import Box from './Box';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

const boxSource = {
  beginDrag(props) {
    const {id, title, left, top} = props;
    return {id, title, left, top};
  }
};

function getStyles(props) {
  const {left, top, isDragging} = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform: transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ''
  };
}

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class DraggableBox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  };
  state = {
    newTitle: null
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render() {
    const {newTitle} = this.state
    const {title, connectDragSource, id, removeBox, addBloc, left, top, parentId, roadToParent, calculateRoad} = this.props;
    const buttonRender = title === 'Насосна станція'
    return connectDragSource(
      <div style={getStyles(this.props)}>
        <Box title={title}
             roadToParent={roadToParent}/>
        {!buttonRender && <div>
          <div>
            <button className="box-button" onClick={()=>removeBox(id)}>Видалити</button>
          </div>
          <div>
            <button className="box-button" onClick={()=>addBloc(id,top,left ,newTitle)}>Додати ланку</button>
          </div>
          <div>
            <button className="box-button" onClick={()=>calculateRoad(id,parentId,top,left)}>
              Розрахувати довжину труби
            </button>
          </div>
          <input className="box-button" placeholder="Назва ланки"
                 onChange={(e)=>{this.setState({newTitle:e.target.value})}}/>
        </div>}
      </div>
    );
  }
}