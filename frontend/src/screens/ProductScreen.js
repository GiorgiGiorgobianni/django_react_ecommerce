import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'


function ProductScreen() {

  const [qty, setQty] = useState(1)
  
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()


  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin



  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () =>  {
    navigate('/cart/'+id+'?qty='+qty)
  }

   return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Continue Shopping</Link>
        {loading ?
          <Loader/>
          : error
            ? <Message variant='danger'>{error}</Message>
          :(
            <div>
              <Row>
            <Col md={6}>
              <Image fluid src={product.image} alt={product.name}/>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush" >
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h4>${product.price}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock':'out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 &&(
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col md={4} className='my-1'>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {
                              [...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x+1}
                                </option>
                              ))
                            }

                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className='d-grid gap-2'>
                      <Button
                        onClick={addToCartHandler}
                        className='btn-block'
                        disabled={product.countInStock === 0}
                        type='button'>
                          Add to cart
                      </Button>
                    </div>

                  </ListGroup.Item>

                </ListGroup>
              </Card>
            </Col>
          </Row>

        </div>
        )

        }
        
    </div>
  )
}

export default ProductScreen