import React, { useState } from 'react'
import handleSignup, { Output, firebaseInit } from './services/Firebase'
import Validate from './services/formValidation'

firebaseInit()

const Home = () => {
  const [ valid, setValid] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [submitOutput, setSubmitOutput] = useState<Output>()
  const [loading, setLoading] = useState<boolean>(false)

  function isValidEmail(event: React.FormEvent<HTMLInputElement>){
    const validate = new Validate()
    const output : boolean = validate.email(event.currentTarget.value)
    setValid(output)
  }

  async function signUp(event: React.FormEvent){
    event.preventDefault()
    setLoading(true)
    const result = await handleSignup(event)
    setSubmitted(true)
    setSubmitOutput(result)
    setLoading(false)
  }

  return(
    <main>
      <div className="content">
        <h1 className="logo">Essengia Energia</h1>
        <h2 className="content-title">Em breve</h2>
        <p className="content-description">
          Estamos criando um novo site e será lançado em breve.
        </p>
        <div className="content-text">
          <form method="post" className="content-form" onSubmit={ signUp }>
            <h3 className="content-formTitle">Inscreva-se para saber das novidades.</h3>
            <input placeholder="nome@exemplo.com" onChange={ isValidEmail } name="email" type="email" className="content-input"/>
            <button className={`submitBtn ${loading ? 'loading' : ''}`} disabled={!valid || loading}>Enviar</button>
            {submitted && <p className={ submitOutput?.subscribed ? 'success' : 'fail' }>{submitOutput?.message}</p> }
          </form>
        </div>
      </div>
    </main>
  )
}

export default Home
