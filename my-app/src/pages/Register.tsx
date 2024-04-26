import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("required")
      .min(3, "Too Short")
      .max(35, "Too long")
      .required("Required"),

    email: Yup.string().email().required("required"),

    password: Yup.string().required("required")
      .required("Please enter a password (8 char min. , 1 digit, 1 lowercase, 1 uppercase)")
      .min(8, "Password must have at least 8 characters")
      .matches(/[a-z]/, "Password must have at least 1 lowercase character"),
  });

  const handleRegister = async (data: any) => {
    const response = await fetch('https://library-crud-sample.vercel.app/api/user/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      redirect: 'follow'
    })

    console.log('response register', response)
    const result = await response.json()

    try {
      if (!response.ok) {
        alert('Failed to register')
      }
      else {
        console.log('response success', result)
        alert('Register succeeded')
        navigate('/')
      }

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={(values) => {

            const data = {
              name: values.name,
              email: values.email,
              password: values.password
            };

            if (values.name && values.email && values.password) handleRegister(data);
          }}
        >
          <Form className="mx-auto mt-4 max-w-xl sm:mt-8">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Name: </label>
              <Field type="text" id="name" name="name" placeholder="Enter your name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <ErrorMessage name="name" component="div" />
            </div>
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
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        <div className="mt-8">
          <p>
            Already have an account?{" "}
            <a onClick={() => navigate('/')} className="text-blue-500 hover:underline gap-10 cursor-pointer">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;