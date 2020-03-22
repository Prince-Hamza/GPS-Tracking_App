import Polyline from '@mapbox/polyline'

export const RouteMagic = async (startLoc ,destinationLoc , Mapref) => {

       var origin = startLoc.latitude + "," + startLoc.longitude
       var final =  destinationLoc.latitude + "," + destinationLoc.longitude
      // console.log(final), //console.log(final)


        try {
         
           let resp = await fetch ("https://maps.googleapis.com/maps/api/directions/json?origin= " + origin + "&destination=" + final + "&alternatives=true&key=AIzaSyBIYKLT7ZZ4OPggXRf1MHw5tFMIqX93AsA")

           let respJson = await resp.json();
           let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
           
           
        //    var Distring = respJson.routes[0].legs[0].distance.text
        //    var Distray = Distring.split(" ");
        //    var Distance = Distray[0] + 0 //Type Conversion

        //    var Price = 10 , i = 0;

        //     if(Distance > 10) {
        //     var Remaining = Distance - 10;
        //     console.log(Remaining) 
        //     for(i = 0 ; i <= Remaining ; i ++){
        //                 Price += 0.200   
        //     }           
        //    }
        

        //    console.log(Price)
        //    this.setState({Price: this.state.Price + Price})
          

        //   this.setState({ Distance:  respJson.routes[0].legs[0].distance.text })  
        //   this.setState({ Duration:  respJson.routes[0].legs[0].duration.text })   

    
            let coordsXY = points.map((point, index) => {
                return  { latitude : point[0],   longitude : point[1]  }
            })
            
        //   this.setState({RouteCoordinates: coordsXY , ShowRoute:true })

          setTimeout(() => {
            Mapref.fitToSuppliedMarkers(['mk1' , 'mk2'], {
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