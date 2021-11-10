import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { firebase } from '../../firebase'

const HandleSignOut = async () =>{
try{
    await firebase.auth().signOut()
    .then(console.log("Loged Out!"))
    
} catch (error) {
    Alert.alert(error.message)
    alert(error.message)
    console.log(error.message)
}
}

const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                {/* <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}
                /> */}
                <Image 
                style={styles.logo_name}
                source={require('../../assets/name_logo_white.png')}
                />
            </View>    
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.push('AddNewPost')}>
                    <Image 
                        source={require('../../assets/add_icon.png')}
                        style = {styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={HandleSignOut}>
                    <Image 
                        source={require('../../assets/logout_logo.png')}
                        style = {styles.icon}
                    />
                </TouchableOpacity>
            </View> 
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        justifyContent : 'space-between',
        backgroundColor: '#242526',
        alignItems: 'center',
        flexDirection : 'row',
        marginRight : 20,
        
    },


    iconContainer : {
        flexDirection: 'row',

    }, 

    // logo: {
    //     width: 45,
    //     height: 45,
    //     marginStart: 10,
    //     resizeMode : 'contain'
    // },

    logo_name: {
        width : 100,
        height: 40,
        // marginStart: 380,
        resizeMode : 'contain',
        marginEnd: 60

    },

    icon: {
        width: 30,
        height: 30,
        marginLeft: 20,
        resizeMode : 'contain'
    }

})

export default Header
