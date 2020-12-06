import React, { Component } from 'react';
import classes from "./Form.module.css";
import Button from "../../component/UI/Button/Button";
import Input from "../../component/Input/Input";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Spinner from "../../component/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux"
import ErrorMessage from "../../component/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";

class Form extends Component {
    state = {
        inputForm: {
            name: {
                elementType: "input",
                label: "Your name",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                label: "Email address",
                elementConfig: {
                    type: "email",
                    placeholder: "you@example.com"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            current: {
                elementType: "input",
                label: "Current password",
                elementConfig: {
                    type: "password",
                    placeholder: "●●●●●●●●"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                label: "Password  (8 characters minimum)",
                elementConfig: {
                    type: "password",
                    placeholder: "●●●●●●●●"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            confirm: {
                elementType: "input",
                label: "Confirm Password",
                elementConfig: {
                    type: "password",
                    placeholder: "●●●●●●●●"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 8,
                    passConfirm: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }
   
    submitHandler = (event, type) => {
        event.preventDefault();
        const scroll = Scroll.animateScroll;
        const formData = {};
        for(let formElementIdentifier in this.state.inputForm) {
            if(this.state.inputForm[formElementIdentifier].value)
            formData[formElementIdentifier] = this.state.inputForm[formElementIdentifier].value
        }

        if(this.props.type === "Reset"){
            this.props.onResetPassword(formData, this.props.token);
        }

        if(this.props.type === "Delete"){
            this.props.onCancelMe(this.props.user._id);
        }

        if(this.props.type === "Change"){
            formData["id"] = this.props.user._id
        }

        this.props.onAuth(formData, type);

        scroll.scrollToTop({duration: 1});
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.passConfirm) {
            isValid = this.state.inputForm.password.value === value && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        const updatedInputForm = {
            ...this.state.inputForm
        };

        const updatedFormElement = {
            ...updatedInputForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedInputForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        switch(this.props.type) {
            case "Log In" :
                for(let inputIdentifier in updatedInputForm) {
                    if( inputIdentifier === "email" || inputIdentifier === "password")
                    formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
                }
                break;

            case "Send" :
                formIsValid = updatedInputForm["email"].valid && formIsValid;
                break;

            case "Reset":
                for(let inputIdentifier in updatedInputForm) {
                    if(inputIdentifier === "password" ||  inputIdentifier === "confirm")
                    formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
                }
                break;
            
            case "Change":
                    for(let inputIdentifier in updatedInputForm) {
                        if(inputIdentifier === "password" ||  inputIdentifier === "confirm" || inputIdentifier === "current")
                        formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
                    }
                break;
            
            default:
                for(let inputIdentifier in updatedInputForm) {
                    if( inputIdentifier === "current")
                    continue;
                     formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
                }
                break;  
        }

        this.setState({inputForm: updatedInputForm,formIsValid})
    }

    render () {
        let text;
        let formElementsArray = [];
        let link;
        let style = [classes.Form];
        let sentence;

        switch(this.props.type) {
            case "Log In" :
                text = "log into your account";
                for(let key in this.state.inputForm) {
                    if(key === "email" || key ==="password"){
                    formElementsArray.push({
                        id: key,
                        config: this.state.inputForm[key]
                    })
                 }
                }
    
                 link = <Link to="/forgotPassword" className={classes.ForgotPassword}>Forgot password?</Link>
                break;

            case "Send" :
                text = "Reset your password"
                formElementsArray.push({
                    id: "email",
                    config: this.state.inputForm["email"]
                })
                break;

            case "Reset":
                text = "Reset your password"
                for(let key in this.state.inputForm) {
                    if( key === "password" ||  key === "confirm")
                    formElementsArray.push({
                        id: key,
                        config: this.state.inputForm[key]
                    })
                }
                break;
            
            case "Change":
                text = "Change your password"
                style.push(classes.ChangeForm)
                for(let key in this.state.inputForm) {
                    if( key === "password" ||  key === "confirm" || key === "current"){
                        formElementsArray.push({
                            id: key,
                            config: this.state.inputForm[key]
                        })
                    } 
                }
                break;
            
            case "Delete":
                text = "Delete your account"
                style.push(classes.ChangeForm)
                sentence = <p className={classes.Sentence}>Your account will be scheduled for deletion from the server</p>
                break;

            default:
                text = "create your account";

                for(let key in this.state.inputForm) {
                    if( key === "current")
                    continue;
                    formElementsArray.push({
                        id: key,
                        config: this.state.inputForm[key]
                    })
                }
                break;  
        }

        let title = <h4>{text}</h4>

        let form = (
            <Aux>
                {sentence}
                {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid} 
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event,formElement.id)}
                    label={formElement.config.label}
                    />
                ))}
                {link}

                <Button type="blue" disabled={this.props.type==="Delete" ? false : !this.state.formIsValid} content="button">{this.props.type}</Button>
            </Aux>
        )

        if (this.props.loading) {
            title= null;
            form = <Spinner/>
        }

        if (this.props.sentEmail) {
            title= null;
            form = (
                <div style={{display: 'flex', alignItems: "center",flexDirection:"column"}}>
                    <h3 className={classes.VerifyTitle}>Check your email</h3>
                    <p className={classes.VerifyMessage}>An email was sent to your email address</p>
                </div>
            )
        }
        
        let errorMessage;
        if(this.props.error) {
            errorMessage = <ErrorMessage/>;
        }

        let authRedirect;
        if (this.props.isAuthenticated && this.props.type !== "Change" && this.props.type !== "Delete") {
            authRedirect = <Redirect to="/"/>
        }

        return (
        <div className={style.join(" ")}>
                {authRedirect}
                {errorMessage}
                {title}
                 <form onSubmit={(event) => this.submitHandler(event, this.props.type)}>
                    {form}
                 </form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        sentEmail: state.auth.sentEmail,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (dataObj,type) => dispatch(actions.auth(dataObj, type)),
        onResetPassword: (dataObj,token) => dispatch(actions.resetPassword(dataObj, token)),
        onCancelMe: (id) => dispatch(actions.cancelMe(id)),
        onAuthFail: (err) => dispatch(actions.authFail(err))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form);