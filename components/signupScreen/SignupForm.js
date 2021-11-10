import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import {firebase, db} from '../../firebase'

const SignupForm = ({navigation}) => {

    const SignupFormSchema = Yup.object().shape({
        username: Yup.string().required().min(3, 'A username is required'),
        email: Yup.string().email().required('An email adress is required'),
        password : Yup.string().required().min(8, 'Your password must have at least 8 characters')
    })

    const BLANK_PROFILE_PICTURE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

    const onSignUp = async(username, email, password) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log('User Created with ', email, password)

            db.collection('users').doc(authUser.user.email).set({
                owner_uid:  authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profilePicture:  BLANK_PROFILE_PICTURE,
            })

        }catch(error) {
            Alert.alert('Hey Buddy...' , error.message)
            alert(error.message)
        }
    }

    return (
        <View style={styles.wrapper} >
            <Formik
            initialValues={{username: '', email: '', password: ''}}
            validationSchema={SignupFormSchema}
            onSubmit={values => {
                onSignUp(values.username, values.email, values.password)
            }}
            validateOnMount={true}
            >

                {({ handleBlur,  handleChange, handleSubmit, values,errors, isValid}) => (
                    <>
                    <View style={[styles.inputField,
                    {borderColor: 1 > values.username.length || values.username.length > 2 ? '#33b5e5' : 'red'}
                    ]}>
                        <TextInput 
                            placeholderTextColor='grey'
                            placeholder="Username"
                            autoCapitalize="none"
                            textContentType='name'
                            keyboardType='default'
                            autoFocus={true}
                            onChangeText= {handleChange('username')}
                            onBlur= {handleChange('username')}
                            value = {values.username}
                            style={{outline: 'none', fontSize: 18, color: 'white'}}
                        />
                        
                    </View>
                        <View style={[styles.inputField,
                        {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#33b5e5' : 'red'}
                        ]}>
                            <TextInput 
                                placeholderTextColor='grey'
                                placeholder="Email"
                                autoCapitalize="none" 
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                autoFocus={true}
                                onChangeText= {handleChange('email')}
                                onBlur= {handleChange('email')}
                                value = {values.email}
                                style={{outline: 'none', fontSize: 18, color: 'white'}}
                            />
                    </View>
                    <View style={[styles.inputField,
                    {borderColor: 1 > values.password.length || values.password.length > 7 ? '#33b5e5' : 'red'}
                    ]}>
                        <TextInput 
                            placeholderTextColor='grey'
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            textContentType='password'
                            autoFocus={true}
                            onChangeText= {handleChange('password')}
                            onBlur= {handleChange('password')}
                            value = {values.password}
                            style={{outline: 'none', fontSize: 18, color: 'white'}}
                        />
                        
                    </View>
                    <TouchableOpacity  onPress={handleSubmit} style={styles.button} disabled={!isValid}>
                        <Text style={{color: '#33b5e5', fontSize: 20, fontWeight: 700}}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.logInContainer}>
                        <Text style={{color: 'white'}}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <Text style={{color: '#33b5e5', fontWeight: '600'}}> Log In </Text>
                        </TouchableOpacity>
                    </View>
                </>
                )}

                
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50
    },

    inputField: {
        borderRadius: 20,
        borderWidth: 3,
        padding: 5,
        backgroundColor: '#242526',
        // borderColor: '#33b5e5',
        marginVertical: 8,
        padding: 10
        
    },

    button : {
        backgroundColor: '#242526',
        alignItems: 'center',
        margin: 'auto',
        justifyContent: 'center',
        width : '30%',
        height: '16%',
        marginTop: 50,
        padding: 8,
        borderColor: '#33b5e5',
        borderWidth: 3,
        borderRadius: 25
    },

    logInContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})

export default SignupForm
