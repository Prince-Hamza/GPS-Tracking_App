import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class MyProfile extends Component {

  componentDidMount () {
    // initiated from Menu components !!
    alert( JSON.stringify( this.props.DisplayUser.Name))
  }

  constructor () {
    super()
    this.state = {
      Photo : false
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>

          {!this.state.Photo &&   
          <Image style={styles.avatar} source={{uri: this.props.DisplayUser.Photo}}/>          
          }
                  

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.props.DisplayUser.Name}</Text>
              <Text style={styles.info}> {this.props.DisplayUser.Role}</Text>
              <Text></Text>
              <Text style={styles.description}>
              Write Your Story Here
               </Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>

              
              <TouchableOpacity style={styles.buttonContainer}>                
                <Text>Update</Text>  
              </TouchableOpacity>              
      

            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "cyan",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "yellow",
  },
});
 

