import Head from 'next/head'
import Link from 'next/link'

import { Image,Form,FormControl,InputGroup,Button,Row,Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useRef } from 'react'

export default function login() {

    const   username    =   useRef(null)
    const   pwd         =   useRef(null)
    const   con_pwd     =   useRef(null)
    const   fname       =   useRef(null)
    const   lname       =   useRef(null)
    const   accept      =   useRef(null)

    async function handlerSignup()  {

        NProgress.start()
        const   register    =   await fetch('https://lufz-api.herokuapp.com/member/signup',{
            method  :   'POST',
            headers :   {
                'Content-Type'  :   'Application/json'
            },
            body    :   JSON.stringify({
                username    :   username.current.value,
                password    :   pwd.current.value,
                con_password:   con_pwd.current.value,
                first_name  :   fname.current.value,
                last_name   :   lname.current.value
            })
        })

        const   resp    =   await register.json()
        NProgress.done()

    }

    return  <>
            <Head>
                <title>สมัครสมาชิก - ระบบบันทึกรายรับรายจ่าย</title>
            </Head>
            <Row className="mx-0">
                <Col md={{span:6, offset:3}}>
                    <Image  src="./logo450x200.png"
                            width={250}
                            height={110}
                            className="d-block mx-auto my-3"
                    />
                    <h2 className="text-center">สมัครสมาชิก</h2>
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
                        <Form.Check type="checkbox" label="ยอมรับข้อตกลง เงื่อนไขการใช้บริการ" ref={accept} />
                        <Link href="/policy" className="text-muted">ดูเงื่อนไขการใช้บริการได้ที่นี่</Link>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="success" type="button" onClick={handlerSignup}>
                            <FontAwesomeIcon icon={faKey} /> สมัครสมาชิก
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </>
}