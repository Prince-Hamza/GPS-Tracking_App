import React, { Component } from 'react';
import { Text, View , SafeAreaView , StyleSheet , FlatList } from 'react-native';
import {Card} from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { ListItem , Image } from 'react-native-elements';
import {Selects} from 'queryfire';



class Messenger extends Component {

    async componentDidMount () {  
     // alert( JSON.stringify  (this.props.Info))
      var ICstmrz = await Selects ('/Car_Customers');
      this.setState({Info:ICstmrz , Complete:true})
     }

     constructor () {      
       super() 
       this.state = {     
        Info :[] ,
        Complete:false
       }
     
     }  

     keyExtractor = (item, index) => index.toString()

     renderItem = ({ item }) => (
      <ListItem
        title={item.Name}
        subtitle={item.Role}
        leftAvatar={{
          source: { uri: 'https://miro.medium.com/max/2560/1*2pESva6Oya2LqZK-QW_B5Q.png' },
          title: item.Name
        }}
        bottomDivider
        chevron
      />
    )

  render() {
    if(this.state.Complete) {
      return (
      
        <View>
          
            <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.Info}
            renderItem={this.renderItem}
            />
  
  
        </View>    
      );
    }

    else {
      return (
        <View style = {styles.container}>
          <Text>
            Loading...
          </Text>
        </View>
      )
    }

   
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

export default Messenger;


