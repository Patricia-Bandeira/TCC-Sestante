import React, { useDebugValue, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import CustomInput from '../../Componentes/CustomInput.js';
import Css from '../css';
import Vector from '../../img/Vector.png'
import CustomButton from '../../Componentes/CustomButton';
import background_login_signup from '../../img/background_login_signup.png'
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form'
import AS_API from '@react-native-async-storage/async-storage'


export default function Cadastro(){

    const [storage, setStorage] = useState('')
    const [disabled, setDisabled] = useState(false)
    
    const Armazenar = (chave,valor) => {
        AS_API.setItem(chave,valor)
    }
    
    const Buscar = async (chave) => {
        const valor = await AS_API.getItem(chave)
        setStorage(valor)
    }

    const Limpar = async() => {
        AS_API.clear()
    }
    

    
    const {control, handleSubmit, formState: {errors}} = useForm();

    console.log(errors);

    const navigation = useNavigation();
    const onPressLogin = () => {
        
        navigation.navigate('Login')
    }
    const onPressSigngUp = async data => {

        // async function API(){
        //     try{            
        //             await fetch('https://backend-sestante.herokuapp.com/user', {
        //                 method: 'POST',
        //                 headers: {
        //                     Accept: 'application/json',
        //                     'Content-Type': 'application/json'},
        //                     body: JSON.stringify({
        //                         name: data.Nome, 
        //                         username: data.Usuario, 
        //                         email: data.Email,
        //                         password: data.Senha, 
        //                     })
        //                 })
        //                 .then(async response => await response.json())
        //                 .then(async responseJson => {
        //                     const resposta = (JSON.stringify(responseJson))
        //                     console.log(resposta)
        //                     Armazenar('01', resposta)
        //                 })
        //         }
        //     catch(error){
        //         console.log(error)
        //         }
        // }
        //     async function Authenticate () {
        //         await API()
        //         await Buscar('01')
        //     if (storage == '{"errors":[{"rule":"unique","field":"username","message":"unique validation failure"},{"rule":"unique","field":"email","message":"unique validation failure"}]}') {
        //         alert('Este Usuário e Email já estão sendo utilizados')
        //         await Limpar()
        //     }
        //     else if (storage.includes('{"errors":[{"rule":"unique","field":"username"')){
        //         alert('Este Usuário já está sendo utilizado')
        //         await Limpar()
        //     }
        //     else if (storage.includes('{"errors":[{"rule":"unique","field":"email"')){
        //         alert('Este Email já está sendo utilizado')
        //         await Limpar()
        //     }
        //     else if (storage.includes('{"userId":')){
        //     navigation.navigate('Preferencias') 
        //     }
        //     else {
        //         alert('Erro inesperado')
        //     }
        // }
        // await Authenticate()

        try{            
                await fetch('https://backend-sestante.herokuapp.com/user', {
                        method: 'POST',
                        headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'},
                    body: JSON.stringify({
                            name: data.Nome, 
                            username: data.Usuario, 
                        email: data.Email,
                        password: data.Senha, 
                    })
                })
                .then(response => response.json())
                .then(async responseJson => {
                    const resposta = (JSON.stringify(responseJson))
                    console.log(resposta)
                    Armazenar('01', resposta)
                    if (resposta == '{"errors":[{"rule":"unique","field":"username","message":"unique validation failure"},{"rule":"unique","field":"email","message":"unique validation failure"}]}') {
                        alert('Este Usuário e Email já estão sendo utilizados')
                        await Limpar()
                    }
                    else if (resposta.includes('{"errors":[{"rule":"unique","field":"username"')){
                        alert('Este Usuário já está sendo utilizado')
                        await Limpar()
                    }
                    else if (resposta.includes('{"errors":[{"rule":"unique","field":"email"')){
                        alert('Este Email já está sendo utilizado')
                        await Limpar()
                    }
                    else if (resposta.includes('{"userId":')){
                    navigation.navigate('Preferencias') 
                    }
                    else {
                        alert('Erro inesperado')
                    }
                })
                // .then(() => {
                //      while ( storage == ''){
                //         setDisabled = true
                //     }})
                // .then( async () => {
                //     if (storage.includes('{"errors":[{"rule":"unique","field":"username"' & '{"rule":"unique","field":"email"')) {
                //         alert('Este Usuário e Email já estão sendo utilizados')
                //         await Limpar()
                //     }
                //     else if (storage.includes('{"errors":[{"rule":"unique","field":"username"')){
                //         alert('Este Usuário já está sendo utilizado')
                //         await Limpar()
                //     }
                //     else if (storage.includes('{"errors":[{"rule":"unique","field":"email"')){
                //         alert('Este Email já está sendo utilizado')
                //         await Limpar()
                //     }
                //     else if (storage.includes('{"userId":')){
                //         navigation.navigate('Preferencias') 
                //     }
                // })
        }
        catch(error){
            console.log(error)
        }

    }
    
    return(
            
        <View style={Css.container}>
           <ImageBackground source={background_login_signup} resizeMode="cover" style={styles.Image}>
            <View style={Css.cabecalho}>
                <Image source={Vector} style={Css.img} />
            </View>
            <View style={styles.container}>
            

                <CustomInput
                name="Nome"   
                placeholder="Nome"
                control={control}
                rules={{required: 'Insira um Nome'}} 
                />
                <CustomInput
                name="Usuario"
                placeholder="Nome de Usuário" 
                control={control}
                rules={{required: 'Insira um Nome de Usuário'}} 
                />
                <CustomInput 
                name="Email"
                placeholder="Email" 
                control={control}
                rules={{required: 'Insira um Email', pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"} }} 
                />
                <CustomInput 
                name="Senha"
                placeholder="Senha" 
                secureTextEntry={true}
                control={control}
                rules={{required: 'Insira uma Senha', minLength: {value: 3, message: 'Senha é curta de mais'}}} 
                />
                <CustomButton 
                text={'cadastre-se'} 
                onPress={handleSubmit(onPressSigngUp)}
                disabled={disabled}
                />
                <CustomButton 
                text={'Login'} 
                onPress={onPressLogin}
                type="TERTIARY"
                />
                <Text>{storage}</Text>
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        justifyContent: 'center',
     },
     Image: {
        flex: 1,
     }
});
