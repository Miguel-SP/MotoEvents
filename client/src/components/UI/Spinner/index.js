import React, { Component } from 'react'

import Loader from 'react-loader-spinner'

export default class Spinner extends Component {
    //other logic
    render() {
        return (
            <Loader
                type="ThreeDots"
                color="#42AB9E"
                height={200}
                width={200}
                timeout={10000}

            />
        );
    }
}