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
            .then(response => this.setState({ motorbike: response.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            !this.state ? <h2>Cargando...</h2> :

                <ResponsiveRadar
                    data={[
                        {
                            "brand": "HARLEY DAVIDSON",
                            "model": "Sportster 883 Iron",
                            "power": 52,
                            "torque": 7,
                            "displacement": 883,
                            "weight": 260,
                            "price": 9000,
                            "image_url": "https://a.mcdn.es/mnet_ft//HARLEY_DAVIDSON/Sportster/4669/16614MG.jpg/660x/"
                        },
                        {
                            "brand": "BMW ",
                            "model": "R 1250 GS Adventure",
                            "power": 136,
                            "torque": 14.5,
                            "displacement": 1254,
                            "weight": 238,
                            "price": 19950,
                            "image_url": "https://a.mcdn.es/mnet_ft//BMW/R_1250_GS_Adventure/33787MG.jpg/660x/"
                        },
                        this.state.motorbike
                    ]}
                    keys={['power', 'torque', 'displacement', 'weight']}
                    indexBy='model'
                    maxValue={200}
                    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                    curve="linearClosed"
                    borderWidth={2}
                    borderColor={{ from: 'color', modifiers: [] }}
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={10}
                    dotColor={{ from: 'color', modifiers: [] }}
                    dotBorderWidth={0}
                    dotBorderColor={{ from: 'color', modifiers: [] }}
                    enableDotLabel={true}
                    dotLabel="index"
                    dotLabelYOffset={-12}
                    colors={{ scheme: 'set1' }}
                    fillOpacity={0.3}
                    blendMode="multiply"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={true}
                    legends={[
                        {
                            anchor: 'top-left',
                            direction: 'column',
                            translateX: -50,
                            translateY: -40,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemTextColor: '#999',
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
        )
    }
}

export default Radar