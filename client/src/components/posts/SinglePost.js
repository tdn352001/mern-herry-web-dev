import { Card, Row, Col, Badge } from 'react-bootstrap'
import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { _id, status, title, description, slug } }) => {
    return (
        <Card
            className='shadow'
            border={status === 'LEARNDED' ? 'success' : (status === 'LEARNING' ? 'warning' : 'danger')}>

            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{title}</p>
                            <Badge
                                pill
                                variant={status === 'LEARNDED' ? 'info' :
                                    (status === 'LEARNING' ? 'warning' : 'danger')}
                            >
                                {status}
                            </Badge>
                        </Col>
                        <Col className="text-right">
                            <ActionButtons url={slug} id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>

            </Card.Body>

        </Card>
    )
}

export default SinglePost
