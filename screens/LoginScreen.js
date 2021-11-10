import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import LoginForm from '../components/loginScreen/LoginForm'

const LoginScreen = ({navigation}) => (
    
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={{height: 110, width: 110}}/>
            </View>
            <LoginForm navigation={navigation} />
        </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#242526', 
        paddingTop: 40,
        flex: 1,
        paddingHorizontal: 12
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 40
    }
})


export default LoginScreen
