import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function Error404() {
    return (
        <div className='container' >
            <Jumbotron>
                <h1>404</h1>
                <p>Page not found</p>
            </Jumbotron>
        </div>
    );
}
