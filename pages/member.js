import Link from 'next/link'
import Head from 'next/head' 

import { useEffect,useState } from 'react'

// import { Table,Row,Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import cookie from 'cookie'
import Router from 'next/router'

import Nav_menu from './utils/navbar'

export default function member({ data }) {
    
    return  <>
            <Head>
                <title>รายชื่อสมาชิกภายในเว็บ</title>
            </Head>
            <Nav_menu />
            {/* <h1>{data.message}</h1> */}
            </>
    
}

export const getServerSideProps =   async ({ req, res })    =>  {

    // const   resp    =   await fetch('./api/auth')
    // const   data    =   await resp.json()
    
    // return  {
    //     props   :   {
    //         data    :   message
    //     }
    // }
    return {
        props : {}
    }

}