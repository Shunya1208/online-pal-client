import React, { Component } from 'react';
import classes from "./UserSetting.module.css";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import UserFormInfo from "../../component/UserFormInfo/UserFormInfo";
import H2 from "../../component/Text/H2/H2";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import MyPage from "../../component/MyPage/MyPage";
import Account from "../../component/Account/Account";
import Scroll from "react-scroll";
import {getAgeString} from "../../shared/utility";
import Bookmark from "../../container/Bookmark/Bookmark";
import Message from "../Message/Message";

class UserSetting extends Component {

    state = {
        inputForm: {
            photo: {
                elementType: "input",
                label: "Your photo",
                elementConfig: {
                    type: "file",
                    name: "photo"
                },
                value:"",
                file:{}
            },
            name: {
                elementType: "input",
                label: "Your name",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                    name: "name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: this.props.user.name
            },
            birth: {
                elementType: "input",
                label: "Your birth",
                elementConfig: {
                    type: "date",
                    name: "birth"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: !this.props.user.birth ? "1900-01-01" : getAgeString(this.props.user.birth)
            },
            gender: {
                elementType: "select",
                label: "Gender",
                elementConfig: {
                    name: "gender"
                },
                value: !this.props.user.gender ? "Male" : this.props.user.gender
            },
            country: {
                elementType: "select",
                label: "Current Counry",
                elementConfig: {
                    name: "country"
                },
                value: !this.props.user.country ? "Any country" :this.props.user.country
            },
            native: {
                elementType: "select",
                label: "Native langugaes",
                elementConfig: {
                    name: "native"
                },
                value: !this.props.user.native ? "Any language" : this.props.user.native
            },
            learning: {
                elementType: "select",
                label: "Languages I'm learning",
                elementConfig: {
                    name: "learning"
                },
                value: !this.props.user.learning ? "Any language" : this.props.user.learning
            },
            summary: {
                elementType: "textarea",
                label: "Introduction",
                elementConfig: {
                    name: "summary"
                },
                value: !this.props.user.summary ? "" : this.props.user.summary
            },
            hobby: {
                elementType: "textarea",
                label: "Hobby and Interest",
                elementConfig: {
                    name: "hobby"
                },
                value: !this.props.user.hobby ? "" : this.props.user.hobby
            }
        },
        formIsValid: false,
        loading: false
    }

    submitHandler = (event) => {
        event.preventDefault();
        const scroll = Scroll.animateScroll;
        let fd = new FormData();
        for(let formElementIdentifier in this.state.inputForm) {
            if(this.state.inputForm[formElementIdentifier].value && formElementIdentifier==="birth"){
                fd.append(formElementIdentifier,parseInt(this.state.inputForm[formElementIdentifier].value.split("-").join("")))
                continue;
            }
            if(this.state.inputForm[formElementIdentifier].file){
                fd.append(formElementIdentifier,this.state.inputForm[formElementIdentifier].file)
                continue;
            }
            if(this.state.inputForm[formElementIdentifier].value)
            fd.append(formElementIdentifier,this.state.inputForm[formElementIdentifier].value)
        }
        this.props.onUpdateMe(fd,this.props.user._id);
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

        if(inputIdentifier === "photo")
        updatedFormElement.file = event.target.files[0];

        if(updatedFormElement.validation)
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        if(updatedFormElement.touched)
        updatedFormElement.touched = true;

        updatedInputForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedInputForm) {
            formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({inputForm: updatedInputForm,formIsValid})
    }

    render () {
        return(
            <div className={classes.UserSetting}>
                <H2>my page</H2>
                <div className={classes.Contianer}>
                    <div className={classes.Sidebar}>
                        <NavLink to="/setting/info"  className={classes.List} activeClassName={classes.Selected}><ion-icon name="information-circle-outline"></ion-icon> <span>User Info</span></NavLink>
                        <NavLink to="/setting/profile" className={classes.List} activeClassName={classes.Selected}><ion-icon name="person-outline"></ion-icon> <span>Profile</span></NavLink>
                        <NavLink to="/setting/bookmark" className={classes.List} activeClassName={classes.Selected}><ion-icon name="bookmark-outline"></ion-icon> <span>Bookmark</span></NavLink>
                        <NavLink to="/setting/message" className={classes.List} activeClassName={classes.Selected}><ion-icon name="mail-outline"></ion-icon> <span>Message</span></NavLink>
                        {/* <NavLink to="/setting/video" className={classes.List} activeClassName={classes.Selected}><ion-icon name="videocam-outline"></ion-icon> <span>Video</span></NavLink> */}
                        <NavLink to="/setting/account" className={classes.List} activeClassName={classes.Selected}><ion-icon name="settings-outline"></ion-icon> <span>Setting</span></NavLink>
                    </div>
                    <div className={classes.Info}>
                        <Route path="/setting/info"  
                            render={() => <UserFormInfo 
                                            inputForm={this.state.inputForm} 
                                            user={this.props.user} 
                                            changed={(event,id) => this.inputChangeHandler(event,id)}
                                            submit={this.submitHandler}
                                            error={this.props.error}
                                            loading={this.props.loading}
                                            />}/>
                        <Route path="/setting/profile" render={() => <MyPage user={this.props.user}/>} />
                        <Route path="/setting/account" render={() => <Account user={this.props.user} error={this.props.error}/>} />
                        <Route path="/setting/bookmark" component={Bookmark} />
                        <Route path="/setting/message" component={Message} />
                        {/* <Route path="/video" component={Video} /> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateMe: (dataObj,id) => dispatch(actions.updateMe(dataObj,id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSetting);