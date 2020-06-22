import React from 'react'
import PropTypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import ThemeContext from '../contexts/theme'

function Instructions() {

    const { theme } = React.useContext(ThemeContext)
    return (
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
    )
}

const PlayerPreview = ({ username, label, onReset }) => {

    const { theme } = React.useContext(ThemeContext)

    return (
        <div className="column player">
            <h3 className="player-label">{label}</h3>
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
        </div>)
}

function PlayerInput(props) {

    const [username, setUsername] = React.useState('')
    const { theme } = React.useContext(ThemeContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        props.onSubmit(username)
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="column player">
            <label htmlFor="username" className="player-label">{props.label}</label>
            <div className="row player-input">
                <input
                    type="text"
                    id="username"
                    className={`input-${theme}`}
                    placeholder="Github username"
                    autoComplete="off"
                    value={username}
                    onChange={updateUsername}
                />
                <button className={`btn btn-${theme}`} type="submit" disabled={!username}>Submit</button>
            </div>
        </form>
    )
}

export default function Battler() {
    const [{ playerOne, playerTwo }, setPlayers] = React.useState({
        playerOne: null,
        playerTwo: null
    })

    const handleSubmit = (id, player) => {
        setPlayers({
            playerOne,
            playerTwo,
            [id]: player
        })
    }

    const handleReset = (id) => {
        setPlayers({
            playerOne,
            playerTwo,
            [id]: null
        })
    }

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
                            onSubmit={(player) => handleSubmit('playerOne', player)}
                        />
                        : <PlayerPreview
                            username={playerOne}
                            label="Player One"
                            onReset={() => handleReset('playerOne')}
                        />
                    }
                    {playerTwo === null
                        ? <PlayerInput
                            label="Player Two"
                            onSubmit={(player) => handleSubmit('playerTwo', player)}
                        />
                        : <PlayerPreview
                            username={playerTwo}
                            label="Player Two"
                            onReset={() => handleReset('playerTwo')}
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
