import React, { Component } from 'react';
import { Text, View , TextInput , StyleSheet , Button , Image , Dimensions } from 'react-native';
import { Input , Slider  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {expoLocation}  from './location'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Polyline from '@mapbox/polyline';


const Api_Key = "AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA"




export default class GPS extends Component {  

   async componentDidMount () { 
    
        //this.On_Location_Update()
       // var location = await expoLocation(); 

        
      //  this.setState({Coords : ({ "latitude":location.coords.latitude,"longitude":location.coords.longitude})  })
      //  this.setState({TargetCoords: ({"latitude":this.props.TargetLatitude,"longitude":this.props.TargetLongitude })  })

        //alert(JSON.stringify(this.state.Coords))
        //alert(JSON.stringify(this.state.Coords))
alert("Welcome")

     //   this.getDirections(Start , Finish)
      // this.On_Location_Update()
      // this.getDirections()


        
    
    }

  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude:  35.716122, longitude:  139.7436063, latitudeDelta: 3, longitudeDelta: 3 }  ,
        Location: {coords: { latitude: 37.78825, longitude: -122.4324}},
        Coords:({latitude:0,longitude:0}),
        TargetCoords: null,
        latitude: 35,
        longitude:72,
        Targetlatitude: 0,
        Targetlongitude:0,
        zoomX:0.1,
        zoomY:0.1,
        RouteCoordinates: [],
        Points:[],
        AlterCoords:[]

      }     
  }  





  async getDirections(startLoc, destinationLoc) {

    var origin = startLoc.latitude + "," + startLoc.longitude
    var final =  destinationLoc.latitude + "," + destinationLoc.longitude
   // console.log(final), //console.log(final)


    try {
       let resp = await fetch("https://maps.googleapis.com/maps/api/directions/json?origin= " + origin + "&destination=" + final + "&alternatives=true&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
       // let resp = await fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA')
       //  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${destination.latitude},${destination.longitude}&mode=walking&key=YOUR_API_KEY`)

        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let points2 =  Polyline.decode(respJson.routes[0].legs[0].steps[0].polyline.points)
        
   

        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })


    //let coords2 = points2.map((point, index) => { return  { latitude : point[0], longitude : point[1]  }  })

        this.setState({RouteCoordinates: coords , AlterCoords:coords2})
        
       // alert( JSON.stringify(coords));

        return coords
    } catch(error) {
        //alert(error)
        return error
    }
}



  // On_Location_Update = async () => {    
  //  // console.log("Updating Map")
  //   var location = await expoLocation();    
  //   var COORD = location.coords;

  //   /* SHOULD only first time */
  //   this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.001, longitudeDelta:0.001 }  });
  //   /* SHOULD only first time */

  //   this.setState({Coords:location.coords , latitude : COORD.latitude , longitude : COORD.longitude})
  //  // alert( JSON.stringify ( this.state.mapRegion))

  //  let concatLot = this.state.latitude +","+this.state.longitude;
  //  let TargetLot = this.props.TargetLatitude +","+ this.props.TargetLongitude;

   



  // }



  Map_Update = () => {
    // setInterval(() => {
    //  // this.On_Location_Update()           
    // }, 5000);
  }

  // onRegionChange = (region) => {    
  //    console.log("region change :  " + region.latitudeDelta)
  //    this.setState({
  //      mapRegion : { latitude: region.latitude, longitude: region.longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta }  ,
  //      latitude : region.latitude , longitude : region.longitude,
  //      zoomX : region.latitudeDelta , zoomY: region.longitudeDelta

  //      })
  // }



  render() {
  
    return (
 <View style={styles.container}>    
      


<MapView 
  style={{ alignSelf: 'stretch', height: Dimensions.get('window').height }} 
  region={this.state.mapRegion} 
  pitchEnabled={true}
  showsCompass={true}
  showsBuildings={true}
  showsUserLocation={true}
  showsTraffic={true}
  showsIndoors={true}
  zoomEnabled={true}
  showsMyLocationButton={true}
  
  > 

       <MapView.Marker
         coordinate =  {{ 
         latitude:this.state.latitude,
         longitude:this.state.longitude 
        }}
      > 
      <Image source = {require('./CarIcon.png')} style = {{height:70 , width:150}} />      
      </MapView.Marker>    

      <MapView.Marker
         coordinate =  {{ 
         latitude:this.props.TargetLatitude,
         longitude:this.props.TargetLongitude  }} > 
      <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
      </MapView.Marker>      

      {/* <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={"AIzaSyCfrVNRKH6aohRMV9c99d1zeh-SYmQ7444"}
     /> */}


      <MapView.Polyline
		    coordinates={this.state.RouteCoordinates}
		    strokeColor="hotpink" 
	    	strokeWidth={12}
    	/>  

      <MapView.Polyline
		    coordinates={this.state.AlterCoords}
		    strokeColor="hotpink" 
	    	strokeWidth={12}
    	/>  

         

</MapView>



  
  

      
      </View>
    ); 
   
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    welcome: {
      fontSize: 18,  
      margin: 100,
      color: '#222',
      fontFamily:'serif'
    }  
  
  
  });


  //const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};