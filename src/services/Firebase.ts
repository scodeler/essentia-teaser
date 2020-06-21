import React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'

export interface Output {
  subscribed: boolean
  message: string
}

export const firebaseInit = () => {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId:process.env.REACT_APP_MEASUREMENT_ID 
  }

  firebase.initializeApp(config)
  firebase.analytics()
}

const handleSignup = async (event: React.FormEvent) => {
  let output
  const db = firebase.firestore()

  const form  = event.currentTarget as HTMLFormElement
  const formData: FormData = new FormData(form)
  const field = formData.get('email') as string

  const usersCollection = db.collection("users")

  const checkDuplicate = await usersCollection.where('email',  '==', field).get()
  if(checkDuplicate.docs.length > 0){ 
    output = {
      subscribed: false,
      message: 'Usuário já cadastrado'
    }
  } else {
    await usersCollection.add({
      email: field
    }) 
    output = {
      subscribed: true,
      message: 'Obrigado por se cadastrar'
    }
  }

  return output
}

export default handleSignup