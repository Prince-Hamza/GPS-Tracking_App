import React, { Component } from 'react';
import { Text, View , StyleSheet  } from 'react-native';
import {Card } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';;
import TrackLive from './TrackLive'
import {Selects} from 'queryfire';
import _ from 'lodash';
import {expoLocation} from './location.js'
import * as firebase from 'firebase'



class Menu extends Component {

    async componentDidMount () {  

         var Cstmrz = await Selects ('/Users');    
         var Specific =  _.filter(Cstmrz, { 'Email': this.props.Email });
         this.setState({UserInfo: Specific , Complete:true ,Role: Specific[0].Role})
         console.log(Specific)

         var location = await expoLocation()
         firebase.database().ref('/Users/' + this.props.Email.split(".").join(""))
         .update({coords:location.coords})


         

     }

     constructor (props) {      
       super(props) 
       this.state = {    
         UserInfo : [],
         Complete:false,
         Role: ''
       }
     }  

  render() {
    if (this.state.Complete) {
    return (
        <View style={styles.container}>  

 <Card
  title='Selection Menu'
  image={require('./CarIcon.png')}>      
  <Text style={{marginBottom: 10}}>
    The idea of GPS Tracking System App is more about Customer Satisfaction than anything else
  </Text>

  <Card onPress ={() => { Actions.Profile({ DisplayUser: this.state.UserInfo[0]        })          }} >
      <Text onPress ={() => { Actions.Profile({ DisplayUser: this.state.UserInfo[0]}) }} >
          My Profile
      </Text>
  </Card>


{this.state.Role == "Individual_Customers"  && 
<Card onPress ={() => { Actions.CustomerSearch() }} >
      <Text onPress ={() => { Actions.CustomerSearch() }} >
          Individual Customers
      </Text>
  </Card>
}
  
{this.state.Role == "Car_Customers" &&

<Card onPress ={() => { Actions.RideSearch() }} >
<Text onPress ={() => { Actions.RideSearch({Info: this.state.UserInfo[0]}) }} >
    Car Customers
</Text>
</Card>

}

{this.state.Role == "Car_Customers" && 
 <Card onPress ={() => { Actions.Invitations({Info:this.state.UserInfo[0]   }) }} >
 <Text onPress ={() => { Actions.Invitations({Info:this.state.UserInfo[0]   }) }} >
     Invitations
 </Text>
</Card>

}
  
{this.state.Role == "Admin" && 
 <Card onPress ={() => { Actions.Admin({Info:this.state.UserInfo[0]   }) }} >
 <Text onPress ={() => { Actions.Admin({Info:this.state.UserInfo[0]   }) }} >
   Manage
 </Text>
</Card>

}


  <Card onPress ={() => { Actions.GPSInfo({Info:this.state.UserInfo[0]}) }} >
      <Text onPress ={() => { Actions.GPSInfo({Info: this.state.UserInfo[0]}) }} >
          Ride
      </Text>
  </Card>


</Card>  

<TrackLive />

      </View>
    ); }
    return null
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    welcome: {
      fontSize: 18,  
      margin: 100,
      color: '#222',
      fontFamily:'serif'
    },
  
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      color:'#222'
  },

  
  
  
  });

export default Menu;


