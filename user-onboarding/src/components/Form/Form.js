import React from 'react';
import { Form, Field, withFormik } from 'formik';
import { Formik } from 'formik';
import * as Yup from 'yup';

// name, email, password, terms of service (checkbox), Submit button
// 

const UserForm = ({  }) => {
    return(
        <div>
            <h1>User Onboarding</h1>
            <Formik>
                <Form>
                    <Field type="text" name="name" placeholder="Name" />
                    <Field type="text" name="email" placeholder="Email"/>
                    <Field type="text" name="password" placeholder="Password" />
                    <Field type="checkbox" name="Tos" placeholder="Terms of Service" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
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
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        
    })

})

export default UserForm;