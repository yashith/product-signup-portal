import React, { useState ,useEffect } from 'react';
import { Form, Button, Card, Table } from 'react-bootstrap'
import '../Components/igt-form.css'
import { signInWithGoogle } from './../Firebase/firebase-auth';
import { CSSTransition } from 'react-transition-group'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './../Firebase/firebase-firestore'
import { uploadFile, deleteFile } from '../Firebase/firebase-storage';
import Swal from 'sweetalert2';
import rightImg from '../Components/correct.png'

export default function IgtForm() {
    const [formData, setformData] = useState({ firstname: '', lastname: '', email: '', institute: '', education: '', cv: '' })
    const [page, setpage] = useState(1)
    const [cv, setcv] = useState()
    const [animdirection, setanimdirection] = useState()
    const [fileUploading, setfileUploading] = useState(false);
    const [fileUploaded, setfileUploaded] = useState(false);
    const [files, setfiles] = useState({ name: '', id: '' });
    const [validForm, setvalidForm] = useState(false);
    const signupCollection = collection(db, "Signup details");

    const instituteList = ["", "Ins 1", "Ins 2", "Ins 3", "Ins 4"]
    const eduList = ["", "Undergrad", "Grad", "Masters", "Other"]

    useEffect(() => {
        if (formData.firstname !== '' && formData.lastname !== '' && formData.email !== '' && formData.institute !== '' && formData.education !== '') {
            setvalidForm(true)
        }
        else{
            setvalidForm(false)
        }
    
    }, [formData])
    
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
        //e.preventDefault()
    }
    function changeCV(e) {
        e.preventDefault();
        setcv(e.target.files[0])
        // console.log(e.target.files[0].webkitRelativePath);
    }
    function uploadCV(e) {
        e.target.blur()
        setfileUploading(true)
        let fileId = Date.now()
        uploadFile(cv, fileId)
            .then(url => {
                
                let data = { ...formData, cv: url }
                return data
            })
            .then(data => {
                Swal.fire({
                    title: 'Uploaded!',
                    text: 'File Uploaded successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                return data
            })
            .then(data => {
                addDoc(signupCollection, data)
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
            }
            )
            .then(res => setfileUploaded(true))
            .then(res => setfileUploading(false))
            .then(res => {
                setfiles({ ...files, 'name': cv.name, 'id': fileId })
            })
            .catch(e => {
                Swal.fire({
                    title: 'Uploading Failed',
                    text: 'Please try again',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        e.preventDefault()
    }
    function deleteCV(name, id) {
        deleteFile(name, id)
            .then(res => {
                Swal.fire({
                    title: 'File Deleted',
                    text: res,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
            .then(res => {
                setfiles({ ...files, 'name': '', 'id': '' })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error Occurred',
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
                    <Button variant="outline-primary" className='google-button' size="sm" onClick={() => { handleGoogleButton("google") }}>
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
                            <Form.Control name="cv" type="file" onChange={(e) => changeCV(e)} disabled={files.name !== ''} />
                            <img hidden={!fileUploading} className='loading' src="https://img.icons8.com/color/48/000000/loading.png" />
                            <img hidden={!fileUploaded || (files.name === '')} className='rightImg' src={rightImg} />
                        </div>
                    </Form.Group>
                    <Table>
                        <tr style={{ textAlign: 'center' }}>
                            <td>{files.name}</td>
                            {/* <td>{files.name !== '' ? <a onClick={() => deleteCV(files.name, files.id)}><svg className='close-svg' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg></a> : ''}</td> */}
                        </tr>
                    </Table>

                    {/* <Button variant="primary" size="sm" onClick={() => handleSubmit()}> */}
                    {/* <div style={{ display: 'flex', justifyContent: 'end', marginTop: '3%', padding: "10px" }}>
                        <Button variant="primary" size="sm" onClick={(e) => uploadCV(e)}>
                            Upload File
                        </Button>
                    </div> */}
                </>
            )
        }
    }

    return (
        <Card className=' card dropShadow'>
            <div className='card-inner'>
                <Form onChange={handleChanges} onSubmit={uploadCV}>
                    <div className={animdirection === 'left' ? 'slide-left' : animdirection === 'right' ? 'slide-right' : ''}>
                        {PageHandler(formData, handleChanges)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%', padding: "10px" }}>
                        {page === 3 ? <Button className="submit-button" variant="success" size="sm" type='submit' disabled={!validForm}>
                            Submit
                        </Button> : <></>}
                    </div>
                </Form>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3%', padding: "10px" }}>
                    {page > 1 ? <Button className='nav-button' variant="outline-primary" size="sm" onClick={(e) => {
                        e.target.blur()
                        setanimdirection('right')
                        setTimeout(() => {
                            setpage(page - 1)
                            setanimdirection(null)
                        }, 500)
                    }}>
                        Back
                    </Button> : <></>}
                    {page < 3 ? <Button className='nav-button' variant="primary" size="sm" onClick={(e) => {
                        e.target.blur()
                        setanimdirection('left')
                        setTimeout(() => {
                            setpage(page + 1)
                            setanimdirection(null)
                        }, 500)
                    }}>
                        Next
                    </Button> : <></>}
                </div>

            </div>

        </Card>
    )
}
