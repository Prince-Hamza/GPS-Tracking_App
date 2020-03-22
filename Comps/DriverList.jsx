import React, { Component } from 'react';
import { Text, View , TextInput , SafeAreaView , ScrollView , StyleSheet , Button , Image ,
     Dimensions , TouchableOpacity } from 'react-native';
import { Input  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase'
import {Selects} from 'queryfire'
import _ from 'lodash'


export default class RidersList extends Component {  

    async componentDidMount () { 
      
      
         var InviList = await Selects('/Users/');
         var Riders =  _.filter(InviList, { 'Email': 'Car_Customers' });
        
         this.setState({RidersList : InviList});
         console.log(InviList);


    }

  constructor () {      
      super() 
      this.state = {
      MyEmail: "void"     ,
      RidersList : []
      }     
  } 




  render() {
    return (
        <SafeAreaView style = {styles.container}>
         <ScrollView style = {styles.scrollView} >

             {this.state.RidersList.map(Rider => {
                 return (
                     <TouchableOpacity  >
                  <View >
                       <View style =  {styles.Heading} >
                 <Text style = {styles.ListText} >{Rider.Name}</Text>  
                       <Text></Text>      
                       <Text style = {styles.ListText} > {Rider.Email}   </Text>
                       <Text></Text>

                       <TouchableOpacity   style = {styles.InviteBtn}  >
                       <Button color = {"lightgray"} title = "Rider Location" onPress = {() => {this.props.SendInfo(Rider)}} />
                       </TouchableOpacity>  

                       <TouchableOpacity   style = {styles.InviteBtn}  >
                       <Button color = {"lightgray"} title = "Invite" onPress = {() => {this.props.Invite(Rider.Email)}} />
                       </TouchableOpacity> 


                       </View>
                 </View>
                 </TouchableOpacity>

                 )               
             })}

           
     
     

      
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
        height:180 ,
        alignItems:'center',
        justifyContent:"center",
        marginBottom:1
      },

     InviteBtn: {
        backgroundColor:"green" , 
        width:200 ,
        
      
        marginBottom:15
      }

  
  
  });

