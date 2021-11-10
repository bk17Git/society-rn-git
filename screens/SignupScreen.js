import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import SignupForm from '../components/signupScreen/SignupForm'

const SignupScreen = ({navigation}) =>(

        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={{height: 110, width: 110}}/>
            </View>
            <SignupForm navigation={navigation} />
        </View>
)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#242526',
        paddingTop: 50,
        paddingHorizontal: 12
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 60
    }
})


export default SignupScreen
