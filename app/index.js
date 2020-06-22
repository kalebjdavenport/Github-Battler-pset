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

import ThemeContext from './contexts/theme'

// Styles
import './index.css'

function App() {

    const [theme, setTheme] = React.useState('light')
    const toggleTheme = () => setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')

    return (
        <Router>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <div className={theme}>
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
            </ThemeContext.Provider>
        </Router>
    )
}

const app = document.querySelector('#root')
ReactDOM.render(<App />, app)
