// import React, { Component } from 'react'
// import { ResponsiveRadar } from '@nivo/radar'
// import Spinner from './../Spinner'

// import MotoService from './../../../service/MotoService'
// import UserService from './../../../service/UserService'


// class Radar extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             motorbike: {
//                 brand: '',
//                 model: '',
//                 power: '',
//                 torque: '',
//                 displacement: '',
//                 weight: '',
//                 price: '',
//                 image_url: ''
//             },
//             friendmotorbike: {
//                 brand: '',
//                 model: '',
//                 power: '',
//                 torque: '',
//                 displacement: '',
//                 weight: '',
//                 price: '',
//                 image_url: ''
//             }
//         }

//         this.MotoService = new MotoService()

//         this.UserService = new UserService()
//     }

//     componentDidMount = () => {

//         this.MotoService
//             .getMoto()
//             .then(response => this.setState({ motorbike: response.data }))
//             .catch(err => console.log(err))
        
//         this.UserService
//             .getProfile(this.props.match.params.id)
//             .then(response => this.setState({ friendmotorbike: response.data.userMotorbike }))
//             .catch(err => console.log(err))
        
//     }

//     render() {

//         return (
//             !this.state ? <Spinner /> :

//                 <ResponsiveRadar
//                     data={[this.state.motorbike, this.state.friendmotorbike, {
//                         "brand": "Ducati",
//                         "model": "Panigale",
//                         "power": 214,
//                         "torque": 12.6,
//                         "displacement": 1100,
//                         "weight": 175,
//                         "price": 25500,
//                         "image_url": "https://a.mcdn.es/mnet_ft//DUCATI/Panigale_V4/32708MG.jpg/660x/"
//                     }]}
//                     keys={['power', 'torque', 'displacement', 'weight']}
//                     indexBy='model'
//                     maxValue={200}
//                     margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
//                     curve="linearClosed"
//                     borderWidth={2}
//                     borderColor={{ from: 'color', modifiers: [] }}
//                     gridLevels={5}
//                     gridShape="circular"
//                     gridLabelOffset={36}
//                     enableDots={true}
//                     dotSize={10}
//                     dotColor={{ from: 'color', modifiers: [] }}
//                     dotBorderWidth={0}
//                     dotBorderColor={{ from: 'color', modifiers: [] }}
//                     enableDotLabel={true}
//                     dotLabel="index"
//                     dotLabelYOffset={-12}
//                     colors={{ scheme: 'set1' }}
//                     fillOpacity={0.3}
//                     blendMode="multiply"
//                     animate={true}
//                     motionStiffness={90}
//                     motionDamping={15}
//                     isInteractive={true}
//                     legends={[
//                         {
//                             anchor: 'top-left',
//                             direction: 'column',
//                             translateX: -50,
//                             translateY: -40,
//                             itemWidth: 80,
//                             itemHeight: 20,
//                             itemTextColor: '#999',
//                             symbolSize: 12,
//                             symbolShape: 'circle',
//                             effects: [
//                                 {
//                                     on: 'hover',
//                                     style: {
//                                         itemTextColor: '#000'
//                                     }
//                                 }
//                             ]
//                         }
//                     ]}
//                 />
//         )
//     }
// }

// export default Radar