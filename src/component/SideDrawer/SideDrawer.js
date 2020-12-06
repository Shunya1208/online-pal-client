import React, {Component} from "react";
import Backdrop from "../UI/Backderop/Backderop";
import Aux from "../../hoc/Aux/Aux";
import NavigationItem from "../NavigationItem/NavigationItem";
import classes from "./SideDrawer.module.css";
import Title from "../CorpName/CorpName";
import User from "../User/User";
import { Link } from "react-router-dom";

class SideDrawer extends Component {

    clickHandler = () => {
        this.props.close();
        this.props.logout();
    }
    
    render () {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (this.props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    let attachedTitleClasses =[classes.TitleBox];

    
    const navItem = [
        {path: "/login", name:"log in"},
        {path: "/signup", name:"sign up"},
    ]

    let navItems = navItem.map(el => {
        return (
            <NavigationItem key={el.name} name={el.name} path={el.path} close={this.props.close}/>
        )
    });

    let user = null;

    if (this.props.isAuthenticated) {
        user = <User type="link" path="/setting/info" url={`http://127.0.0.1:3000/img/users/${this.props.user.photo}`} close={this.props.close}/>
        attachedTitleClasses = [classes.TitleBox, classes.User]
        navItems = (
            <Aux>
                <Link to="/setting/info" onClick={this.props.close} className={classes.List}><ion-icon name="information-circle-outline"></ion-icon> <span>User Info</span></Link>
                <Link to="/setting/profile" onClick={this.props.close} className={classes.List}><ion-icon name="person-outline"></ion-icon> <span>Profile</span></Link>
                <Link to="/setting/bookmark" onClick={this.props.close} className={classes.List}><ion-icon name="bookmark-outline"></ion-icon> <span>Bookmark</span></Link>
                <Link to="/setting/message" onClick={this.props.close} className={classes.List}><ion-icon name="mail-outline"></ion-icon> <span>Message</span></Link>
                {/* <Link to="/setting/video" onClick={this.props.close} className={classes.List}><ion-icon name="videocam-outline"></ion-icon> <span>Video</span></Link> */}
                <Link to="/setting/account" onClick={this.props.close} className={classes.List}><ion-icon name="settings-outline"></ion-icon> <span>Setting</span></Link>
                <div className={classes.Logout} onClick={this.clickHandler}>log out</div>;
            </Aux>
        )
    }
        return(
            <Aux>
                <Backdrop show={this.props.show} close={this.props.close}/>
                <div className={attachedClasses.join(" ")}>
                    <div className={attachedTitleClasses.join(" ")}>
                        <Title/>
                        {user}
                    </div>
                    <nav>
                        <ul className={classes.SideList}>
                            {navItems}
                        </ul>
                    </nav>
                </div>
            </Aux>
        )
    }
}

export default SideDrawer;