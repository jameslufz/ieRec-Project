import Head from 'next/head'
import Link from 'next/link'

import { Image,Form,FormControl,InputGroup,Button,Row,Col,Toast } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'

import NProgress from 'nprogress'

import { useRef,useState,useEffect } from 'react'
import Router from 'next/router'
 
import { AuthUser } from '../utils/authUsers'
import { Nav_Loggedin } from '../component/navbar'

export default function login({ LoggedIn }) {

    useEffect(() => {
        if(LoggedIn.identify) Router.push('/')
    },[])

    const   username                    =   useRef(null)
    const   pwd                         =   useRef(null)
    const   con_pwd                     =   useRef(null)
    const   fname                       =   useRef(null)
    const   lname                       =   useRef(null)
    const   [accept,setAccept]          =   useState(false)

    const   [load,setLoad]              =   useState(),
            [topic,setTopic]            =   useState(),
            [notify,setNotify]          =   useState(),
            [viewAlert,setViewAlert]    =   useState(false),
            ToggleViewAlert =   ()  =>  setViewAlert(!viewAlert)

    async function handlerSignup()  {
        console.log(process.env.PRIVATE_KEY)
        NProgress.start()
        const   signup  =   await fetch('/api/signup',{
            method  :   'POST',
            headers :   {
                'Content-Type'  :   'Application/json'
            },
            body    :   JSON.stringify({
                username    :   username.current.value,
                password    :   pwd.current.value,
                con_password:   con_pwd.current.value,
                first_name  :   fname.current.value,
                last_name   :   lname.current.value,
                accept_pvc  :   accept
            })
        })
        
        const   resp    =   await signup.json()
        NProgress.done()
        
        setNotify(resp.message)
        setViewAlert(true)
        if(resp.status == 1) await router.replace("/signin")
    }

    return  <>
            <Head>
                <title>สมัครสมาชิก</title>
            </Head>
            <Nav_Loggedin />
            <Row className="mx-0">
                <Col md={{span:6, offset:3}}>
                    <Image  src="./logo450x200.png"
                            width={250}
                            height={110}
                            className="d-block mx-auto my-3"
                    />
                    <h2 className="text-center">สมัครสมาชิก {process.env.PRIVATE_KEY}</h2>
                    <p className="text-center">ขอบคุณสำหรับความไว้ใจ ยินดีต้อนรับสมาชิกใหม่ครับ</p>
                    <Form.Group>
                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Username
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl ref={username} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Password
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="password" ref={pwd} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Confirm Password
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="password" ref={con_pwd} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>ชื่อจริง</Form.Label>
                        <FormControl type="text" placeholder="First Name" ref={fname} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>นามสกุล</Form.Label>
                        <FormControl type="text" placeholder="Last Name" ref={lname} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check type="checkbox" defaultChecked={accept} onChange={()=>setAccept(!accept)} label="ยอมรับข้อตกลง เงื่อนไขการใช้บริการ" />
                        <Link href="/policy" className="text-muted">ดูเงื่อนไขการใช้บริการได้ที่นี่</Link>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="success" type="button" onClick={handlerSignup}>
                            <FontAwesomeIcon icon={faKey} /> สมัครสมาชิก
                        </Button>
                    </Form.Group>
                </Col>
            </Row>

            <Toast  show={viewAlert} onClose={ToggleViewAlert}
                    delay={5000} autohide
                    style={{position:'fixed',top:'3rem',right:10,width:'100%',maxWidth:460,zIndex:9999}}>
                <Toast.Header>
                    <strong className="mr-auto">แจ้งเตือน</strong>
                    <small>เมื่อสักครู่</small>
                </Toast.Header>
                <Toast.Body>{notify}</Toast.Body>
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