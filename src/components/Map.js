import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'
import { useState } from 'react'
import locationIcon from '@iconify/icons-mdi/fire'
import volcano15 from '@iconify-icons/maki/volcano-15';

const Map = ({ center, zoom, eventData, switchState }) => {

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

    const getMapOptions = (maps) => {
        return {
            mapTypeControl: false,
            streetViewControl: false,
            styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 13
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#144b53"
                    },
                    {
                        "lightness": 14
                    },
                    {
                        "weight": 1.4
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#08304b"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0c4152"
                    },
                    {
                        "lightness": 5
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#0b434f"
                    },
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#0b3d51"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#146474"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#021019"
                    }
                ]
            }
        ],
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
