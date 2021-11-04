
import React, { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {

    const {
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
        postState: { post}
    } = useContext(PostContext)

    const [newPost, setNewPost] = useState(post)
    const { title, description, slug, status } = newPost


    const handleChangePost = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        })
    }

    const closeDialog = () => {
        setShowUpdatePostModal(false)
        setNewPost(post)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const { success, message } = await updatePost(newPost)
        const type = success ? 'success' : 'danger'
        setShowToast({
            show: true,
            message,
            type
        })
        closeDialog()
    }


    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title> Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitForm}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={handleChangePost}
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
                            onChange={handleChangePost}
                            name='description' />
                    </Form.Group>
                    <Form.Group className='mt-4'>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial Url'
                            value={slug}
                            onChange={handleChangePost}
                            name='slug' />
                    </Form.Group>
                    <Form.Group className='mt-4'>
                        <Form.Control
                            as='select'
                            type='text'
                            placeholder='Youtube Tutorial Url'
                            value={status}
                            onChange={handleChangePost}
                            name='status'>
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNDED'>LEARNDED</option>
                        </Form.Control>
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

export default UpdatePostModal
