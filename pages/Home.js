import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Css from './css'
import Vector from '../img/Vector.png'
export default function Home (){
  return (
   <View style={Css.container}>
   <Text style={Css.teste}>aaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
    <View style={Css.cabecalho}>
    <Image source={Vector} style={Css.img} />
    </View>
    </View>
  );
}

