import React, { Component } from 'react';
import { Text, View ,TouchableOpacity , SafeAreaView , ScrollView , StyleSheet , Button , Image , Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {RouteMagic} from './MakeRoute'
import * as firebase from 'firebase'
import RidersList from './DriverList.jsx'


export default class MapTails extends Component {  

   async componentDidMount () { 
    var R = await RouteMagic(this.props.Start , this.props.Finish , this.map)
    this.setState ({Route : R})

    console.log(this.state.RiderMail)


    }


  constructor () {      
      super() 
      this.state = {
        mapRegion : { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }                ,
        Route: null   ,
        RiderMail :null,
        RiderLoc:null
      }     
  } 

  getRiderInfo = (data) => {

console.log(data.coords.latitude)
console.log(data.coords.longitude)

this.setState({RiderLoc:data.coords})
    
  }


  InviteRider = (RiderEmail , RideInfo) => {
     firebase.database().ref('/Users/' + RiderEmail + '/Invitations/' + this.props.ID)
     update({
       ID:this.props.ID,
       Start:this.props.Start,
       End:this.props.Finish              
     })
    
    alert("Rider Invited")

  }


  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

     
     <MapView 
           initialRegion = { { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }   }
           style={{ alignSelf: 'stretch', height: Dimensions.get('window').height - 150 }} 
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
           
            {this.props.Start != null &&
              <MapView.Marker
              coordinate =  { this.props.Start }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}  
              identifier={'mk1'}     > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.props.Finish != null &&
              <MapView.Marker
              coordinate =  { this.props.Finish }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk2'}   > 
             <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.state.RiderLoc != null &&
              <MapView.Marker
              coordinate =  { this.state.RiderLoc }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk3'}   > 
             <Image source = {require('./GreenCar.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }




            {this.state.Route !== null && 
              <MapView.Polyline
		          coordinates={this.state.Route}
		          strokeColor="hotpink" 
	              strokeWidth={12}
    	        />  
            }


      </MapView>     

{this.state.RiderMail != null &&

       <TouchableOpacity onPress = {() => {this.Pass(invi)}} >
          <View style =  {styles.Heading} >
             <Text style = {styles.ListText} > {this.state.RiderMail}  </Text>                                           
          </View>
       </TouchableOpacity>

}
     

      <TouchableOpacity  >
                    <View style =  {styles.Heading} >
                       <Text style = {styles.ListText} > Customer  </Text>          
                       <Text></Text>      
                       <Text></Text>                               
                         
                       <Text style = {styles.ListText} >  {this.props.CustomerMail}  </Text>                                           
                    </View>
      </TouchableOpacity>
      <Text></Text>
     


      {this.props.Role == "Car_Customers"  &&
      <Button title = "Accept Invitation" onPress = {() => {
        //   firebase.database().ref('/Users/' + this.props.Mail + '/MyRides/' + this.props.ID)
        //   .update({Distance:"12.3 km"})
        alert("Invitation Accepted")
      }} >
      </Button>
      }
       
        {this.props.Role !== "Car_Customers" && 
     <TouchableOpacity  >
        <View style =  {styles.Heading} >
            <Text style = {styles.ListText} > Invite a Driver  </Text>                                           
        </View>
     </TouchableOpacity> 
        }


        <RidersList SendInfo = {this.getRiderInfo} Invite = {this.InviteRider} />
        


      
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
    },
    ListText :{
      alignSelf:'center',
      fontSize: 14,
      color: "magenta",
      fontFamily:'monospace'
    },
    Heading: {
      backgroundColor:"white" , 
      width:Dimensions.get('window').width ,
      height:100 ,
      alignItems:'center',
      justifyContent:"center",
      marginBottom:1
    }

  
  
  });

