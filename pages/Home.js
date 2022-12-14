import {Text, View, Image, TouchableOpacity, StyleSheet, FlatList,Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AS_API from '@react-native-async-storage/async-storage'
import Css from './css'
import Vector from '../img/Vector.png'
import BotaoVerMais from '../img/iconMaisTags.png'
import Loading from '../Componentes/loading';
import { useEffect, useState } from 'react';
import UserBase from '../img/userBase.png'
import tresPontos from '../img/iconTresPontos.png'
import Comentar from '../img/iconComentar.png';
import Curtir from '../img/iconCurtir.png';
import Salvar from '../img/iconSalvar.png';

export default function Home (){

  const navigation = useNavigation()

  const onPressMaisTags = () => {
    navigation.navigate('TagFolow')
  }

  const [visibleModal, setVisibleModal] = useState(false); 

  const [responsePending, setResponsePending] = useState(false)

  const [feed, setFeed] = useState([])

  const onPressPost = (id) => {
    const receivedPostId = id
    const postId = JSON.stringify(receivedPostId)
    AS_API.setItem('postId', postId)
    navigation.navigate('PostEmDestaque')
  }

  const onPressComentar = (id) => {
    const receivedPostId = id
    const postId = JSON.stringify(receivedPostId)
    AS_API.setItem('postId', postId)
    navigation.navigate('Comentar')
  }

  const getFeed = async () => {

    const receivedToken = await AS_API.getItem('token')
    const token = receivedToken.slice(1,-1)
    const bearer = `Bearer ${token}`
    console.log(bearer)

    setResponsePending(true)
    try{
        await fetch('https://sextans.loca.lt/post/feed', {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(async responseJson => {
            console.log(responseJson)
            setFeed(responseJson)
        })
    }
    catch(error){
        console.log(error)
    }
    setResponsePending(false)
  }

  useEffect(() => {
    getFeed()
  }, [])


const onPressSendSave = async id => {
  const bool = '1'
  const receivedPostId = id
  const postId = JSON.stringify(receivedPostId)
  const receivedToken = await AS_API.getItem('token')
  const token = receivedToken.slice(1,-1)
  const bearer = `Bearer ${token}`

  setResponsePending(true)
  try{           
      await fetch(`https://sextans.loca.lt/post/${postId}/saved/${bool}`, {
              method: 'POST',
              withCredentials: true,
              credentials: 'include',
              headers: {
          Accept: 'application/json',
          'Authorization': bearer,
          'Content-Type': 'application/json'},
          body: JSON.stringify({
                  content: bool, 
              })
          })
          .then(response => response.json())
          .then(async responseJson => {
              console.log(responseJson)
          })
  }
  catch(error){
      console.log(error)
  }
  setResponsePending(false)
}

const onPressSendLike = async id => {
  const bool = '1'
  const receivedPostId = id
  const postId = JSON.stringify(receivedPostId)
  const receivedToken = await AS_API.getItem('token')
  const token = receivedToken.slice(1,-1)
  const bearer = `Bearer ${token}`

  setResponsePending(true)
  try{           
      await fetch(`https://sextans.loca.lt/post/${postId}/liked/${bool}`, {
              method: 'POST',
              withCredentials: true,
              credentials: 'include',
              headers: {
          Accept: 'application/json',
          'Authorization': bearer,
          'Content-Type': 'application/json'},
          body: JSON.stringify({
                  content: bool, 
              })
          })
          .then(response => response.json())
          .then(async responseJson => {
              console.log(responseJson)
          })
  }
  catch(error){
      console.log(error)
  }
  setResponsePending(false)
}

const onPressSendReport = async id => {
  const bool = '1'
  const receivedPostId = id
  const postId = JSON.stringify(receivedPostId)
  const receivedToken = await AS_API.getItem('token')
  const token = receivedToken.slice(1,-1)
  const bearer = `Bearer ${token}`
  setVisibleModal(false)
  setResponsePending(true)
  alert ('A postagem foi reportada ,obrigado pelo feedback')
  try{           
      await fetch(`https://sextans.loca.lt/post/${postId}/report/${bool}`, {
              method: 'POST',
              withCredentials: true,
              credentials: 'include',
              headers: {
          Accept: 'application/json',
          'Authorization': bearer,
          'Content-Type': 'application/json'},
          body: JSON.stringify({
                  content: bool, 
              })
          })
          .then(response => response.json())
          .then(async responseJson => {
              console.log(responseJson)
          })
  }
  catch(error){
      console.log(error)
  }
  setResponsePending(false)
}

  return (
    <View style={Css.container}>
        <View style={Css.cabecalho}>
            <Image source={Vector} style={Css.img} />
            <TouchableOpacity
                onPress={onPressMaisTags}
                activeOpacity={0.7}
                style={Css.botaoVerMaisTAG}>
            <Image source={BotaoVerMais} style={Css.IconMaisTags} />
            </TouchableOpacity>
    </View>
    <View>
          <FlatList style={styles.FlatList}
          data={feed}
          renderItem={({ item }) => {
            return(
              <View key={item.id} style={Css.postCard}>
                    <TouchableOpacity onPress={() => onPressPost(item.id)}>
                        <Image source={item.user.avatar === null ? UserBase : {uri: item.user.avatar.url}} style={Css.fotoPerfilPost}/>
                        <Text style={Css.nomeDeUsuarioPost}> {item.user.name} </Text>
                        <Text style={Css.userArrobaPost}> @{item.user.username} </Text>
                        <Text style={Css.dataPostCorpo}> {item.date} </Text>
                        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} activeOpacity={0.2}
                        onPress={() => setVisibleModal(true)}
                        >
                         <View>
<Modal
        animationType="fade"
        transparent={true}
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}>
          <TouchableOpacity style={styles.ViewModal} onPress={() => {setVisibleModal({ modalVisible : false})}}>
          <TouchableOpacity onPress={() => onPressSendReport(item.id)} style={styles.btnModal}> 
            <Text style={styles.TxtModal}>Denunciar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
 
</View>   

                            <Image source={tresPontos} style={Css.IconTresPontos}/>
                        </TouchableOpacity>
                        <Text style={Css.forumPostCorpo}> #{item.tag.forum.name} </Text>
                        <Text style={Css.tituloPostCorpo}> {item.title} </Text>
                        {item.image === null 
                        ? <Text style={Css.txtPostCorpo}> {item.description_preview} </Text>
                        : <Image source={{uri: item.image.url}} style={Css.fotoExemploPost}/>}
                        <TouchableOpacity activeOpacity={0.7} style={Css.tagPost}>
                            <Text style={Css.txtTag}> {item.tag.name} </Text>
                        </TouchableOpacity>
      
                        <View style={styles.row}>
                          <TouchableOpacity onPress={() => onPressComentar(item.id)} activeOpacity={0.7}> 
                            <Image source={Comentar} style={Css.iconComentar}/>
                          </TouchableOpacity>
   
                          <TouchableOpacity onPress={() => onPressSendLike(item.id)} activeOpacity={0.7}>
                             <Image source={Curtir} style={Css.iconCurtir}/>
                         </TouchableOpacity>
        
                          <TouchableOpacity onPress={() => onPressSendSave(item.id)} activeOpacity={0.7}>
                              <Image source={Salvar} style={Css.iconSalvar} />
                         </TouchableOpacity>
                         </View>
                    </TouchableOpacity>
                </View>
                )
              }}/>
    </View>
    {responsePending ? <Loading/> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: '8%',
    marginEnd: '3%',
    marginTop: '-8%'
},
FlatList:{
marginBottom:90
},
ViewModal:{
  width: '100%',
  height: '100%',
  alignItems:'center',
  marginTop: 60
},
btnModal:{
  width: 120,
  backgroundColor: "#818181",
  height:80,
  top:250,
  alignSelf:'center',
  borderRadius:25
},
TxtModal:{
  textAlign:'center',
  marginTop:30,
  color:'#ffffff',
  fontWeight:'bold'
},
})