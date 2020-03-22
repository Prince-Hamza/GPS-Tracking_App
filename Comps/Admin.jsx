import React, { Component } from 'react';
import { Text, View , TouchableOpacity , SafeAreaView , ScrollView , StyleSheet , Button , Image , Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {RouteMagic} from './MakeRoute'
import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux';


export default class Admin extends Component {  

   async componentDidMount () { 
  

    }


  constructor () {      
      super() 
      this.state = {
     

      }     
  } 

  Pass = () => {

    Actions.Invitations({Role:"Admin" , Info:this.props.Info })

  }


  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

         <TouchableOpacity>
                  <View >
                      <Text></Text>
                       <View style =  {styles.Heading} >
                       <Text style = {styles.ListText} >  Admin  </Text>                                                          
                       </View>
                     <Text></Text>
                 </View>
        </TouchableOpacity>   

        <TouchableOpacity onPress = {() => {this.Pass()}} >
                  <View >
                      <Text></Text>
                       <View style =  {styles.Heading} >
                       <Text style = {styles.ListText} >  New Rides  </Text>                                                          
                       </View>
                     <Text></Text>
                 </View>
        </TouchableOpacity>     



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
      }

  
  
  });

