import React from 'react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/fire'

const LocationMarker = ({ lat, lng, onClick, icon }) => {
    return (
        <div className="location-marker" onClick={onClick}>
            <Icon icon={icon} className={icon === locationIcon ? "fire-icon" : "volcano-icon"}/>
        </div>
    )
}

export default LocationMarker
