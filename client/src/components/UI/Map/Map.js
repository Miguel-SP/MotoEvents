import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import credentials from './credentials'



const AnyReactComponent = ({ text }) => <div>{text}</div>

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 40.416775,
            lng: -3.703735
        },
        zoom: 10
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: credentials.KEY}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap