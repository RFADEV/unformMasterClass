import React, { useRef,useState,useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/Input';

function App() {
  const formRef = useRef(null);

 async function handleSubmit(data, { reset }) {
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('Digite Um Email Válido').required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'No mínimo 3 Caracteres').required('A Cidade é obrigatória'),
        })
      });

      if (data.name === "") {
        formRef.current.setErrors({
          name: 'O nome é obrigatorio',
          address: {
            city: 'A Cidade é obritagória'
          }
        });
      }

      await schema.validate(data, {
        abortEarly:false,
      })

      console.log(data);

      formRef.current.setErrors({});

      reset();
    }catch(err){
      if (err instanceof Yup.ValidationError){
        const errorMessage = {
          name:"Nome Obrigatório"
        };

        err.inner.forEach(error => {
          errorMessage[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessage);

      }
    }
  }

  useEffect(()=>{
    setTimeout(()=>{
      formRef.current.setData({
        name:'Renan Andrade',
        email:'filgueiras.rfa@gmail.com',
        address:{
          city:'Muriaé'
        }
      })
    },2000);
  },[])

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Form ref={formRef}  onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Scope path="address">
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>

    </div>
  );
}

export default App;