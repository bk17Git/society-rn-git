import * as React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageEditor } from 'react-native'
import FormikPostUploader from "./FormikPostUploader"

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
)

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} 
            style={{
                flexDirection: 'row'
            }}>
                    <Image 
                    source={require('../../assets/back_arrow.png')}
                    style={{
                        width: 30,
                        height: 30,
                        marginTop: 5
                    }}
                    />
            </TouchableOpacity>
            <Text style={styles.headerText}>Add New Post</Text>
            <Text/>
        </View>
)

const styles= StyleSheet.create({
    container : {
        marginHorizontal : 10,
    },

    headerContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        color: '#33b5e5',
        fontWeight: 700,
        fontSize: 20,
        marginRight: 25,
        justifyContent: 'center'
    }
})

export default AddNewPost
