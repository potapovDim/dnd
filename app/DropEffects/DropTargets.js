import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import Item from './ItemTypes'
import Box from './Box'
import _ from 'lodash'

class BoxWrapper extends Component {
    state = {
        top:250,left:10,
        relative: true
    }
    render(){
        const {top, left , relative} = this.state
        console.log(top,left)
        const { changeBoxPosition} = this.props
        const position = relative ? 'relative' : ''
        return(
            <div style={{
                position: position,
                top : top+'px',
                left: left+ 'px'}}
                onMouseDown = {changeBoxPosition}
                ><Box {...this.props}/>
            </div>
        )
    }
}



export default class DropTargets extends Component{

    changePosition = ({top, left}) => {
        this.box.setState({top,left})
    }


    changeBoxPosition = event => {
        console.log('-----------Change position')
            event.preventDefault()
            const {clientX, clientY} = event

        console.log('-----------Change position')
        const mouseMove = event => {
            const dataPosition = {
                left: event.clientX ,
                top: event.clientY 
            }

            this.changePosition(dataPosition)
            }

        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
            }

            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)
        }
    

    render() {
        const {color} = this.props 
        return (
            <div style = {{
                width: 1000,
                height: 800,
                backgroundColor: color}}>
                <BoxWrapper ref={ref=>this.box=ref}
                changeBoxPosition = {this.changeBoxPosition}/>
            </div>
        )
    }
}
