import React from 'react'
import ReactDOM from 'react-dom'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// Components
import Nav from './comp/Nav'
import PageNotFound from './comp/PageNotFound'
import Loading from './comp/Loading'

const Popular = React.lazy(() => import('./comp/Popular'))
const Battler = React.lazy(() => import('./comp/Battle'))
const Results = React.lazy(() => import('./comp/Results'))


// Contexties
import { ThemeProvider } from './contexts/theme'

// Styles
import './index.css'




class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'dark' ? 'light' : 'dark'
            }))
        }
    }

    render () {

        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battler} />
                                    <Route path='/battle/results' component={Results} />
                                    <Route component={PageNotFound} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

const app = document.querySelector('#root')
ReactDOM.render(<App />, app)