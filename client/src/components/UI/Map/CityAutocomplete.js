import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class CityAutocomplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            coordinates: ''
        }

    }

    handleChange = city => {
        this.setState({ city })
    }

    handleSelect = city => {
        geocodeByAddress(city)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({ ...this.state, coordinates: latLng, city: city }))
            .then(() => this.props.getTheCity(this.state))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <PlacesAutocomplete value={this.state.city} onChange={this.handleChange} onSelect={this.handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input className="form-control" {...getInputProps({ placeholder: 'Busca una dirección' })}/>
                            <div >
                                {loading && <span>Loading...</span>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item'
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, className)}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </>
        )
    }
}

export default CityAutocomplete