import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// name, email, password, terms of service (checkbox), Submit button
// 

const UserForm = ({ errors, touched, values, status }) => {

    const [users, setUsers] = useState([]);
    console.log('The Data === ', users);
    useEffect(() => {
        if (status){
            setUsers([...users, status]);
        }
    }, [status]);

    return(
        <div>
            <h1>User Onboarding</h1>
         
                <Form>
                    <Field type="text" name="name" placeholder="Name" />
                    {touched.name && errors.name &&(
                        <p className="error">{errors.name}</p>
                    )}
                    <Field type="text" name="email" placeholder="Email"/>
                    {touched.email && errors.email &&(
                        <p className="error">{errors.email}</p>
                    )}
                    <Field type="text" name="password" placeholder="Password" />
                    {touched.password && errors.password &&(
                        <p className="error">{errors.password}</p>
                    )}

                    <Field type="checkbox" name="tos" checked={values.tos} />
                    <button type="submit">Submit</button>
                </Form>
                {users.map(user => (
                <ul key={user.id}>
                    <li>name: {user.name}</li>
                    <li>email: {user.email}</li>
                    <li>password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({

    mapPropsToValues({ name, email, password, Tos }){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            Tos: Tos || false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        email: Yup.string().required('Email is required!'),
        password: Yup.string().required('password is required!'),
        
    }),

    handleSubmit(values, { resetForm, setStatus }){
        axios
        .post('https://reqres.in/api/users', values)
        .then(res =>{
            console.log('ax response:', res)
            resetForm();
            setStatus(res.data);
            
        })
        .catch(err => {
            console.log(err);
            setStatus(false);
        });
    }
})(UserForm);

export default FormikUserForm;