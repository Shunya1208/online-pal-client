import React, { Component } from "react";
import classes from "./UserFormInfo.module.css";
import User from "../User/User";
import Input from "../Input/Input"
import Button from "../UI/Button/Button";
import Aux from "../../hoc/Aux/Aux"
import Spinner from "../UI/Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {connect} from "react-redux";
import SuccessMessage from "../SuccessMessage/SuccessMessage"

class UserFormInfo extends Component {

    render() {
        let formElementsArray = [];
        let message = null;

        for(let key in this.props.inputForm) {
            formElementsArray.push({
                id: key,
                config: this.props.inputForm[key]
            })
        }

        let form = (
            <Aux>
                {formElementsArray.map(formElement => {
                        return(
                        <Input 
                            key={formElement.id} 
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            invalid={!formElement.config.valid} 
                            touched={formElement.config.touched}
                            changed={(event) => this.props.changed(event,formElement.id)}
                            label={formElement.config.label}
                    />
                    )})}
                        <Button type="blue">Save</Button>
            </Aux>
        )

        if(this.props.loding) {
            form = <Spinner/>
        }

        if(this.props.error) {
            form = <ErrorMessage/>
        }

        if(this.props.message) {
            message = <SuccessMessage>Successfully updated</SuccessMessage>
        }
        
        return (
            <div>
                {message}
                <div className={classes.User}>
                    <User url={`http://127.0.0.1:3000/img/users/${this.props.user.photo}`} name={this.props.user.name}/>
                    <div>{this.props.user.name}</div>
                </div>
                <form onSubmit={this.props.submit}>
                    {form}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.auth.message
    }
}

export default connect(mapStateToProps)(UserFormInfo);