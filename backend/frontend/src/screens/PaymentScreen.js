import { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod} from '../actions/cartActions'
import { Redirect, Link, useNavigate, useParams, useLocation } from 'react-router-dom'


function PaymentScreen() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const{ shippingAddress } = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='Paypal or Credit Cart'
                        id='paypal'
                        name='peymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default PaymentScreen