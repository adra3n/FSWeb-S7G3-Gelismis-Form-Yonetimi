import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./UserForm.css";

const UserForm = () => {

    const [userLogin, setUserLogin] = useState({});


    const handleChange = (e) => {
        setUserLogin()
    }
    submitHandler = (e) => {
        e.preventDefault();
        axios.post().then((res) => {
            console.log("post edilen veri>", res.data)
        })
    }
    useEffect(() => {
        console.log(userLogin);

    }, [userLogin])


    return (
        <div><Form onSubmit={submitHandler} className='FormContainer'>
            <h1 style={{ fontSize: "1.9rem" }}>Kullanıcı Kayıt</h1>
            <FormGroup floating>
                <Input
                    id="name"
                    name="name"
                    placeholder="Kullanıcı Adı"
                    type="text"
                    onChange={handleChange}
                    value={userLogin.name}
                />
                <Label size='sm' for="name">
                    Kullanıcı Adı
                </Label>
            </FormGroup>
            {' '}
            <FormGroup floating>
                <Input
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    type="email"
                    value={userLogin.email}
                    onChange={handleChange}
                />
                <Label size='sm' for="email">
                    E-mail
                </Label>
            </FormGroup>
            {' '}

            <FormGroup floating>
                <Input
                    id="password"
                    name="password"
                    placeholder="Şifre"
                    type="password"
                    value={userLogin.password}
                    onChange={handleChange}
                />
                <Label size='sm' for="password">
                    Şifre
                </Label>
            </FormGroup>
            {' '}
            <Button style={{ backgroundColor: "#FF5F00", border: "solid 0.1rem" }}>
                Gönder
            </Button>
        </Form>
        </div >
    )
}

export default UserForm;


