import React from "react";
import classes from "./Footer.module.css"

const Footer = (props) => {

    return (
        <footer className={classes.Footer}>
            <div className={classes.Footerbox}>
                <ul>
                    <li>About us</li>
                    <li>Blog</li>
                    <li>Press</li>
                    <li>Jobs</li>
                    <li>IOS App</li>
                </ul>
                <div>
                    <ion-icon name="logo-twitter"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-youtube"></ion-icon>
                    <ion-icon name="logo-facebook"></ion-icon>
                </div>
              
            </div>
            <p>This website was created by Shunya Iida using HTML5 and CSS3, Javascript, React/Redux, Node.js. If your're interested in my project, please contact me :&nbsp; 
                    <a href="mailto:ishunya1208@gmail.com">ishunya1208@gmail.com</a>
            </p>
        </footer>
    )
}

export default Footer;