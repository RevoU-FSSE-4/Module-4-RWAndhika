import React from 'react';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from 'react';

function App() {

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [show, setShow] = useState<boolean>(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    username: "",
    password: ""
  });

  const initialValues = {
    name: data.name,
    email: data.email,
    dob: data.dob,
    street: data.street,
    city: data.city,
    state: data.state,
    zip: data.zip,
    username: data.username,
    password: data.password
  };

  const firstPageSchema = Yup.object().shape({
    name: Yup.string().required("Name is required")
      .min(3, "Too Short")
      .max(35, "Too long")
      .required("Required"),

    email: Yup.string().email().required("Email is required"),

    dob: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future")
      .min(new Date("1945-01-01"), "Please enter a valid date"),
  });

  const secondPageSchema = Yup.object().shape({
    street: Yup.string().required("Required"),

    city: Yup.string().required("Required"),

    state: Yup.string().required("Required"),

    zip: Yup.string().required("Required")
      .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
      .required("Zip code is required"),
  });

  const lastPageSchema = Yup.object().shape({
    username: Yup.string().required("required"),

    password: Yup.string().required("required")
      .required("Please enter a password (8 char min. , 1 digit, 1 lowercase, 1 uppercase)")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, "Password must have at least 1 digit character")
      .matches(/[a-z]/, "Password must have at least 1 lowercase character")
      .matches(/[A-Z]/, "Password must have at least 1 uppercase character"),
  });

  const handleNext = (newData: any) => {
    console.log(data);
    setData(prev => ({ ...prev, ...newData }))

    if (currentPage === 0) {
      setShow(true);
    } else {
      setShow(false);
    }

    if (currentPage === 2) {
      alert("Submit Success");
    } else {
      setCurrentPage(prev => prev + 1);
      setShow(false);
    }
  }

  const handlePrev = (newData: any) => {
    console.log(currentPage);
    setData(prev => ({ ...prev, ...newData }))
    setCurrentPage(prev => prev - 1)
    if (currentPage === 1) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {currentPage === 0 && <>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Address Information</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={firstPageSchema}
            onSubmit={handleNext}
          >
            <Form className="mx-auto mt-16 max-w-xl sm:mt-20">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Name: </label>
                <Field type="text" id="name" name="name" placeholder="Enter your name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email: </label>
                <Field type="email" id="email" name="email" placeholder="Enter your email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth: </label>
                <Field type="date" id="dob" name="dob" placeholder="Enter your date of birth" />
                <ErrorMessage name="dob" component="div" />
              </div>
              <div className="mt-10 flex justify-between gap-10">
                  <button
                    type="button"
                    className={`${show ? 'hidden' : ''}  block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next
                  </button>
                </div>
            </Form>
          </Formik>
        </>}
        {currentPage === 1 && (
          <>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Account Information</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={secondPageSchema}
              onSubmit={handleNext}
            >
              <Form className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="sm:col-span-2">
                  <label htmlFor="street" className="block text-sm font-semibold leading-6 text-gray-900">Street: </label>
                  <Field type="text" id="street" name="street" placeholder="Enter your street address"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage name="street" component="div" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">City: </label>
                  <Field type="text" id="city" name="city" placeholder="Enter your city address"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage name="city" component="div" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">State: </label>
                  <Field type="text" id="state" name="state" placeholder="Enter your state address"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage name="state" component="div" />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-semibold leading-6 text-gray-900">Zip: </label>
                  <Field type="text" id="zip" name="zip" placeholder="Enter your zip address"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage name='zip' component="div" />
                </div>
                <div className="mt-10 flex justify-between gap-10">
                  <button
                    type="button"
                    className={`${show ? 'hidden' : ''}  block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next
                  </button>
                </div>
              </Form>
            </Formik>
          </>
        )}
        {currentPage === 2 && (
          <>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Personal Information</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={lastPageSchema}
              onSubmit={handleNext}
            >
              <Form className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="sm:col-span-2">
                  <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">Username: </label>
                  <Field type="text" id="username" name="username" placeholder="Enter your usernamename"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">Password: </label>
                  <Field type="password" id="password" name="password" placeholder="Enter your password"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div className="mt-10 flex justify-between gap-10">
                  <button
                    type="button"
                    className={`${show ? 'hidden' : ''}  block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next
                  </button>
                </div>
              </Form>
            </Formik>
          </>
        )}
      </div>
      <div className="mt-10 flex justify-between gap-10">
      </div>
    </div>
  );
}


export default App;