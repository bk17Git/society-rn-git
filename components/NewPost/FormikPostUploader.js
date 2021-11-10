import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Image, Button, TouchableOpacity, PlatformColor } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import * as Yup from 'yup'
import { Formik, ErrorMessage } from 'formik'
import { NavigationContainer } from '@react-navigation/native'
import { db, firebase } from '../../firebase'

const PLACEHOLDER_IMAGE = require('../../assets/placeholder_image.jpg')

const UploadPostSchema = Yup.object().shape({
    caption : Yup.string().max(2200, "Caption has reached it's character limit")
})


const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMAGE)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db
        .collection('users')
        .where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profile_picture: doc.data().profile_picture
                }
            )})
        )
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('post')
            .add({
                imageUrl: imageUrl,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profile_picture,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                likes_by_users: [],
                comments: []
            })
            .then(() => navigation.goBack())

        return unsubscribe
    }

    return (
        <View style={{
            marginTop: '12.5%',
            margin: 'auto'
        }}>
            <Formik 
            initialValues={{caption: ''}} 
            validationSchema={UploadPostSchema}
            onSubmit={values => {
                uploadPostToFirebase()
                }} 
            validateOnMount={true}
            >

                {({ handleBlur,  handleChange, handleSubmit, values, errors, isValid}) => (
                    <>
                    <View style={{margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Image 
                            source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMAGE}}
                            style={{width: 110, height: 110, borderRadius: 25}}
                        />
                        <TextInput 
                            style={{
                                color: 'white', 
                                fontSize: 20, 
                                outline: 'none', 
                                borderRadius: 10, 
                                borderWidth: '2px', 
                                borderColor: '#33b5e5',
                                padding: 5,
                                marginStart: 20,
                            
                                
                            }}
                            placeholder='Write a caption...'
                            maxLength={2200}
                            multiline= {true}
                            onChangeText= {handleChange('caption')}
                            onBlur= {handleChange('caption')}
                            value = {values.caption}
                        />
                    </View>
                   
                    <TouchableOpacity style={{borderWidth : 3, borderColor: '#33b5e5', borderRadius: 10, width: '20%',padding: 4, margin: 'auto'}} onPress={handleSubmit} disabled={!isValid}>
                            <Text style={{color: '#33b5e5', textAlign: 'center', fontSize: '20px', fontWeight: '500'}}>Share</Text>
                    </TouchableOpacity>
                    
                    </>
                )}
            
            </Formik>
        </View>
    )
}

export default FormikPostUploader