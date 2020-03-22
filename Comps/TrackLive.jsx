import React, { Component } from 'react';
import { Text, View , SafeAreaView , StyleSheet , FlatList } from 'react-native';
import {Card} from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { ListItem , Image } from 'react-native-elements';
import {Selects} from 'queryfire';
import publicIP from 'react-native-public-ip';
import * as firebase from 'firebase'


class TrackLive extends Component {

     async componentDidMount () {

      //   // Get IP Address On Login
      //   publicIP().then(ip => {MyIP = ip })

      //  // Push IP Address to Firebase:Consider User Online
      //  firebase.database().ref("/Live").push({IP:MyIP})



      //   // Time Interval : Each Minute >> Subtract offline users after oneminute
      //    setTimeout(function(){ this.SubtractOffline(MyIP) }, 60000);          

               //  Replace IP List    
               
               
//---------------------------------------------------------------------------------------------------
     // Replace online ips every 30 seconds
        //  setInterval(function(){
        //    firebase.database().ref('/Live').remove().then(() => {
        //       publicIP().then(ip => {
        //       MyIP = ip ;
        //       firebase.database().ref('/Live').push({IP:MyIP})              
        //      }) 
        //    })

                                  
        //   }, 20000);          












                        
       }

     constructor () {      
       super() 
       this.state = { 
              
       }     
     }
     
     SubtractOffline = async (MeIp) => {

    //      //  Get All Online (IPs) Previous Minute
    //      var All_IPs = await Selects('/Live')
         
    //      //  Prepare All Current IP Addreses
    //      firebase.database().ref('/Current').push({IP:MeIp})
    //      var Current_IPs = await Selects('/Current')
                 

    //   //  ForEach Previous :: Is Online Now ? No : Set Offline
    //   All_IPs.forEach((PrevIP) => {         
    //      Current_IPs.forEach((CIP) => {
    //          if(PrevIP.IP === CIP.IP){
    //              console.log("Still Online")
    //          } 
    //     })
    //     // Set Offline
    //     console.log("Setting Ofline")                                              
    //  })

     }
     

    render() {
          return (          
            <View>                                     
           </View>    
          );
       
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
})

export default TrackLive;



var MyIP = ""