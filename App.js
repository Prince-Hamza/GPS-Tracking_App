import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScarletScreen from './Comps/MainScreen';
import { Router, Scene } from 'react-native-router-flux';
import SignUp from './Comps/SignUp';
import firebase from 'firebase'
import GPS from './Comps/GPS.jsx';
import PreStart from './Comps/PreStart.jsx'
import Menu from './Comps/Menu';
import MyProfile from './Comps/MyProfile';
import Messenger from './Comps/Messenger';
import RideSearch from './Comps/RideSearch';
import CustomerSearch from './Comps/CustomerSearch.jsx';
import ChatRoom from './Comps/ChatRoom.jsx'
import Destination from './Comps/Destination';
import Updatish from './Comps/Updatish';
import JustProfile from './Comps/JustProfile';
import GPSInfo from './Comps/GPSInfo.jsx'
import GPS3 from './Comps/GPS3';
import Invitation from './Comps/Invitation'
import MapTails from './Comps/MapTails';
import Admin from './Comps/Admin';




var config = {
  apiKey: "AIzaSyDbLaZK1MOemuxlb9FmAxGoqOs_VjoufkE",
  authDomain: "kidgames-spaceship.firebaseapp.com",
  databaseURL: "https://kidgames-spaceship.firebaseio.com",                
  projectId: "kidgames-spaceship",
  storageBucket: "kidgames-spaceship.appspot.com",
  messagingSenderId: "155419873905",
  appId: "1:155419873905:web:b8f90ef9d96e883cee01d0",
  measurementId: "G-4SWLB829QJ"
}
firebase.initializeApp(config);


export default function App() {


  return (
    <Router>
      <Scene key="root">

        <Scene key="scarlet"
          component={ScarletScreen}
          title="Home"
          initial
        />
   

        <Scene
          key="SignUp"
          component={SignUp}
          title="Sign Up"
        />


        <Scene
          key="PreStart"
          component={PreStart}
          title="Start Your Ride"
        />

         <Scene
          key="Destination"
          component={Destination}
          title="Choose Your Destination"
        />

        <Scene
          key="GPSInfo"
          component={GPSInfo}
          title="GPS Information"
        />

        <Scene
          key="GPSTracking"
          component={GPS3}
          title="GPS Tracking"
        />

  

        <Scene
          key="Profile"
          component={MyProfile}
          title="My Profile"
        />

        <Scene
          key="JustProfile"
          component={JustProfile}
          title="User Profile"
        />

        <Scene
          key="RideSearch"
          component={RideSearch}
          title="Ride Search"
        />

        <Scene
          key="CustomerSearch"
          component={CustomerSearch}
          title="Search Profiles"
        />

        <Scene
          key="MessagesHistory"
          component={Messenger}
          title="Messenger"
        />

        <Scene
          key="ChatRoom"
          component={ChatRoom}
          title="Chat"
        />

         <Scene
          key="UpdateRoom"
          component={Updatish}
          title="Chat"
        />

        <Scene
          key="Menu"
          component={Menu}
          title="Menu"
        />

        <Scene
          key="Invitations"
          component={Invitation}
          title="Rides Info"
        />

        <Scene
          key="MapTails"
          component={MapTails}
          title="Ride View"
        />

        <Scene
          key="Admin"
          component={Admin}
          title="Admin"
        />



      </Scene>

      



    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
