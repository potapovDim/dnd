import React, {Component, PropTypes} from 'react';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move'
};

export default class Box extends Component {
  static propTypes = {
    title: PropTypes.string,
    yellow: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return this.props.roadToParent !== nextProps.roadToParent
  }

  render() {
    const {title, yellow, roadToParent} = this.props;
    const backgroundColor = yellow ? 'yellow' : 'white';
    const borderRadius = title === 'Насосна станція' ? '50px' : '1px'
    return (
      <div style={{...styles, backgroundColor ,borderRadius}}>
        {title}
        {(roadToParent && roadToParent.leftToFather && roadToParent.leftToFather > 1) ?
          <div>{roadToParent.leftToFather}
            метрів {roadToParent && roadToParent.words.split(' ')[1]}</div> : null}
        {(roadToParent && roadToParent.topToFather && roadToParent.topToFather > 1) ?
          <div>{roadToParent.topToFather} метрів {roadToParent && roadToParent.words.split(' ')[0]} </div> : null}
      </div>
    );
  }
}