import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const initialValues = {
        email: "",
        password: ""
    };

    const navigate = useNavigate();

    const loginSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),

        password: Yup.string().required("required")
    });

    const handleLogin = async (data: any) => {
        const response = await fetch('https://library-crud-sample.vercel.app/api/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({ email: data.email, password: data.password }),
            redirect: 'follow'
        });

        const result = await response.json();

        try {
            if (!response.ok) {
                throw new Error('Login failed');
            } else {
                setTimeout(() => {
                    console.log('response success', result);
                    localStorage.setItem('token', result.token);
                    alert('Login succeeded');
                    navigate('/dashboard');
                }, 1000);
            }
        }

        catch (error) {
            alert(error);
        }
    };

    return (
        <div className="isolate bg-white px-6 py-8 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-xl sm:mt-20">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
            
                        const data = {
                          email: values.email,
                          password: values.password
                        };

                        if (values.email && values.password) handleLogin(data);
                      }}
                >
                    <Form className="mx-auto mt-4 max-w-xl sm:mt-8">
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email: </label>
                            <Field type="email" id="email" name="email" placeholder="Enter your email"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">Password: </label>
                            <Field type="password" id="password" name="password" placeholder="Enter your password"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="password" component="div" />
                        </div>
                        <div className="mt-10 flex justify-between gap-10">
                            <button
                                type="submit"
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </Form>
                </Formik>
                <div className="mt-8">
                    <p>
                        Don't have an account?{" "}
                        <a onClick={() => navigate('/register')} className="text-blue-500 hover:underline gap-10 cursor-pointer">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Home;