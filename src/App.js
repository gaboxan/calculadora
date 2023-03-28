import { Formik, Form, yupToFormErrors } from "formik";
import * as Yup from 'yup'
import styled from "styled-components";
import Input from './components/Input.js'
import Button from './components/Button.js'
import { useState } from "react";
import Balance from './components/Balance.js'



const Container = styled.div`
display: flex;
justify-content: center;
height:100%;
align-items:center;
`

const Section = styled.section`
background-color: #eee;
border-top: solid 2x  paleovioletred;
padding: 20px 25px;
width: 500px;
box-shadpw: 0px 2px 3px rgb(0,0,0,0.3)
`
const compoundInterest = (deposit, contribution, years, rate) =>{
  let total = deposit
  for (let i =0; i< years;i++){
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}


function App() {
  const [balance, setBalance]= useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
  const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
  setBalance(val.toString())
  }
  return (
    <Container>
      <Section>
        
        <Formik initialValues={{
          deposit: '',
          contribution: '',
          years: '',
          rate: ''

        }} onSubmit={handleSubmit}
           validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            years: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            rate: Yup.number().required('Obligatorio').typeError('Debe ser un número').min(0, 'El valor mínimo es 0').max(1,'El valor máximo es 1')

           })}
        >
          <Form>
            <Input name="deposit" label="Depósito Inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button type="submit">Calcular</Button>

            
          </Form>
        </Formik>
        {balance !== '' ? <Balance> Balance final: {balance}</Balance>: null}
        </Section>
    </Container>
  );
}

export default App;
