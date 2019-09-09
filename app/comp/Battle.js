import React from 'react'
import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { ThemeConsumer } from '../contexts/theme'

function Instructions() {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className="instruction-container">
                    <h1 className='center-text header-lg'>
                        How it Works
                    </h1>
                    <ol className='container-sm grid battle-instructions'>
                        <li>
                            <h3 className="header-sm">pick two GitHub users</h3>
                            <FaUserFriends className={`bg-${theme}`} color='rgb(255, 191, 116)' size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm">battle</h3>
                            <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm">see the winners</h3>
                            <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140} />
                        </li>
                    </ol>
                </div>
            )}
        </ThemeConsumer>
    )
}

const PlayerPreview = ({ username, label, onReset }) => (
    <ThemeConsumer>
        {({ theme }) => (
            <div className="column player">
                <h3 className="player-label">{ label }</h3>
                <div className={`row bg-${theme}`}>
                    <div className="player-info">
                        <img 
                            className="avatar-sm"
                            src={`https://github.com/${username}.png?size=100`} 
                            alt={`Avatar for ${username}`} 
                        />
                        <a 
                            href={`https://github.com/${username}`}
                            className="link"
                        >
                            {username}
                        </a>
                    </div>
                    <button
                        onClick={onReset}
                        className="btn-clear flex-center"
                    >
                        <FaTimesCircle 
                            color='rgb(194, 57, 42)'
                            size={26}
                        />
        
                    </button>
                </div>
            </div>
        )}
    </ThemeConsumer>
)

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
    propTypes = {
        onSubmit: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired
    }

    state = {
        username: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    updateUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <form onSubmit={this.handleSubmit} className="column player">
                        <label htmlFor="username" className="player-label">{ this.props.label }</label>
                        <div className="row player-input">
                            <input 
                                type="text"
                                id="username"
                                className={`input-${theme}`}
                                placeholder="Github username"
                                autoComplete="off"
                                value={this.state.username}
                                onChange={this.updateUsername}
                            />
                            <button className={`btn btn-${theme}`} type="submit" disabled={ !this.state.username }>Submit</button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
}

export default class Battler extends React.Component {
    state = {
            playerOne: null,
            playerTwo: null,
    }

    resetState = () => {
        this.setState({
            playerOne: null,
            playerTwo: null,
            battle: false
        })
    }

    handleSubmit = (id, player) => {
        this.setState({
            [id]: player
        })
    }

    handleReset = (id) => {
        this.setState({
            [id]: null
        })
    }

    render() {
        
        const { playerOne, playerTwo } = this.state

        return (
            <React.Fragment>
                <Instructions />
                <div className="players-container">
                    <h1 className="center-text header-lg">
                        Players:
                    </h1>
                    <div className="row space-around">
                        {playerOne === null
                          ? <PlayerInput
                                label="Player One"
                                onSubmit={(player) => this.handleSubmit('playerOne', player)}
                            />
                          : <PlayerPreview 
                                username={playerOne} 
                                label="Player One"
                                onReset={() => this.handleReset('playerOne')}
                            />
                        }
                        {playerTwo === null
                          ? <PlayerInput
                                label="Player Two"
                                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                            />
                          : <PlayerPreview
                                username={playerTwo}
                                label="Player Two"
                                onReset={() => this.handleReset('playerTwo')}
                            />
                        }
                    </div>

                    <div className="flex-center">
                        {playerOne && playerTwo && (
                            <Link 
                                className="btn btn-dark btn-space"
                                to={{
                                    pathname: '/battle/results',
                                    search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                                }}>
                                    Battle
                            </Link>
                        )}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}