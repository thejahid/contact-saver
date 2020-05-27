import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <Fragment>
            <header class='masthead d-flex'>
                <div class='container text-center my-auto'>
                    <h4 class='mb-7'>Contact Saver</h4>
                    <p class='mb-10'>
                        A Free & Secure Way to Save Your Contact List.
                    </p>
                    <Link className='btn btn-warning' to='/signup'>
                        Sign Up
                    </Link>
                    <Link className='btn btn-info' to='/login'>
                        Login
                    </Link>
                </div>
                <div class='overlay'></div>
            </header>
        </Fragment>
    )
}

export default Home
