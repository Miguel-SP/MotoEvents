import React from 'react'

import { ResponsiveRadar } from '@nivo/radar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

import data from './../../../motorbikes.json'

const Radar = () => (
    <ResponsiveRadar
        data={data}
        keys={['power', 'weight', 'price']}
        indexBy="taste"
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

export default Radar