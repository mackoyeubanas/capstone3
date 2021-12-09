/* footer component */
import React, { Component } from 'react';
import '../styles/footer.css';

export default class footer extends Component {
    render() {
        return (
            <div className="footer-parent">
                <div className="footer my-5, py-5">
                    <p>Email us: <a href="mailto:meubanas@gmail.com">meubanas@gmail.com</a></p>
                    <p>Call us: +6399999999</p>
                    <p>Visit us: Pasig City, Philippines</p>
                </div>
            </div>
        )
    }
}
