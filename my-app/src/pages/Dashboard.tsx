import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHandlers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface Category {
    id: string,
    category_name: string,
    category_description: string,
    is_active: boolean
}

interface Profile {
    name: string,
    email: string,
}

const Dashboard = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    const initialValues: Category = {
        id: "",
        category_name: "",
        category_description: "",
        is_active: true
    };
    
    const [edit, setEdit] = useState<Category>(initialValues);

    const createSchema = Yup.object().shape({
        category_name: Yup.string().required("required"),

        category_description: Yup.string().required("required"),
    });

    const editSchema = Yup.object().shape({
        category_name: Yup.string().required("input required"),

        category_description: Yup.string().required("input required"),
    });

    const getCategories = async () => {
        const response = await fetch('https://library-crud-sample.vercel.app/api/category', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        try {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            } else {
                const jsonData = await response.json();
                const data = jsonData as Category[] || [];
                setListCategory(data);
            }

        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const createCategory = async (item: Category) => {
        const response = await fetch('https://library-crud-sample.vercel.app/api/category/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                "category_name": item.category_name,
                "category_description": item.category_description,
                "is_active": true
            })
        })

        try {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            } else {
                setTimeout(() => {
                    alert('Create succeeded');
                    getCategories();
                }, 1000)
            }

        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const deleteCategory = async (id: string) => {
        const response = await fetch(`https://library-crud-sample.vercel.app/api/category/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            redirect: 'follow'
        })

        try {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            } else {
                setTimeout(() => {
                    alert('Delete succeeded');
                    getCategories();
                }, 1000);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const getProfile = async () => {
        const response = await fetch('https://library-crud-sample.vercel.app/api/user/profile', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },

        })

        try {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            } else {
                const jsonData = await response.json();
                const data = jsonData as Profile || [];
                setName(data.name);
                setEmail(data.email);
            }

        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const handleLogout = async () => {
        const response = await fetch(`https://library-crud-sample.vercel.app/api/user/logout`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            redirect: 'follow'
        })

        try {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            } else {
                setTimeout(() => {
                    alert('Logout succeeded');
                    localStorage.removeItem('token');
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const handleUpdate = (item: Category) => {
        setEdit(item);
        setShow(true);
    }

    const updateCategory = async (item: Category) => {
        const response = await fetch(`https://library-crud-sample.vercel.app/api/category/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                "id": item.id,
                "category_name": item.category_name,
                "category_description": item.category_description,
                "is_active": true
            })
        })

        try {
            if (!response.ok) {
                throw new Error('Edit failed');
            } else {
                setTimeout(() => {
                    alert('Edit succeeded');
                    setShow(false);
                    getCategories();
                }, 1000);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getProfile();
        getCategories();
    }, []);

    return (

        <div className="my-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-row justify-between">
                <div className="pl-4">
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                </div>
                <div className="pr-4">
                    <button onClick={handleLogout} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Logout
                    </button>
                </div>

            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listCategory.length === 0 &&
                        <tr>
                            <td colSpan={5}>
                                No Data
                            </td>
                        </tr>
                    }
                    {listCategory.map(item => (
                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.id}
                            </th>
                            <td className="px-6 py-4">
                                {item.category_name}
                            </td>
                            <td className="px-6 py-4">
                                {item.category_description}
                            </td>
                            <td className="px-6 py-4">
                                {String(item.is_active)}
                            </td>
                            <td className="px-6 py-4 inline-flex">
                                <button onClick={() => handleUpdate(item)} className={`${show ? 'hidden' : ''} bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>
                                    Update
                                </button>
                                <button onClick={() => deleteCategory(item.id)} className={`${show ? 'hidden' : ''} bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>
                                    Delete
                                </button>
                                <button onClick={() => setShow(false)} className={`${show ? '' : 'hidden'} bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {show === true && 
            <Formik
                initialValues={edit}
                validationSchema={editSchema}
                onSubmit={updateCategory}>
                <Form>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Edit here:
                                </th>
                                <td className="px-6 py-4">
                                    <Field type="text" id="category_name" name="category_name" placeholder="Enter new category" defaultValue={edit.category_name}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <ErrorMessage name="category_name" component="div" />
                                </td>
                                <td className="px-6 py-4">
                                    <Field type="text" id="category_description" name="category_description" placeholder="Enter new description" defaultValue={edit.category_description}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <ErrorMessage name="category_description" component="div" />
                                </td>
                                <td className="px-6 py-4">
                                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </Formik>
            }
            {show === false &&
            <Formik
            initialValues={initialValues}
            validationSchema={createSchema}
            onSubmit={(values, { resetForm }) => {
                createCategory(values);
                resetForm();
            }}>
                <Form>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Create New:
                                </th>
                                <td className="px-6 py-4">
                                    <Field type="text" id="category_name" name="category_name" placeholder="Enter new category"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <ErrorMessage name="category_name" component="div" />
                                </td>
                                <td className="px-6 py-4">
                                    <Field type="text" id="category_description" name="category_description" placeholder="Enter new description"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <ErrorMessage name="category_description" component="div" />
                                </td>
                                <td className="px-6 py-4">
                                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                        Add
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </Formik>
            }
        </div >
    );
}

export default Dashboard;