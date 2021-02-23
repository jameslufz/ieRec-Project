import Link from 'next/link'

import { Navbar,Nav,Image } from 'react-bootstrap'
import style from '../styles/custom.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Router from 'next/router'

export function Nav_unLoggedin() {
    
    return <div>
    <Navbar collapseOnSelect expand="lg" className={style.nav_bg} sticky="top">
        <Link  href="/" passHref>
            <Navbar.Brand>
                <Image  src="./logo80x80.png"
                        className="d-inline-block aling-top"
                        width={60} /> IERec
            </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="mr-auto">
                <Link  href="/signin" passHref><Nav.Link>เข้าสู่ระบบ</Nav.Link></Link>
                <Link  href="/signup" passHref><Nav.Link>สมัครสมาชิก</Nav.Link></Link>
                <Link  href="/about" passHref><Nav.Link>เกี่ยวกับเรา</Nav.Link></Link>
                <Link  href="/contact" passHref><Nav.Link>ติดต่อเรา</Nav.Link></Link>
            </Nav>
            <Nav>
                <Navbar.Text>
                Powered by <a href="#login">iLufz</a>
                </Navbar.Text>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
}
export function Nav_Loggedin() {

    return <div>
    <Navbar collapseOnSelect expand="lg" className={style.nav_bg} sticky="top">
        <Link  href="/" passHref>
            <Navbar.Brand>
                <Image  src="./logo80x80.png"
                        className="d-inline-block aling-top"
                        width={60} /> IERec
            </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="mr-auto">
                <Link  href="/contact" passHref><Nav.Link>เข้าสู่โปรแกรม</Nav.Link></Link>
                <Link  href="/contact" passHref><Nav.Link>โปรไฟล์</Nav.Link></Link>
                <Nav.Link onClick={async() => {
                    const signout = await fetch('/api/signin',{ 
                        method: 'DELETE',
                        body: {}
                    })
                    const result  = await signout.json()
                    if(result.signouted) Router.replace("/signin")
                }}>ออกจากระบบ</Nav.Link>
            </Nav>
            <Nav>
                <Navbar.Text>
                Powered by <a href="#login">iLufz</a>
                </Navbar.Text>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
}