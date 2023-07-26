import Head from "next/head"
import React from "react"

type Props = { title:string, content:string, children:React.ReactNode}

const Layout = ({children, title, content}:Props) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           
            <main>{children}</main>
           
        </>
    )
}

export default Layout