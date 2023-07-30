import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const navigate = useNavigate()

    const location = useLocation()

    const [keyword, setKeyword] = useState('')

    const pathName = location.pathname.toString()

    const searchName = ('/?keyword='+keyword).toString()

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword){
            navigate(searchName)
        }else{
            navigate(navigate(pathName))
        }
    }
  return (
    <Form onSubmit={submitHandler}>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
            >
        </Form.Control>

            <Button
                type='submit'
                variant='outline-succes'
                className='p-2'
            >
                Submit
            </Button>
        
    </Form>
  )
}

export default SearchBox