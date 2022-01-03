import React from 'react'

export const Notification = ({ message }) => {

    let style = ""

    if (message[0] === null) {
        return null
    }

    if (message[1]) {
        style = "warning"
    }
    else {
        style = "notification"
    }

    return (
        <div className={style}>
            {message}
        </div>
    )
}