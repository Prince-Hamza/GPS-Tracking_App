import React, { Component } from 'react';
import { Text, View , TextInput , SafeAreaView , ScrollView , StyleSheet , Button , Image , Dimensions } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {expoLocation}  from './location'
import MapView from 'react-native-maps';
import UIButton from './Button.jsx'
import Polyline from '@mapbox/polyline';



export default class GPS3 extends Component {  

    async componentDidMount () { 
   // this.props.Info
   // alert(this.props.LiveID)

 this.setState({Start:this.props.Start , Finish:this.props.Finish})

 setInterval(()=> {
   this.Update();
   this.Synchronize()
 } , 3000)




    }

  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 } ,
        UserEmail:'',
        DriverEmail:'',
        CustomerCoords : null,
        DriverCoords:""       

      }     
  } 

  // Send Coordinates To Firebase Databse
  Update = async () => {    
    var location = await expoLocation();  


    if(this.props.Info.Role == "Individual_Customers"){
           firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/CustomerCoords')
           .update({location})
    } 
    else if(this.props.Info.Role == "Car_Customers"){
           firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/DriverCoords')
           .update({location})
    }
    else{
      alert("User Not Identified")
    }

    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.2, longitudeDelta: 0.02 }});
  }

   // Read Coordinates From Firebase Databse

   Synchronize = () => {
     console.log(this.props.LiveID)

     firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/CustomerCoords')
     .on('value' , ((coords)=> {
       var Coords = coords.val();
       if(Coords !== null) {       console.log( "Customer Location: " + coords);  }
       this.setState({CustomerCoords: Coords})
     }))


     firebase.database().ref('/DrivesLive/' + this.props.LiveID + '/DriverCoords')
     .on('value' , ((coords)=> {
       var Coords = coords.val()     ;
       if(Coords !== null) {       console.log( "Driver Location: " + coords);  }  
       this.setState({DriverCoords: Coords})
     }))



   }


 
 



  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

     
     <MapView 
           initialRegion = { { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }   }
           style={{ alignSelf: 'stretch', height: Dimensions.get('window').height  }} 
           showsUserLocation = {true}
           showsCompass = {true}
           zoomEnabled= {true}
           ref = {map => {this.map = map} }
           onMapReady = {() => {this.map.fitToSuppliedMarkers(["mk1" , "mk2"], {
                                edgePadding: {
                                bottom: 200, right: 50, top: 150, left: 50,                                       },
                                animated: true,
                                }); }}
           > 
           
            {this.props.Start !== null &&
              <MapView.Marker
              coordinate =  { this.state.Start }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}  
              identifier={'mk1'}     > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.props.Finish !== null &&
              <MapView.Marker
              coordinate =  { this.state.Finish }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk2'}   > 
             <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }


            {this.props.Route !== null && 
              <MapView.Polyline
		          coordinates={this.props.Route}
		          strokeColor="hotpink" 
	              strokeWidth={12}
    	        />  
            }


      </MapView>         



      
        </ScrollView>
        </SafeAreaView>
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
    },
    scrollView: {
        backgroundColor: 'lightgray',
        marginHorizontal: 0,
        width:Dimensions.get('window').width,    
    }
  
  
  });

