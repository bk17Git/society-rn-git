import React, { userState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { POST } from '../../data/post'
import { db, firebase } from '../../firebase'


const index = Array.index

const Post = ({post}) => {

    const handleLike = post => {
        const currenntLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_users:  currenntLikeStatus  
            ? firebase.firestore.FieldValue.arrayUnion(
                firebase.auth().currentUser.email
                )
            : firebase.firestore.FieldValue.arrayRemove(
                firebase.auth().currentUser.email
            )
        }).then(() => {
            console.log('Likes updated successfully!')
        })
        .catch( error => {
            console.error("Error updating likes: ", error)
        })
    }

    return (
        <View style={{marginBottom: 30, marginTop: 10}}>
            <Divider  width={1} orientation='vertical'/>
            <PostHeader post={post} />
            <Caption post={post}/>
            {post.imageUrl !== null && POST[0].imageUrl !== 0? <PostImage post= {post}/> : null }
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} handleLike={handleLike}/>
            </View>
            
        </View>
    )
}

const PostHeader = ({post}) => (
    <View 
    style = {{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    }}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
            <Image source= {{uri: post.profile_picture}}  style = {styles.profile}/>
            <Text  style={{marginLeft: 5, fontWeight: '700', color: 'white'}}>{post.user}</Text>
        </View>
    </View>
)

const Caption = ({post}) => (
    <Text style={{
        marginHorizontal: 30,
        marginBottom: 12,
        fontWeight: 600,
        color: 'white'
    }}>{post.caption}</Text>
)


const PostImage = ({post}) => (
    <View style={{
        width: '74%',
        height: 420,
        borderWidth: 2,
        margin: 'auto',
        borderRadius: 25,
        borderColor: '#33b5e5',
        
    }}>
        <Image 
        source={{uri: post.imageUrl}}  
        style={{
            height: '100%',
            width: '100%',
            borderRadius: 25,
            resizeMode: 'cover'
        }}/>
    </View>
)

const likedImage = require('../../assets/thumb_liked.png')
const unlikedImage = require('../../assets/thumb_like.png')
const PostFooter = ({post, handleLike}) => (

     
    <View style={{
        flexDirection: 'row',
        width: '32%',
        }}>
        <TouchableOpacity>
            <Icon  imgStyle = {styles.footerIcon} imgUrl={post.likes_by_users.includes(
                firebase.auth().currentUser.email) 
            ? likedImage
            : unlikedImage
            }/>
        </TouchableOpacity>
        <Text style={{marginStart: 5, color: 'grey', marginTop: 6, fontWeight: 500}}>{Likes(post.likes_by_users.length)}</Text>
    </View>    
)

const Icon = ({imgStyle, imgUrl}) => (
    
        <Image style={imgStyle} source={{uri: imgUrl}} />
    
)

function Likes (like) {
    if (Math.abs(like) > 999 && Math.abs(like) < 999999) {
        return Math.sign(like)*((Math.abs(like)/1000).toFixed(1)) + 'k' 
    }
    else if(Math.abs(like) > 999999 && Math.abs(like) < 999999999) {
        return Math.sign(like)*((Math.abs(like)/1000000).toFixed(1)) + 'm'
    }
    else if(Math.abs(like) > 999999999 ) {
        return Math.sign(like)*((Math.abs(like)/1000000000).toFixed(1)) + 'b'
    }
    else {
        return Math.sign(like)*Math.abs(like)
    }

}

// const Comments = ({post}) => (
//     <View style={{marginTop: 5, marginStart: 15}}>
//         <Text style={{color: 'grey'}}>
//         View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {''}
//         {post.comments.length > 1 ? 'comments' : 'comment'}
//         </Text>
//     </View>

// )


const styles = StyleSheet.create({
    profile: {
        width: 50, 
        height: 50, 
        borderRadius: 50, 
        marginVertical: 6,
        borderWidth: 1.6, 
        borderColor: '#33b5e5'
    },
   
    footerIcon: {
        width: 27,
        height: 27,
        marginHorizontal: 5
    },

    // footerIconComment : {
    //     width: 27,
    //     height: 27,
    //     marginTop: 3,
    //     marginHorizontal: 5
    // }
})

export default Post
