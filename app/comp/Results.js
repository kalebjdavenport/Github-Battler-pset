import React from 'react'
import PropTypes from 'prop-types'

// Utilities
import { battle } from '../utils/api'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

// Class Components
import Card from '../comp_classes/Card'
import Tooltip from '../comp_classes/Tooltip'

// Components
import Loading from '../comp/Loading'

// Fonts
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'

function ProfileList ({ profile }) {
    return (
        <ul className="card-list wrapper">
            <li>
                <FaUser color="rgb(239, 115, 115)" size={22} />
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <Tooltip message="User's Location">
                        <FaCompass color="rgb(144, 115, 255)" size={22} />
                        {profile.location}
                    </Tooltip>
                </li>
            )}
            {profile.company && (
                <li>
                    <Tooltip message="User's Company">
                        <FaBriefcase color="#795548" size={22} />
                        {profile.company}
                    </Tooltip>
                </li>
            )}
            <li>
                <FaUser color="rgb(129, 195, 245)" size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUser color="rgb(64, 183, 95)" size={22} />
                {profile.following.toLocaleString()} followers
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {

    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true 
    }

    componentDidMount () {
        const { playerOne, playerTwo, } = queryString.parse(this.props.location.search)

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }

    render () {
        const { winner, loser, error, loading } = this.state

        if (loading) {
            return <Loading />
        }

        if (error) {
            return <p className="center-text error">Houston, we have a problem: {error}</p>
        }

        return (
            <React.Fragment>
                <div className="grid space-around container-sm">
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={winner.score.toLocaleString()}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login}
                    >
                        <ProfileList profile={winner.profile} />
                    </Card>
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader={loser.score.toLocaleString()}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.login}
                    >
                        <ProfileList profile={loser.profile} />
                    </Card>
                </div>
                <div className="flex-center">
                    <Link
                        to='/battle/'
                        className="btn btn-dark btn-space"
                        >Reset
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}