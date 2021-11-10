import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import {firebase} from '../../firebase'



const LoginForm = ({navigation}) => {


    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email adress is required'),
        password : Yup.string().required().min(8, 'Your password must have at least 8 characters')
    })

    const onLogin = async(email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log('Login Successful! ' ,email, password)
        }catch(error) {
            Alert.alert(
                'Hey Buddy',
                error.message + '\n\n What would you like to do next?',
                [
                    {
                        text : 'OK',
                        onPress: () => console.log('OK'),
                        style: 'cancel'
                    },
                    {
                        text: 'Sign Up',
                         onPress :() => navigation.push('SignUp')
                    }
                ]
            )
            alert(error.message)
        }
    }

    return (
        <View style={styles.wrapper} >
            <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginFormSchema}
            onSubmit={values => {
                onLogin(values.email, values.password)
            }}
            validateOnMount={true}
            >

                {({ handleBlur,  handleChange, handleSubmit, values,errors, isValid}) => (
                    <>
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
                    <View style={{alignItems : 'flex-end', marginBottom: 30}}>
                        <Text style={{color : '#33b5e5', fontWeight: '500'}}>Forgot Password?</Text>
                    </View>
                    <TouchableOpacity  onPress={handleSubmit} style={styles.button} disabled={!isValid}>
                        <Text style={{color: '#33b5e5', fontSize: 20, fontWeight: 700}}>Log In</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpContainer}>
                    <Text style={{color: 'white'}}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                            <Text style={{color: '#33b5e5', fontWeight: '600'}}> Sign Up</Text>
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
        marginTop: 20,
        padding: 8,
        borderColor: '#33b5e5',
        borderWidth: 3,
        borderRadius: 25
    },

    signUpContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})




export default LoginForm
