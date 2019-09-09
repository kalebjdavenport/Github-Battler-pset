import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'

export default function Card ({ header, subheader, avatar, href, name, children }) {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className={`bg-${theme} wrapper`}>
                    <h4 className="header-lg center-text">
                        {header}
                    </h4>
                    <img 
                        className='avatar' 
                        src={avatar} 
                        alt={`Avatar for ${name}`}
                    />
                    {subheader && (
                        <h4 className="center-text header-sm">
                            {subheader}
                        </h4>
                    )}
                    <h2 className="center-text">
                        <a href={href}>{name}</a>
                    </h2>
                    { children }
                </div>
            )}
        </ThemeConsumer>
    )
}

Card.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}