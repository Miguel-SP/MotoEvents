import React from "react"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapWithAMarker = withScriptjs(withGoogleMap(props => {
    
    console.log(props.location.coordinates[0])
    return (
        
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.location.coordinates[0], lng: props.location.coordinates[1] }}>
    
            <Marker position={{ lat: props.location.coordinates[0], lng: props.location.coordinates[1]}} />
    
    </GoogleMap>

    )
}

))

export default MapWithAMarker


//lat: 40.416775,
//lng: -3.703735