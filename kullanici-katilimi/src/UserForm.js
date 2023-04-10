import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import './UserForm.css'
import * as Yup from 'yup'

const UserForm = () => {
  const initialUsers = []

  const [users, setUsersData] = useState(initialUsers)
  const [formData, setFormData] = useState({
    isim: '',
    email: '',
    sifre: '',
    kosullar: false,
  })

  const [formError, setFormError] = useState({
    isim: '',
    email: '',
    sifre: '',
    kosullar: '',
  })

  const [disabled, setDisabled] = useState(true)

  const schema = Yup.object().shape({
    isim: Yup.string().required('İsim giriniz'),
    email: Yup.string()
      .email('Gecerli bir mail adresi giriniz')
      .required('Lutfen mail adresinizi giriniz'),
    sifre: Yup.string()
      .required('Lutfen sifrenizi giriniz')
      .min(5, 'Şifre en az 5 karakterli olmalı.'),
    kosullar: Yup.string().required('Lütfen koşulları kabul ediniz.'),
  })

  const handleChange = (e) => {
    Yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(setFormError({ ...formError, [e.target.name]: '' }))
      .catch((err) => {
        setFormError({ ...formError, [e.target.name]: err.errors[0] })
      })
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleCheck = (e) => {
    Yup.reach(schema, e.target.name)
      .validate(e.target.value)
      .then(setFormError({ ...formError, [e.target.name]: '' }))
      .catch((err) => {
        setFormError({ ...formError, [e.target.name]: err.errors[0] })
      })
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.checked })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post('https://reqres.in/api/users', formData).then((res) => {
      console.log('post edilen veri>', res.data, 'users>', users)
      setUsersData([...users, formData])
    })
  }

  useEffect(() => {
    schema.isValid(formData).then((valid) => setDisabled(!valid))
  }, [formData])

  return (
    <div>
      <Form onSubmit={submitHandler} className="FormContainer">
        <h1 style={{ fontSize: '1.9rem' }}>Kullanıcı Kayıt</h1>
        <FormGroup floating>
          <Input
            id="isim"
            name="isim"
            placeholder="Kullanıcı Adı"
            type="text"
            onChange={handleChange}
            value={formData.isim}
          />
          <Label size="sm" for="isim">
            Kullanıcı Adı
          </Label>
        </FormGroup>{' '}
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Label size="sm" for="email">
            E-mail
          </Label>
        </FormGroup>{' '}
        <FormGroup floating>
          <Input
            id="sifre"
            name="sifre"
            placeholder="Şifre"
            type="password"
            value={formData.sifre}
            onChange={handleChange}
          />
          <Label size="sm" for="sifre">
            Şifre
          </Label>
        </FormGroup>{' '}
        <FormGroup
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row wrap',
          }}
        >
          <p
            style={{
              color: 'white',
              fontSize: '1.2rem',
            }}
          >
            Kullanim koşulları:{' '}
          </p>
          <Label>
            <Input type="checkbox" name="kosullar" onChange={handleCheck} />
          </Label>
        </FormGroup>
        <Button
          style={{ backgroundColor: '#FF5F00', border: 'solid 0.1rem' }}
          disabled={disabled}
        >
          Gönder
        </Button>
        <hr />
        <div style={{ color: 'red', fontSize: '0.8rem' }}>
          <p>{formError.isim}</p>
          <p>{formError.email}</p>
          <p>{formError.sifre}</p>
          <p>{formError.kosullar}</p>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
