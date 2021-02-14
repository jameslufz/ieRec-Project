import Link from 'next/link'

import { Navbar,Nav,Carousel,Form,Button,Row,Col,Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Swal from 'sweetalert2'

import { useRef } from 'react'
import { Router } from 'next/dist/client/router'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function login() {

    const   usernameRef =   useRef(null)
    const   passwordRef =   useRef(null)

    async function handlerLogin () {
        
        NProgress.start()
        const   res     =   await fetch('https://lufz-api.herokuapp.com/member/login',{
            method  :   'POST',
            headers :   {
                'Content-type'  :   'application/json'
            },
            body    :   JSON.stringify({
                username   :   usernameRef.current.value,
                password   :   passwordRef.current.value
            })
        })
        const   data    =   await res.json()
        NProgress.done()
        const   status  =   data.status ? data.status : false
        if(status){
            Swal.fire("Error",data.message,data.status)
        }
    }

    return  <>
            <Carousel>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.w3schools.com/howto/img_nature_wide.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.w3schools.com/howto/img_snow_wide.jpg"
                        alt="Third slide"
                    />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://www.w3schools.com/howto/img_lights_wide.jpg"
                alt="Third slide"
                />
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
}