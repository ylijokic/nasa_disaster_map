import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
import { useState } from 'react'
import locationIcon from '@iconify/icons-mdi/fire'
import volcano15 from '@iconify-icons/maki/volcano-15';
import mapStyles from '../mapStyles'

const Map = ({ center, zoom, eventData, switchState, theme }) => {

    const [locationInfo, setLocationInfo] = useState(null)
    const [active, setActive] = useState(false)

    const updateActive = () => {
        setActive(!active)
    }

    const markers = eventData.map((ev, index) => {
        let coordinates = ev.geometries[0].coordinates
        if (ev.categories[0].id === 8 && switchState.fire) {
            return <LocationMarker 
                        key = {index}
                        lat={ev.geometries[0].coordinates[1]} 
                        lng={ev.geometries[0].coordinates[0]}
                        onClick={() => {
                            setLocationInfo({ id: ev.id, title: ev.title})
                            setActive(true)
                            }
                        }
                        icon={locationIcon}
                    />
        } else if (ev.categories[0].id === 12 && switchState.volcano) {
            return <LocationMarker 
                        key = {index}
                        lat={coordinates.length === 2 ? coordinates[1] : null}
                        lng={coordinates.length === 2 ? coordinates[0] : null}
                        onClick={() => {
                            setLocationInfo({ id: ev.id, title: ev.title})
                            setActive(true)
                            }
                        }
                        icon={volcano15}
                    />
        }   return null
    })

    let styles = []
    if (theme === "Street" || theme === "") {
        styles = mapStyles["Street"]
    } else if (theme === "Dark") {
        styles = mapStyles["Dark"]
    } else {
        styles = mapStyles["Retro"]
    }

    const getMapOptions = (maps) => {
        return {
            mapTypeControl: false,
            streetViewControl: false,
            styles: styles,
        }
    }

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${process.env.REACT_APP_WEATHER_API_KEY}`}}
                defaultCenter={ center }
                defaultZoom={ zoom }
                options={getMapOptions}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox active={active} updateActive={updateActive} info={locationInfo}/>}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 5
}

export default Map
