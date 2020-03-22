import React, { Component } from 'react';
import {Selects} from 'queryfire';
import _ from 'lodash'
import { StyleSheet, Text, SafeAreaView, ScrollView , Button ,Image, View  , TextInput, CheckBox , Dimensions } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { Actions } from 'react-native-router-flux';
import {  Dropdown }  from 'react-native-material-dropdown';
import * as firebase from 'firebase'



 class GPSInfo extends Component  {
    async componentDidMount () {  

      var e = this.props.Info.Email
      var x = e.split(".").join("")
this.setState({EmailID:x})   
       }
  
       constructor () {      
         super() 
         this.state = {                
            EmailID : "Void",
            Now:true,
            ShowMap:true,
            PlacesData :[],
            mapRegion : { latitude: 35.716122, longitude: 139.7436063, latitudeDelta: 3, longitudeDelta: 3 }  ,
            CBtn:'',   
            CityQuery : ''       ,
            DropQuery: '' ,
            ButtonID:'',
            StatusText:'Select Your City',
            AutoCompletes:[], DropDownView:false,
            ShowUserLocation : false,
            SelectStart:false,
            SelectEnd:false,
            MarkerImage:'./Dest.png',
            ShowRoute: false,
            StartCoords:null,
            EndCoords:null,
            CityCoords:null,
            checked:true,
            RouteCoordinates:[],
            DestinationCoords:[],
            CoordsArray : [
                         
            ],
            Other : false,
            Price :0,
            Distance: 0,
            Duration:0
         }       
       }  

       async getDirections(startLoc, destinationLoc) {

        //var x = this.state.Coords.latitude + "," + this.state.Coords.longitude  
        //var y = this.state.TargetCoords.latitude + "," + this.state.TargetCoords.longitude
        var y = "33.6789915,73.0365766" , x = "32.569918,73.4764472"

       var origin = startLoc.latitude + "," + startLoc.longitude
       var final =  destinationLoc.latitude + "," + destinationLoc.longitude
      // console.log(final), //console.log(final)


        try {
          // let resp = await fetch("https://maps.googleapis.com/maps/api/directions/json?origin= " + startLoc.latitude + "," + startLoc.Longitude + "&destination=" + destinationLoc.latitude + "," + destinationLoc.longitude + "&alternatives=true&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
           // let resp = await fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA')
           //  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation.latitude},${startLocation.longitude}&destination=${destination.latitude},${destination.longitude}&mode=walking&key=YOUR_API_KEY`)
    
           let resp = await fetch ("https://maps.googleapis.com/maps/api/directions/json?origin= " + origin + "&destination=" + final + "&alternatives=true&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")

           let respJson = await resp.json();
           let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
           
           
           var Distring = respJson.routes[0].legs[0].distance.text
           var Distray = Distring.split(" ");
           var Distance = Distray[0] + 0 //Type Conversion

           var Price = 10 , i = 0;

            if(Distance > 10) {
            var Remaining = Distance - 10;
            console.log(Remaining) 
            for(i = 0 ; i <= Remaining ; i ++){
                        Price += 0.200   
            }           
           }
        

           console.log(Price)
           this.setState({Price: this.state.Price + Price})
          

          this.setState({ Distance:  respJson.routes[0].legs[0].distance.text })  
          this.setState({ Duration:  respJson.routes[0].legs[0].duration.text })   

    
            let coordsXY = points.map((point, index) => {
                return  { latitude : point[0],   longitude : point[1]  }
            })
            
          this.setState({RouteCoordinates: coordsXY , ShowRoute:true })

          setTimeout(() => {
            this.map.fitToSuppliedMarkers(['mk1' , 'mk2'], {
              edgePadding: {bottom: 200, right: 50, top: 150, left: 50 },
              animated: true  }); 
          }, 500 )


           // alert( JSON.stringify(coordsXY));
    
            return coordsXY
        } catch(error) {
            alert(error)
            return error
        }
    }

      Submit = (Type) => {
        // if(this.state.StatusText == 'Select Your City') {

           // Query City & Coords
         //  this.QueryCityCoords()
         this.setState({ShowMap:true , DropDownView:false})         
         this.QueryInfo(Type)

         

       

          // this.setState({StatusText: 'Select Start Point' , SelectStart : true})
        // }       
      }

      Submit2 = async () => {

        this.setState({ShowMap:true , DropDownView:false})

        let resp = await fetch ("https://maps.googleapis.com/maps/api/geocode/json?address= " +this.state.DropQuery + "&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
        let respJson = await resp.json();
        var Loc = respJson.results[0].geometry.location

        this.setState({EndCoords:({ "latitude":Loc.lat,  "longitude":Loc.lng})     }) 

        this.setState({ mapRegion :    ({ "latitude":Loc.lat,
        "longitude":Loc.lng , "latitudeDelta" : 2, "longitudeDelta" : 2})     })

        //-----------------------------------------------------------------------------------------



        var resp2 = await fetch ("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location= " + Loc.lat + "," + Loc.lng + "&radius=1500&type="+"restaurant"+"&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
        var respJson2 = await resp2.json();
        var respArray = respJson.results

        respArray.forEach((Place) => {
         var Data = ({Name : Place.name,Latitude:Place.geometry.location.lat, Longitude:Place.geometry.location.lng })       
        // console.log(Data.Name);console.log(Data.Latitude)
         PlacesArray.push(Data)     
        })

        this.setState({PlacesData : PlacesArray})     

        if(this.state.StartCoords !== null) {               

           this.getDirections(this.state.StartCoords , this.state.EndCoords)      
           }
     }



      QueryInfo = async (Type) => {

           //Place To Coordinates
        //https://maps.googleapis.com/maps/api/geocode/json?address=Islamabad&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA
       var Input = ""
        if(Type == "Start") {Input = this.state.CityQuery} else {Input = this.state.DropQuery}

        let resp = await fetch ("https://maps.googleapis.com/maps/api/geocode/json?address= " + Input + "&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
        let respJson = await resp.json();
        var Loc = respJson.results[0].geometry.location
       // console.log(Loc.lng); // lat , lng

        if ( Type == "Start") {
        this.setState({StartCoords:({ "latitude":Loc.lat,  "longitude":Loc.lng})        })
        } else if (Type == "End") {
           this.setState({EndCoords:({ "latitude":Loc.lat,  "longitude":Loc.lng})     }) 
        }


        this.setState({ mapRegion :    ({ "latitude":Loc.lat,
        "longitude":Loc.lng , "latitudeDelta" : 0.5, "longitudeDelta" : 0.5})     })

     
     
        //NearBy Suggestions 
        // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA

         resp = await fetch ("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location= " + Loc.lat + "," + Loc.lng + "&radius=1500&type="+"restaurant"+"&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
         respJson = await resp.json();

         var respArray = respJson.results

         respArray.forEach((Place) => {
          var Data = ({Name : Place.name,Latitude:Place.geometry.location.lat, Longitude:Place.geometry.location.lng })       
         // console.log(Data.Name);console.log(Data.Latitude)
          PlacesArray.push(Data)     
         })

         this.setState({PlacesData : PlacesArray})


         
         
      }

      // PlaceToCoordinates = async ()  => {

      // }


      QueryCityCoords = async () =>  {
         var CA = []
         var Info = await Selects('/Users')
         var Specific =  _.filter(Info, { 'City': this.state.CityQuery });
         Specific.forEach((USER)=>{
               CA.push(USER.coords);
               this.setState({CoordsArray: CA})
               this.setState({MarkerImage:'./ManIcon.png'})
              //alert( JSON.stringify( USER.coords));
       })
     }

       
  MapTouch = (event) => {
        var TouchCoords = event.nativeEvent.coordinate;       
  }

 OnTextChange1 = (Input) => {
  this.setState({CBtn:'Pick' , CityQuery:Input });
  this.AutoComplete(Input);
  if(Input == "") {this.setState({ShowMap:true , DropDownView:false})}
 }

 OnTextChange2 = (Input) => {
  this.setState({CBtn:'Drop' , DropQuery:Input });
  this.AutoComplete(Input);
  if(Input == "") {this.setState({ShowMap:true , DropDownView:false})}
 }

 AutoComplete = async (Words) => {

   this.setState({ShowMap:false , DropDownView:true})

   //console.log(this.state.CityQuery);
   var resp = await fetch ("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + Words +"&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")
   var respJson = await resp.json();
   var ACArray = respJson.predictions;var AutoFin = []
   ACArray.map(item=>{
     AutoFin.push(item.description)
   })
   this.setState({AutoCompletes:AutoFin})
  // console.log(this.state.AutoCompletes)


  
  }

  BookRide = () => {

    var R = Math.random() + ""
    var Random = R.split(".").join("")  

    //this.Live(Random)
    this.UpdateFirebase('/Admin/New/' + Random  , Random)
    this.UpdateFirebase('/Users/' + this.state.EmailID + "/MyRides/" + Random , Random);  

      
    Actions.GPSTracking({
      Start:this.state.StartCoords , Finish:this.state.EndCoords ,
      Info: this.props.Info, LiveID : Random ,
      Route : this.state.RouteCoordinates
     })

  }



  UpdateFirebase = (Path , RandomID) => {
    firebase.database().ref(Path)
    .set({
      BookedBy : this.state.EmailID ,      Distance : this.state.Distance,
      Duration : this.state.Duration,      From: this.state.CityQuery,
      To: this.state.DropQuery  ,          Price: this.state.Price,
      StartCoords:this.state.StartCoords,  EndCoords:this.state.EndCoords,
      ID : RandomID , Email : this.state.EmailID
    })   

  }

  // Live = (RandomId) => {
  //   firebase.database().ref("/DrivesLive/" + RandomId + "/RiderCoords")
  //   .update({latitude:0 , longitude:0})
  //   firebase.database().ref("/DrivesLive/" + RandomId + "/CustomerCoords")
  //   .update({latitude:0 , longitude:0})
   
  // }



    render () {
        return (
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}  decelarationRate = {0.9}>   

            

{/* <Text style = {{backgroundColor:'cyan',  }}  onChangeText={(String) => {this.setState({CityQuery: String})}}  >
   {this.state.StatusText}
</Text> */}

<View style = {{flexDirection:'row'}}>
<TextInput  style={styles.TextInput2}  placeholder="Pick Up"  underlineColorAndroid="magenta"
 value = {this.state.CityQuery}  onChangeText={(i) => { this.OnTextChange1(i)  }} />
<Button  title = ">>" style = {{width:50 , borderRadius:63}}     onPress = {()=> {this.Submit("Start")}} />
</View>


<View style = {{flexDirection:'row'}}>
<TextInput  style={styles.TextInput2}  placeholder="Drop Off"  underlineColorAndroid="magenta"       
  value = {this.state.DropQuery} onChangeText={(i) => {this.OnTextChange2(i)    }} />
<Button  title = ">>" style = {{width:50 , borderRadius:63}}   onPress = {()=> {this.Submit2()}} />
</View>
            
 {/* Get coordinates in a specific city from Google Firebase Database */}

{this.state.ShowMap &&
      <MapView 
           region = {this.state.mapRegion}
           style={{ alignSelf: 'stretch', height: Dimensions.get('window').height - 160 }} 
           ref = {map => {this.map = map} }
           onMapReady = {() => {this.map.fitToSuppliedMarkers(["mk1" , "mk2"], {
                                edgePadding: {
                                bottom: 200, right: 50, top: 150, left: 50,                                       },
                                animated: true,
                                }); }}
           onPress = {(event) => {this.MapTouch(event)}} 
           > 
           
          {this.state.CoordsArray.map (COORDS => {
               return (
               <MapView.Marker
               coordinate =  { COORDS }
               onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}       > 
              <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
              </MapView.Marker> 
                )
            })}  

            {this.state.StartCoords !== null &&
              <MapView.Marker
              coordinate =  { this.state.StartCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}  
              identifier={'mk1'}     > 
             <Image source = {require('./ManIcon.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }

            {this.state.EndCoords !== null &&
              <MapView.Marker
              coordinate =  { this.state.EndCoords }
              onPress = {(event)=> {alert(event.nativeEvent.coordinate.latitude)}}   
              identifier={'mk2'}   > 
             <Image source = {require('./Dest.png')} style = {{height:50 , width:50}} />  
             </MapView.Marker> 
            }


            {this.state.ShowRoute && 
              <MapView.Polyline
		          coordinates={this.state.RouteCoordinates}
		          strokeColor="hotpink" 
	          	strokeWidth={12}
    	        />  
            }

            


      </MapView>
    }


<Text></Text>

    {/*AutoComplete View  */}


    {this.state.DropDownView && 
    <View style = {{alignItems:'flex-start' , backgroundColor: 'white'  }} >
     {this.state.AutoCompletes.map(Place => {
       return (
         <View>
          <Text style = {styles.ListText} onPress = {()=> {            
             if(this.state.CBtn == 'Pick') {  this.setState({CityQuery:Place })  } else if (this.state.CBtn == 'Drop') { this.setState({DropQuery:Place })   }            
             }} >
            {Place}
          </Text>
          <Text style = {{backgroundColor:'lightgray' , width:Dimensions.get('window').width}}></Text>
          </View>
        )
     })}    
     </View>
    }


    {/* Near By Places View  */}

    <View style = {{alignItems:'flex-start' , backgroundColor: 'white'  }} >
      {this.state.PlacesData.map(Place => {
        return (
          <View>
         <Text style = {styles.ListText} onPress = {()=> {
           var x = ({ 'latitude' : Place.Latitude , 'longitude' : Place.Longitude })           
           var Arr = [] ; Arr.push(x);
           this.setState({CoordsArray : Arr})           
           }} >

          {Place.Name}
        </Text>
        <Text></Text>
        </View>
        )
      })}    
    </View>




    <Text></Text>
    <Text></Text>


             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Paid Road</Text>
             </View>             
             
             {/* Paid Road Check Box  */}
             <View style = {{flexDirection:'row'}} >
                 <CheckBox
                  value={this.state.check}
                  onValueChange={() => this.setState({ check: !this.state.check , Price: this.state.Price + 100 })} />
                  <Text style = {styles.text} > Use Paid Road </Text>
              </View>   
          
          







    <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Ride Schedule</Text>
    </View>


    <View style = {{flexDirection:'row'}} >
                 <CheckBox  value={this.state.Now}  onValueChange={() => this.setState({ Now: !this.state.Now })} />
                  <Text style = {styles.text} > Now </Text>
    </View>    

    {!this.state.Now && 
              <View>
                <Text style={styles.text}>    Select A Date       </Text>
               <TextInput  style={styles.TextInput}    placeholder="30-12-2020"  underlineColorAndroid="black"
                           onChangeText={(String) => {this.setState({email: String})}}  />


               <Text style={styles.text}>    Select Time       </Text>
               <TextInput  style={styles.TextInput}    placeholder="7 AM"  underlineColorAndroid="black"
                           onChangeText={(String) => {this.setState({email: String})}} />

                           <Text> </Text>

                 
  

              </View>                       
   }                  
             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Load Menu</Text>
             </View>



             {/* Drop Down Load Menu  */}

             


             <Dropdown  label = {"Load Menu"} data = {LoadData} onChangeText = {(value)=>{
                        this.setState({Price:this.state.Price + value})
              }} />
 

             <View style = {{flexDirection:'row'}} >
               <CheckBox value={this.state.Other}  onValueChange={() => this.setState({ Other: !this.state.Other  })} />
                  <Text style = {styles.text} > Other </Text>
              </View>  

             {this.state.Other &&  <TextInput  style={styles.TextInput}    placeholder="Custom Load Type"  underlineColorAndroid="black"
               /> }



             <Text></Text>

          
             {/* Weight Amount Input  */}
             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Weight Amount</Text>
             </View>

             <Text></Text>



              <TextInput  style={styles.TextInput}    placeholder="Weight Amount"  underlineColorAndroid="black"
                           onChangeText={(String) => {                            var x = false;
                            Nums.forEach((num)=> { if (String == num  ){x =true} });
                             if (x == false) alert("Only numbers are allowed"); 
                           }} />

<Text></Text>

             {/* Number of Cars Drop Down  */}

             <View style =  {styles.Heading} >
               <Text style = {styles.ListText} >Cars Num</Text>
             </View>


      <Dropdown label = {"Car Number"} data = {CarData} onChangeText = {(value)=>{
        this.setState({Price:this.state.Price + value})
        }} />

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style =  {styles.Heading} >
               <Text style = {styles.ListText} > Distance {this.state.Distance} </Text>
      </View>
      <Text></Text>

      <View style =  {styles.Heading} >
      <Text style = {styles.ListText} > Duration {this.state.Duration}</Text>
      </View>
      <Text></Text>

      <View style =  {styles.Heading} >
               <Text style = {styles.ListText} > $ {this.state.Price}</Text>
      </View>

     <Button title = "Book Ride" style = {{width:Dimensions.get('window').width }}
     onPress ={()=> {
       this.BookRide()      
      }} />

     <Text></Text>
     <Text></Text>
     <Text></Text>

               


              </ScrollView>
            </SafeAreaView>
          );
    }
}

export default GPSInfo

var StartTry = 1 , EndTry = 1;
var PlacesArray = [];
var LoadData = [
  {"label" : "Load Type 1" , "value" : 5 } ,  
  {"label" : "Load Type 2" , "value" : 6 } ,  
  {"label" : "Load Type 3" , "value" : 15 } ,  
]

var CarData = [
  {"label" : "Car(s)  1" , "value" :1 } ,
  {"label" : "Car(s)  2" , "value" :2 } ,
  {"label" : "Car(s)  3" , "value" :3 } ,
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight -24,
    alignItems:'center',
    justifyContent:'center',    
  },

  TextInput :{
    width:Dimensions.get('window').width  , 
    height : 45 ,
    backgroundColor:"white",
  }   ,
  TextInput2 :{
    width:Dimensions.get('window').width - 33  , 
    height : 45 ,
    backgroundColor:"white",
    marginBottom:2  
  },
  scrollView: {
    backgroundColor: 'lightgray',
    marginHorizontal: 0,
    width:Dimensions.get('window').width,

  },
  text: {
    alignSelf:'center',
    fontSize: 20,
    color: "white",
    fontFamily:'monospace'
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
    height:50 ,
    alignItems:'center',
    justifyContent:"center",
  }
});


