import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { POST } from "../data/post"
import { db, firebase } from '../firebase'

const HomeScreen = ({navigation}) => {
    const [post, setPost] = useState([])

    

    useEffect(() => {
        db.collectionGroup('posts')
        .orderBy('likes_by_users'.length, 'desc')
        .onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => ({id: post.id, ...post.data()})))
        })
    }, [])

    return (
        
        <SafeAreaView style={{backgroundColor: '#242526'}}>
            <View style={{
                overflow: 'hidden',
                position: 'fixed',
                top: 0, 
                width: '100%',
                paddingBottom: 100,
                zIndex:1,

            }}>
                <Header  navigation={navigation}/>
            </View>
            <ScrollView style={{marginTop: 55}} showsVerticalScrollIndicator={false}>
                {post.map((post, index ) => (
                    <Post post = {post} key = {index}/>
                ))} 
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen
