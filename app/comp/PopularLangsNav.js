import React from 'react'
import PropTypes from 'prop-types'

export default function PopularLangsNav({selected, onUpdateLanguage}) {
    const langs = ['All', 'JavaScript', 'Python', 'Java', 'Go', 'Swift', 'Rust', 'Erlang', 'C++']

    return (
        <ul className="flex-center">
            {langs.map(lang => (
                <li key={lang}>
                    <button 
                    className="btn-clear nav-link cursor"
                    style={lang === selected ? {color: 'rgb(187, 46, 31)'} : null }
                    onClick={() => onUpdateLanguage(lang)}>
                        {lang}
                    </button>
                </li>
            ))}
        </ul>
    )
}

PopularLangsNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}