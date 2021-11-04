import React, { useContext, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { AuthContext } from '../../contexts/AuthContext'
import { Spinner, Card, Button, Row, Col, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap'
import SinglePost from '../posts/SinglePost'
import AddPostModal from '../posts/AddPostModal'
import UpdatePostModal from '../posts/UpdatePostModal'
import addIcon from '../../assets/plus-circle-fill.svg'


const Dashboard = () => {

    const { authState: { user: { username } } } = useContext(AuthContext)

    const {
        postState: { post, posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast,
    } = useContext(PostContext)

    useEffect(getPosts, [])



    let body

    if (postsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username} </Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn.
                        </Card.Text>
                        <Button variant='primary' onClick={ setShowAddPostModal.bind(this, true) }> LearnIt</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {
                        posts.map(post => (
                            <Col key={post._id} className='my-2'>
                                <SinglePost post={post} />
                            </Col>
                        ))
                    }
                </Row>

                {/* Open Add Post Modal */}

                <OverlayTrigger
                    placement='left'
                    overlay={
                        <Tooltip>Add a new thing to learn</Tooltip>
                    }>
                    <Button
                        className='btn-floating'
                        onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt='Add Icon' width='60' height='60' />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }


    return (
        <>
            {body}
            <AddPostModal />
            {post ? <UpdatePostModal /> : null}
            {/* After post is Added, show toast */}
            <Toast
                show={show}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null,
                })}
                delay={3000}
                autohide    
                style={{ position: 'fixed', top: '20%', right: '10px', }}
                className={`bg-${type} text-white`}>
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard
