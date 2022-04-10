import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import '../Components/igt-form.css'
import { signInWithGoogle } from './../Firebase/firebase-auth';
import { CSSTransition } from 'react-transition-group'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './../Firebase/firebase-firestore'
import { uploadFile } from '../Firebase/firebase-storage';
import Swal from 'sweetalert2';
import rightImg from '../Components/correct.png'

export default function IgtForm() {
    const [formData, setformData] = useState({ firstname: '', lastname: '', email: '', institute: '', education: '', cv: '' })
    const [page, setpage] = useState(1)
    const [cv, setcv] = useState()
    const [animdirection, setanimdirection] = useState()
    const [fileUploading, setfileUploading] = useState(false);
    const [fileUploaded, setfileUploaded] = useState(false);
    const [validForm, setvalidForm] = useState(false);
    const signupCollection = collection(db, "Signup details")

    const instituteList = ["", "Ins 1", "Ins 2", "Ins 3", "Ins 4"]
    const eduList = ["", "Undergrad", "Grad", "Masters", "Other"]

    async function handleGoogleButton(type) {
        //check the log in button type
        switch (type) {
            case "google":
                try {
                    let data = await signInWithGoogle()
                    console.log(data)
                    const names = await nameParser(data.user.displayName)
                    await setformData({ ...formData, 'email': data.user.email, 'firstname': names[0], 'lastname': names[1] })
                    await setpage(page + 1)
                }
                catch (err) {
                    //change to a modal 
                    console.log(err)
                }

                break;

            default:
                break;
        }

    }
    function nameParser(fullName) {
        let arr = fullName.split(" ")
        return arr
    }
    function handleChanges(e) {
        e.preventDefault();
        setformData({ ...formData, [e.target.name]: e.target.value })
        if (formData.firstname !== '' && formData.lastname !== '' && formData.email !== '' && formData.institute !== '' && formData.education !== '') {
            setvalidForm(true)
        }
    }
    function handleSubmit(e) {
        addDoc(signupCollection, formData)
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registered successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Failed',
                    text: 'Error Occurred',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        e.preventDefault()
    }
    function changeCV(e) {
        e.preventDefault();
        setcv(e.target.files[0])
        console.log(e.target.files[0].webkitRelativePath);
    }
    function uploadCV() {
        setfileUploading(true)
        uploadFile(cv)
            .then(url => {
                setformData({ ...formData, cv: url })
                Swal.fire({
                    title: 'Uploaded!',
                    text: 'File Uploaded successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                setfileUploading(false)
            })
            .then(res => setfileUploaded(true))
            .catch(e => {
                Swal.fire({
                    title: 'Uploading Failed',
                    text: 'Please try again',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
    }
    function PageHandler(formData, handleChanges) {
        if (page === 1) {
            return (
                <>
                    <Button variant="outline-primary" className='google-button round-button' size="sm" onClick={() => { handleGoogleButton("google") }}>
                        <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjZmJjMDJkIiBkPSJNNDMuNjExLDIwLjA4M0g0MlYyMEgyNHY4aDExLjMwM2MtMS42NDksNC42NTctNi4wOCw4LTExLjMwMyw4Yy02LjYyNywwLTEyLTUuMzczLTEyLTEyCXM1LjM3My0xMiwxMi0xMmMzLjA1OSwwLDUuODQyLDEuMTU0LDcuOTYxLDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzEyLjk1NSw0LDQsMTIuOTU1LDQsMjRzOC45NTUsMjAsMjAsMjAJczIwLTguOTU1LDIwLTIwQzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD48cGF0aCBmaWxsPSIjZTUzOTM1IiBkPSJNNi4zMDYsMTQuNjkxbDYuNTcxLDQuODE5QzE0LjY1NSwxNS4xMDgsMTguOTYxLDEyLDI0LDEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzkJbDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzE2LjMxOCw0LDkuNjU2LDguMzM3LDYuMzA2LDE0LjY5MXoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNGNhZjUwIiBkPSJNMjQsNDRjNS4xNjYsMCw5Ljg2LTEuOTc3LDEzLjQwOS01LjE5MmwtNi4xOS01LjIzOEMyOS4yMTEsMzUuMDkxLDI2LjcxNSwzNiwyNCwzNgljLTUuMjAyLDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiw1LjAyNUM5LjUwNSwzOS41NTYsMTYuMjI3LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxNTY1YzAiIGQ9Ik00My42MTEsMjAuMDgzTDQzLjU5NSwyMEw0MiwyMEgyNHY4aDExLjMwM2MtMC43OTIsMi4yMzctMi4yMzEsNC4xNjYtNC4wODcsNS41NzEJYzAuMDAxLTAuMDAxLDAuMDAyLTAuMDAxLDAuMDAzLTAuMDAybDYuMTksNS4yMzhDMzYuOTcxLDM5LjIwNSw0NCwzNCw0NCwyNEM0NCwyMi42NTksNDMuODYyLDIxLjM1LDQzLjYxMSwyMC4wODN6Ij48L3BhdGg+PC9zdmc+" />
                        <label>Continue With Google</label>
                    </Button>
                    <div className='flex-center' style={{ paddingTop: '5%' }}>
                        <hr style={{ width: '100%' }} />
                        <label style={{ textAlign: 'center', paddingLeft: '5%', paddingRight: '5%' }} >Or</label>
                        <hr style={{ width: '100%' }} />
                    </div>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control name="firstname" type="text" placeholder="First name" value={formData.firstname} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control name="lastname" type="text" placeholder="Last name" value={formData.lastname} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control name="email" type="email" placeholder="Email" value={formData.email} />
                    </Form.Group>
                </>
            )
        }
        else if (page === 2) {
            return (
                <>
                    <h4><b>Education Qualification</b></h4>
                    <hr style={{ width: '100%' }}></hr>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Institute <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Select name="institute" value={formData.institute} >
                            {instituteList.map(ins => {
                                return (<option key={ins} value={ins}>{ins}</option>)
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Education <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Select name="education" value={formData.education} >
                            {eduList.map(ed => {
                                return (<option key={ed} value={ed}>{ed}</option>)
                            })}
                        </Form.Select>
                    </Form.Group>


                </>
            )
        }
        else {
            return (
                <>
                    <h4><b>CV</b></h4>
                    <hr style={{ width: '100%' }}></hr>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload CV</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Control name="cv" type="file" onChange={(e) => changeCV(e)} />
                            <img hidden={!fileUploading} className='loading' src="https://img.icons8.com/color/48/000000/loading.png" />
                            <img hidden={!fileUploaded} className='rightImg' src={rightImg} />
                        </div>
                    </Form.Group>

                    {/* <Button variant="primary" size="sm" onClick={() => handleSubmit()}> */}
                    <Button variant="primary" size="sm" onClick={() => uploadCV()}>
                        Upload
                    </Button>
                </>
            )
        }
    }

    return (
        <Card className=' card dropShadow'>
            <div className='card-inner'>
                <Form onChange={handleChanges} onSubmit={handleSubmit}>
                    <div className={animdirection === 'left' ? 'slide-left' : animdirection === 'right' ? 'slide-right' : ''}>
                        {PageHandler(formData, handleChanges)}
                    </div>
                </Form>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3%', padding:"10px" }}>
                    {page > 1 ? <Button variant="primary" size="sm" onClick={() => {
                        setanimdirection('right')
                        setTimeout(() => {
                            setpage(page - 1)
                            setanimdirection(null)
                        }, 500)
                    }}>
                        Back
                    </Button> : <></>}
                    {page < 3 ? <Button variant="primary" size="sm" onClick={() => {
                        setanimdirection('left')
                        setTimeout(() => {
                            setpage(page + 1)
                            setanimdirection(null)
                        }, 500)
                    }}>
                        Next
                    </Button> : <></>}
                    {page === 3 ? <Button variant="primary" size="sm" type='submit' disabled={!validForm}>
                        Submit
                    </Button> : <></>}
                </div>
            </div>

        </Card>
    )
}
