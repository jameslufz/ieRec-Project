import Link from 'next/link'
import Head from 'next/head'

import { Image,Form,Button,Row,Col,Container,Card,Toast,Spinner } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import NProgress from 'nprogress'

import { useEffect, useRef,useState } from 'react'
import Router from 'next/router'

// utils
import { Nav_Loggedin, Nav_unLoggedin } from '../component/navbar'
import { AuthUser } from '../utils/authUsers'

export default function Login({ LoggedIn }) {

    useEffect(() => {
        if(LoggedIn.identify) Router.push('/')
    },[])

    const   usernameRef =   useRef(null)
    const   passwordRef =   useRef(null)

    const   [notify,setNotify]      =   useState(false)
    const   [notiMSG,setNotiMSG]    =   useState(),
            [token, setToken]       =   useState(null)


    async function handlerLogin () {
        
        NProgress.start()
        const   resp     =   await fetch('/api/signin',{
            method  :   'POST',
            headers :   {
                'Content-type'  :   'application/json'
            },
            body    :   JSON.stringify({
                username   :   usernameRef.current.value,
                password   :   passwordRef.current.value
            })
        })
        const   data    =   await resp.json()
        NProgress.done()
        
        await setNotify(!notify)
        await setNotiMSG(data.message)
        if(data.token) Router.replace("/")

    }

    return  <>

            <Head>
                <title>ระบบบันทึกรายรับรายจ่าย</title>
            </Head>
            {LoggedIn.identify ? <Nav_Loggedin /> : <Nav_unLoggedin />}
            <Container fluid>
                <Row>
                    <Col className="px-0" md>
                        <Card style={{border:0}}>
                            <Card.Body style={{padding:'5rem'}}>
                                <Image src="./logo80x80.png" className="mx-auto mb-3 d-block" />
                                <h2 className="text-center">เข้าสู่ระบบ</h2>
                                <Form>
                                    <Form.Group controlId="username">
                                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                                        <Form.Control type="text" placeholder="Username" ref={usernameRef} />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>รหัสผ่าน</Form.Label>
                                        <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Text className="text-muted">
                                            หากท่านยังไม่มีชื่อผู้ใช้ สามารถสมัครสมาชิก <Link href="/signup">คลิกที่นี่</Link>
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="button" onClick={handlerLogin}>
                                            <FontAwesomeIcon icon={faSignInAlt} /> เข้าสู่ระบบ
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="px-0">
                        <Image  src="./images/signup.jpg"
                                fluid
                                className="d-block mx-auto"
                                style={{height:650}}
                        />
                    </Col>
                </Row>
            </Container>

            <Toast  style={{
                        position: 'fixed',
                        top: 10,
                        right: 10,
                        maxWidth:400,
                        width:'100%',
                        zIndex:9999
                    }}
                    onClose={() => setNotify(false)}
                    show={notify}
                    delay={10000}
                    autohide>
                <Toast.Header>
                    <strong className="mr-auto"> แจ้งเตือน</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body style={{backgroundColor:'white'}}>{notiMSG}</Toast.Body>
            </Toast>

        </>
}

export const getServerSideProps = async ({ req, res }) => {

    const   data    =   await AuthUser(req, res)
    return {
        props   :   {
            LoggedIn    :   data
        }
    }

}