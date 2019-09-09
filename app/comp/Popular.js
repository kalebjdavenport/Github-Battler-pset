import React from 'react'
import { fetchPopularRepos } from '../utils/api'
import PropTypes from 'prop-types'
import { FaUser, FaStar, FaCodeBranch, FaExplamationTriagle, FaExclamationTriangle } from 'react-icons/fa'

// Class Components
import Card from '../comp_classes/Card'
import Tooltip from '../comp_classes/Tooltip'

// Components
import PopularLangsNav from './PopularLangsNav.js'
import Loading from './Loading'

function ReposGrid ({ repos }) {
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return (
                    <li key={html_url} className='card'>
                        <Card
                            header={`#${index + 1}`}
                            avatar={avatar_url}
                            href={html_url}
                            name={login}
                        >
                            <ul className='card-list'>
                                <li>
                                    <Tooltip message="Github Username">
                                        <FaUser color='rgb(255, 191, 116)' size={22} />
                                        <a href={`https://github.com/${login}`}>{login}</a>
                                    </Tooltip>
                                </li>
                                <li>
                                    <FaStar color='rgb(255, 215, 0)' size={22} />
                                    {stargazers_count.toLocaleString()} stars
                                </li>
                                <li>
                                    <FaUser color='rgb(129, 195, 245)' size={22} />
                                    {forks.toLocaleString()} forks
                                </li>
                                <li>
                                    <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                    {open_issues.toLocaleString()} open
                                </li>
                            </ul>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.protoTypes = {
    repos: PropTypes.object.isRequired
}

export default class Popular extends React.Component {

    state = {
        selectedLanguage: 'All',
        repos: {},
        error: null,
        loading: true
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
        
    }

    updateLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null,
            loading: !this.state.repos[selectedLanguage] ? true : false
        })
        if (!this.state.repos[selectedLanguage]) {
            try {
                fetchPopularRepos(selectedLanguage).then(data => this.setState(({repos}) => ({
                    repos: {
                        ...repos,
                        [selectedLanguage]: data,
                    },
                    loading: false
                })))
            } catch (e) {
                console.warn('Error fetching repos: ', e)
    
                this.setState({
                    error: 'There was an error fetching the repositories'
                })
            }
        }
        
    }

    render () {
        const { selectedLanguage, repos, error, loading } = this.state
        
        return (
            <React.Fragment>
                <PopularLangsNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {loading && <Loading text="Fetching repos" />}
                {error && <p className="center-text error">{error}</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        )
    }
}