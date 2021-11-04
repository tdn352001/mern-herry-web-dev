
import React, { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {

    const { 
        showAddPostModal, 
        setShowAddPostModal, 
        addPost,
        setShowToast,
    } = useContext(PostContext)

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        slug: '',
        status: 'TO LEARN',
    })

    

    

    const {title, description, slug} = newPost
    const handleChangeNewPost = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        })
    }

    const closeDialog = () => {
        setNewPost({
            title: '',
            description: '',
            slug: '',
            status: 'TO LEARN',
        })
        setShowAddPostModal(false)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const { success, message } = await addPost(newPost)
        const type = success ? 'success' : 'danger'
        setShowToast({ 
            show: true,
            message,
            type
        })
        closeDialog()
    }


    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title> What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={handleChangeNewPost}
                            required
                            aria-describedby='title-help' />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            as='textarea' 
                            rows='3' 
                            placeholder='Description' 
                            value={description}
                            onChange={handleChangeNewPost}
                            name='description' />
                    </Form.Group>
                    <Form.Group className='mt-4'>
                        <Form.Control 
                            type='text' 
                            placeholder='Youtube Tutorial Url' 
                            value={slug}
                            onChange={handleChangeNewPost}
                            name='slug' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'> LearnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
