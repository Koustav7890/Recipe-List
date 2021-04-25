import React from "react"

export default function TabPanel(props) {
    const { children, value, index, ...other } = props

    return <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
    >
        {value === index && (
            <div>{children}</div>
        )}
    </div>
}