
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'

const ActionButtons = ({ url, id }) => {

    const { deletePost, findPostById, setShowUpdatePostModal } = useContext(PostContext)

    const handleDeletePost = () => {
        deletePost(id)
    }

    const handleUpdatePost = () => {
        findPostById(id)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt='Learn' width='32' height='32' />
            </Button>
            <Button className='post-button' onClick={handleUpdatePost} >
                <img src={editIcon} alt='Learn' width='24' height='24' />
            </Button>
            <Button className='post-button' onClick={handleDeletePost}>
                <img src={deleteIcon} alt='Learn' width='32' height='32' />
            </Button>
        </>
    )
}

export default ActionButtons
