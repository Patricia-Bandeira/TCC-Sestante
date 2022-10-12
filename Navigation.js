import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Routes from "./Routes";

const Stack = createNativeStackNavigator();

export default function Navigation(){
    return(
            // <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Cadastro" component={Cadastro}/>
                    <Stack.Screen name="Routes" component={Routes}/>
                </Stack.Navigator>
            // {/* </NavigationContainer> */}
    );   
};