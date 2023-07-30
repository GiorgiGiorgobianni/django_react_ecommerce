import React, { useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions' 


function CartScreen() {
        const location = useLocation()
        const { id } = useParams()
        const qty = location.search ? Number(location.search.split('=')[1]) : 1
        
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const cart = useSelector(state => state.cart)
        const{ cartItems } = cart

        const userLogin = useSelector(state => state.userLogin)
        const { userInfo } = userLogin
        //console.log('cartItems:', cartItems)

        useEffect(() => {
            if (id){
                dispatch(addToCart(id, qty))
            }
        }, [dispatch, id, qty])

        const removeFromCartHandler = (id) => {
            dispatch(removeFromCart(id))
        }

        const checkoutHandler = () =>{
            
            if (userInfo){
                navigate('/shipping')
            }else{
                navigate('/login')
            }
        }

        return (
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/'>Continue Shopping</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={9}>
                                            <Link to={'/product/'+item.product}>{item.name}</Link>

                                            <Col md={2}>
                                                ${item.price}
                                            </Col>

                                            <Col md={4}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }

                                                </Form.Control>
                                            </Col>

                                            <Col md={1}>
                                                <Button 
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item>
                        <div className="d-grid gap-2" >
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length===0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        )
    }

export default CartScreen