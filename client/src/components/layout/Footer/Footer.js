import React from 'react'
import playStore from '../../../images/Playstore1.png';
import appStore from '../../../images/appStore.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>This is learning tut</h4>
                <p>hey there i'm learning bro</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />

            </div>
            <div className="midFooter">
                <h4>Ecomemrce</h4>
                <p>Quality is our first priority</p>
                <p>Copywrite &copy; 2021 Al Mamun</p>

            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://almamunsheikh.com">almamunsheikh.com</a>
                <a href="https://almamunsheikh.xyz">almamunsheikh.xyz</a>
                <a href="https://labmetaverse.almamunsheikh.xyz">Labmetaverse</a>

            </div>
        </footer>
    )
}

export default Footer
