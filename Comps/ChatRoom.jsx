import React, { Component } from 'react';
import { Text, View , SafeAreaView , StyleSheet , FlatList } from 'react-native';
import {Card} from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { ListItem , Image , Input } from 'react-native-elements';
import {Selects} from 'queryfire';
import {NeoConvo} from './ChatPlugin';
import firebase from 'firebase'


class ChatRoom extends Component {

    async componentDidMount () {  

        ID1 = this.props.Me.Email.split('.').join("");
        ID2 = this.props.Partner.Email.split('.').join("")
   

      //  Retrieve Data if Conversation exist , if Not Return Null

      this.ConvoState()                                 
               

      // Listen for new Messages

      var Msgs = []
      firebase.database().ref('/ChatPlugin/Conversations/' + ID1 + '___' + ID2 + '/Messages')
      .on('child_added' , function (res) {
                alert("New Message")  ;
                this.setState({  Void:[]   })
         })



    

      // Update UI


   

      //this.setState({Info:ICstmrz , Complete:true})
     }

     constructor () {      
       super() 
       this.state = {     
        Info :[] ,
        Complete:false,
        Void:false,
        Text:""
       }
     

     }  

     keyExtractor = (item, index) => index.toString()

     renderItem = ({ item }) => (
      <ListItem
        title={item.Says}
        leftAvatar={{
          source: { uri: 'https://miro.medium.com/max/2560/1*2pESva6Oya2LqZK-QW_B5Q.png' },
          title: item.Says
        }}
        bottomDivider        
      />
    )

    Submit = () => {
       // alert("Submit Pressed");      

        firebase.database().ref('/ChatPlugin/Conversations/' + ID1 + '___' + ID2 + '/Messages')
        .push({
            By:this.props.Me.Email,
            To:this.props.Partner.Email,
            Pic: 'https://pic.jpg',
            Says:this.state.Text,           
        })

    }

    ConvoState = async () => {
        
      var Messages = await Selects ('/ChatPlugin/Conversations/' + ID1 + '___' + ID2 + '/Messages');
      if (Messages.length !== 0){
          this.setState({Info:Messages , Complete: true})
      } else {
         // alert("Void")
          this.setState({Void : true})
      }

    }

 

  render() {
    if(this.state.Complete && this.state.Info.length > 0) {
      return (
        <View style = {{flex:1}}>
      
        <View style = {{flex:9}} >          
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.Info}
            renderItem={this.renderItem}
       /> 
        </View> 

        <View style = {{flex:1 , backgroundColor:'black' , flexDirection : 'column'}} >
            <Input style = {{width:20}} placeholder = "Type Your Message Here" 
                 onChangeText = {(iString) =>{ this.setState({Text:iString})}}     onSubmitEditing = {(e)=>{this.Submit(e.text)}} />
        </View>


        </View>
      );
    }

    else if(this.state.Void) {
      return (
        <View style = {{flex:1}}>      
        <View style = {{flex:9 , alignItems:'center' , justifyContent : 'center'}} >
            <Text>Be The First One To Send A Message</Text>                   
        </View> 

        <View style = {{flex:1 , backgroundColor:'black' , flexDirection : 'column'}} >
            <Input style = {{width:20}} placeholder = "Type Your Message Here" onSubmitEditing = {this.Submit} />
        </View>
        </View>
      )
    }

    return <Text>Loading...</Text>

   
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

export default ChatRoom;
var ID1 , ID2