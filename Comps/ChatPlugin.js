import * as firebase from 'firebase';
import {Selects} from 'queryfire';

export const NeoConvo = async (ID1 , ID2) => {
    
    var x = await Selects('/ChatPlugin/Conversations/' + ID1 + '___' + ID2 + '/Created')
    console.log(x[0]) 

     if(x[0] !== true){        
         firebase.database().ref('/ChatPlugin/Conversations/' + ID1 + '___' + ID2  + '/Created')
         .set({Connected:true})  ;
         console.log('created convo link')
      }
    

}