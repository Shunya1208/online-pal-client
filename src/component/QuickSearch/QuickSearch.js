import React from 'react';
import Aux from "../../hoc/Aux/Aux";
import H2 from "../Text/H2/H2";
import InputSearch from "../InputSearch/InputSearch";
import Button from "../UI/Button/Button";
import UserSmallInfo from "../../container/UserSmallInfo/UserSmallInfo";
import classes from "./QuickSearch.module.css";
import {connect} from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import { Link } from "react-router-dom";

const QuickSearch = (props) => {

    let userInfo = props.users.length ? props.users.map((el) => {
        return <UserSmallInfo key={el._id} info={el} click={props.click}/>
    }) : <div className={classes.NoResults}>No users found</div>

    let button
    let viewMore; 
    
    button = <Button type="blue" click={props.submit}>Search</Button>
    viewMore =<Link className={classes.ViewMore} to="/search">View More<ion-icon name="arrow-forward-outline"></ion-icon></Link>

    if(props.loading) {
        userInfo =<div className={classes.Spinner}><Spinner/></div> 
        button = null;
        viewMore = null;

    }
    return (
        <Aux>
            <H2>quick search friends</H2>
            <form className={classes.Form}>
                {props.formElementsArray.map(formElement => (
                        <InputSearch 
                            key={formElement.id} 
                            id={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            changed={(event) => props.change(event,formElement.id)}
                            label={formElement.config.label}
                            />
                    ))}
                    <span>{button}</span>
            </form>
            <div className={classes.UserInfoBox}>
                {userInfo}
                {viewMore}
            </div>
        </Aux>
    )
};
const mapStateToProps = state => {
    return {
        loading: state.user.loading
    }
}

export default connect(mapStateToProps)(QuickSearch);

