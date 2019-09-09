import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content: {
        fontSize: '3.5rem',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '2rem',
        textAlign: 'center'

    }
}

export default class Loading extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
    }

    static defaultProps = {
        text: 'Loading',
        speed: 250
    }

    constructor(props) {
        super(props)
        this.state = {
            content: this.props.text
        }
    }

    componentDidMount() {
        const { speed, text } = this.props

        this.interval = window.setInterval(() => {
            if (this.state.content === text + '...') {
                this.setState({ content: text })
            } else {
                this.setState(({ content }) => ({ content: content += '.'}))
            }
        }, speed)
    }

    render() {

        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }

    componentWillUnmount () {
        window.clearInterval(this.interval)
    }
}