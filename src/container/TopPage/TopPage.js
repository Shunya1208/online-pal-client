import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./TopPage.module.css"
import QuickSearch from "../../component/QuickSearch/QuickSearch"
import LocationSearch from "../../component/LocationSearch/LocationSearch";
import LanguageSearch from "../../component/LanguageSearch/LanguageSearch";
import {distance,getDate,getOneYearAgo} from "../../shared/utility";
import TestLogin from "../../component/TestLogin/TestLogin";
import ButtonSpinner from "../../component/UI/Spinner/ButtonSpinner"

class TopPage extends Component {

    state = {
        searchForm: {
            minAge: {
                elementType: "input",
                label: "Min age",
                elementConfig: {
                    type: "number",
                    min: "16",
                    max: "99"
                }
            },
            maxAge: {
                elementType: "input",
                label: "Max age",
                elementConfig: {
                    type: "number",
                    min: "16",
                    max: "99"
                }
            },
            male: {
                elementType: "input",
                label: "Male",
                elementConfig: {
                    type: "checkbox",
                    name: "gender"
                }
            },
            female: {
                elementType: "input",
                label: "Female",
                elementConfig: {
                    type: "checkbox",
                    name: "gender"
                }
            },
            countries: {
                elementType: "select",
                label: "Countries",
                elementConfig: {
                    name: "countries"
                }
            },
            languages: {
                elementType: "select",
                label: "Languages",
                elementConfig: {
                    name: "languages"
                }
            },
    },
        countries:[
            {name: "United Kingdom",photo:"england.jpg",latitude:51.494890,longitude:-0.124829,distance:null},
            {name: "France",photo:"france.jpg",latitude:48.860559,longitude:2.352905,distance:null},
            {name: "Germany",photo:"germany.jpg",latitude:52.510275,longitude:13.402732,distance:null},
            {name: "United States",photo:"usa.jpg",latitude:37.767070,longitude: -122.412854,distance:null},
            {name: "Japan",photo:"japan.jpg",latitude:35.673397,longitude:139.751221,distance:null},
            {name: "China",photo:"china.jpg",latitude:39.899560,longitude:116.404317,distance:null},
            {name: "Russia",photo:"russia.jpg",latitude:55.728397,longitude:37.549773,distance:null},
            {name: "Brazil",photo:"brazil.jpg",latitude:-22.915899,longitude:-43.188703,distance:null}
        ]
    }

    
    componentDidMount() {
        this.props.onInitializeInput(
            {
                minAge: 16,
                maxAge: 99,
                male: true,
                female: true,
                countries: "Any",
                languages: "Any"
            }
        )

        this.props.onFetchUsers({},this.props.pageDisplayNum);

        let distances = [];
        let updatedElement ={};

        const successFunc =(position) =>{
            // Calculate distances between current position and city's position
            this.state.countries.forEach(el => {
                distances.push(distance(el.latitude, el.longitude, position.coords.latitude, position.coords.longitude))
            })
            // Update distances
            updatedElement= {...this.state};
            const updatedArray = [...updatedElement["countries"]];
            const updatedDistances = updatedArray.map((el,i) => {
                const obj = {...el};
                obj["distance"] = distances[i];

                return obj;
            })
            // Update current position
            const updatedPosition = {latitude:position.coords.latitude,longitude:position.coords.longitude};
            this.props.onUpdateLocation(updatedPosition)
            if(this.mounted)
            this.setState({countries:updatedDistances});
        }

        if(navigator.geolocation){
            // Get current position
            navigator.geolocation.getCurrentPosition(successFunc)
        }
    }

    componentWillUnmount(){
        this.mounted = false;
      }

    inputChangeHandler = (event,id) => {
        let value = event.target.value * 1;

        if(id==="male") {
            value= !this.props.male
        } else if(id==="female") {
            value = !this.props.female
        }

        this.props.onUpdateInput(id, value);
    }

    submitHandler = (event) => {
        event.preventDefault()
        let gender="";
        let minAge = getDate(this.props.minAge);
        let maxAge = getDate(this.props.maxAge,"max");

        if(this.props.male && !this.props.female ) {
            gender = "Male"
        } else if (!this.props.male && this.props.female) {
            gender = "Female"
        }

        if(minAge === maxAge) {
            maxAge = getOneYearAgo(minAge)
        }

        this.props.onFetchUsers({
            minAge,
            maxAge,
            gender
        },this.props.pageDisplayNum);
    }

    clickUserChangeHandler = (event, info) => {
        this.props.onUpdateSelectedUser(info);
    }

    clickLocationChangeHandler = (event,country) => {
        this.props.onUpdateInput("countries", country);
        this.props.onFetchUsers({
            country
        },this.props.pageDisplayNum);
    }

    clickLanguageChangeHandler = (event,language) => {
        this.props.onUpdateInput("languages", language);
        this.props.onFetchUsers({
            native:language
        },this.props.pageDisplayNum);
    }

    testLoginHandler = (formData) => {
        this.props.onAuth(formData, "Log In");
    }

    render () {
        let formElementsArray = [];
        this.mounted = true;

        for(let key in this.state.searchForm) {
            if(key !== "countries" && key!== "languages")
            formElementsArray.push({
                id: key,
                config: this.state.searchForm[key]
            })
        }
        let content = "Guest Login";

        if(this.props.loading) {
            content = <ButtonSpinner/>
        }

        return (
            <div className={classes.Container}>
                <section className={classes.Header}>
                    <h1>Find your international friends</h1>
                    <div className={classes.ButtonBox}>
                        {this.props.isAuthenticated ? null : <TestLogin click={() => this.testLoginHandler({email:"test1@test1.com",password:"test1test1"})}>{content}</TestLogin>}
                    </div>
                </section>
                <section className={classes.QuickSearch}>
                    <QuickSearch 
                        users={this.props.users.slice(0,6)} 
                        formElementsArray={formElementsArray} 
                        change={(event,id) => this.inputChangeHandler(event,id)}
                        click={(event,info) => this.clickUserChangeHandler(event,info)}
                        submit={(event) => this.submitHandler(event)}
                        />
                </section>
                <section className={classes.LocationSearch}>
                    <LocationSearch countries={this.state.countries} click={(event,country) => this.clickLocationChangeHandler(event,country)}/>
                </section>
                <section className={classes.languageSearch}>
                    <LanguageSearch click={(event,language) => this.clickLanguageChangeHandler(event,language)}/>
                </section>
            </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
        minAge: state.search.minAge,
        maxAge: state.search.maxAge,
        male: state.search.male,
        female: state.search.female,
        countries: state.search.countries,
        languages: state.search.languages,
        users: state.user.users,
        pageDisplayNum: state.user.pageDisplayNum,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onFetchUsers : (formObj,pageDisplayNum) => dispatch(actions.fetchUsers(formObj,pageDisplayNum)),
        onUpdateInput: (name,value) => dispatch(actions.updateInput(name,value)),
        onUpdateSelectedUser: (user) => dispatch(actions.updateSelectedUser(user)),
        onInitializeInput: (obj) => dispatch(actions.initializeInput(obj)),
        onUpdateLocation: (obj) => dispatch(actions.updateLocation(obj)),
        onAuth: (dataObj,type) => dispatch(actions.auth(dataObj, type)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopPage);