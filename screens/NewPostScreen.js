import * as React from "react"
import { View, Text, SafeAreaView } from 'react-native'
import AddNewPost from "../components/NewPost/AddNewPost"

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#242526'
        }}>
            <AddNewPost navigation={navigation}/>
        </SafeAreaView>
    )
}

export default NewPostScreen
