import React, {Component, PropTypes} from 'react'

export default class Box extends Component {
  styles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move'
  }
  static propTypes = {
    title: PropTypes.string,
    yellow: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return this.props.yellow !== nextProps.yellow
  }

  render() {
    const {title, yellow} = this.props
    const backgroundColor = yellow
      ? 'yellow'
      : 'white'
    const borderRadius = '25px'
    return (
      <div
        style={{...this.styles,backgroundColor,borderRadius}}>
        {title}
      </div>
    )
  }
}