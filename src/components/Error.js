import React from 'react'
import { Alert } from 'react-bootstrap'

const Error = ({ variant = "danger", children}) => {
    return (
        <Alert variant={variant} style={{ fontsize: 20}}>
            <strong>{children}</strong>
            </Alert>
    )
}

export default Error
