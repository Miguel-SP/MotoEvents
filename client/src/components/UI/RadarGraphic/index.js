import React, { Component } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

import MotoService from './../../../service/MotoService'

class Radar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            motorbike: ''
        }

        this.MotoService = new MotoService()
    }

    componentDidMount = () => {

        this.MotoService
            .getMoto()
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        return (

            <ResponsiveRadar
                data={this.state.motorbike}
                keys={['power', 'torque', 'displacement', 'weight', 'price']}
                indexBy="model"
                maxValue="auto"
                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{ from: 'color' }}
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={36}
                enableDots={false}
                dotSize={10}
                dotColor={{ theme: 'background' }}
                dotBorderWidth={2}
                dotBorderColor={{ from: 'color' }}
                enableDotLabel={true}
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{ scheme: 'reds' }}
                fillOpacity={0.6}
                blendMode="normal"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                isInteractive={true}
            />
        )
    }
}

export default Radar