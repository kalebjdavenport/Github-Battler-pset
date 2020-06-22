import React from 'react'

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

export default function Loading({ text = 'Loading', speed = 250 }) {
    const [content, setContent] = React.useState(text)

    React.useEffect(() => {
        const interval = window.setInterval(() => {
            if (content === text + '...') {
                setContent(text)
            } else {
                setContent((prev) => prev + '.')
            }
        }, speed)
        return () => window.clearInterval(interval)
    })

    return (
        <p style={styles.content}>
            {content}
        </p>
    )
}
