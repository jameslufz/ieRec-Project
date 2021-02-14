import Link from 'next/link'
import Head from 'next/head'

import { Router } from 'next/dist/client/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import style from '../styles/custom.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar,Nav,Image } from 'react-bootstrap'

NProgress.configure({
    showSpinner: false
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


export default function MyApp({ Component, pageProps }) {
    return (<>
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
    <Component {...pageProps} />
    <p className="text-center py-3">copyright © 2021 Powered by iLufz</p>
    </>)  
}
