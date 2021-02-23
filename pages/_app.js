import Link from 'next/link'
import Head from 'next/head'

import { Router } from 'next/dist/client/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'bootstrap/dist/css/bootstrap.min.css'

NProgress.configure({
    showSpinner: false
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
    
    return (<>
    <Component {...pageProps} />
    <p className="text-center py-3">copyright © 2021 Powered by iLufz</p>
    </>)  
}