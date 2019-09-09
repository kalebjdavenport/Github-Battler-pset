import React from 'react'

export default class Hover extends React.Component {
    state = {
        hover: false
    }

    mouseOver = () => {
        this.setState({
            hover: true
        })
    }

    mouseOut = (id) => {
        this.setState({
            hover: false
        })
    }

    render() {

        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.children(this.state.hover)}
            </div>
        )
    }
}