import React, { useState, useEffect } from 'react'
import { SignedInStack, SignOutStack } from './Navigation'
import { firebase } from './firebase'


const AuthNavigation = () => {


    const [currentUser, setCurrentUser] = useState(null)

    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(
        () => 
            firebase.auth().onAuthStateChanged(user => userHandler(user)),
        []
    )


    return <>{currentUser  ? <SignedInStack /> : <SignOutStack/> }</>
}

export default AuthNavigation
