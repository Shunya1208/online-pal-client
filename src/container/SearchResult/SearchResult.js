import React, {Component} from 'react';
import Button from "../../component/UI/Button/Button";
import classes from "./SearchResult.module.css";
import UserInfo from "../../component/UserInfo/UserInfo";
import InputSearch from "../../component/InputSearch/InputSearch";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../component/UI/Spinner/Spinner";
import ReactPaginate from 'react-paginate';
import {getDate,getOneYearAgo} from "../../shared/utility";
import Scroll from "react-scroll";

class SearchResult extends Component {
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
                    checked: "checked",
                    name: "gender"
                }
            },
            female: {
                elementType: "input",
                label: "Female",
                elementConfig: {
                    type: "checkbox",
                    checked: "checked",
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
            }
     
    }
}

    onCurrentPageChangeHandler = (page) => {
        this.props.onUpdatePage(page.selected + 1)
        const scroll = Scroll.animateScroll;

        scroll.scrollToTop({duration: 1});
    }

    inputSubmitHandler = (event) => {
        event.preventDefault();
        const scroll = Scroll.animateScroll;
        let gender="";
        let minAge = getDate(this.props.minAge);
        let maxAge = getDate(this.props.maxAge,"max");
        const country= this.props.countries ==="Any" ? "" : this.props.countries;
        const native= this.props.languages ==="Any" ? "" : this.props.languages

        if(this.props.male && !this.props.female ) {
            gender = "Male"
        } else if (!this.props.male && this.props.female) {
            gender = "Female"
        }

        if(minAge === maxAge) {
            maxAge = getOneYearAgo(minAge)
        }

        const searchObj = {
            minAge,
            maxAge,
            gender,
            country,
            native
        };
         this.props.onFetchUsers(searchObj,this.props.pageDisplayNum);
         scroll.scrollToTop({duration: 1});
    };

    inputChangeHandler = (event,id) => {
        let value = event.target.value ;

        if(id === "minAge" || id === "maxAge")
          value = value * 1;

        if(id === "male") {
            value= !this.props.male
        }else if(id === "female") {
            value= !this.props.female
        }
        this.props.onUpdateInput(id, value);

    };

    getPage = () => {
        let pageLast;
        let pageStart;
        pageStart = (this.props.current-1)*this.props.pageDisplayNum + 1;
        pageLast=(this.props.current - 1)*this.props.pageDisplayNum + this.props.pageDisplayNum;

        if(this.props.users.length % this.props.pageDisplayNum !== 0 && this.props.current === this.props.pageSum) {
            pageLast = (this.props.pageSum-1)*this.props.pageDisplayNum + this.props.users.length  % this.props.pageDisplayNum
        }

        return {pageStart,pageLast};
    }

    render () {
        let formElementsArray = [];

            for(let key in this.state.searchForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.searchForm[key]
                })
            }

        let userInfo =this.props.users.length ? this.props.users.slice(this.getPage().pageStart-1 , this.getPage().pageLast).map(el => {
            return (
                <UserInfo key={el._id} info={el}/>
            )
        }) : <div className={classes.NoResults}>No users found</div>;

        let showing = this.props.users.length ? 
                    <p>Showing {this.getPage().pageStart} - {this.getPage().pageLast} of {this.props.users.length}</p> : null;

        const style = classes.Button;
        let prevStyle = classes.Button;
        let nextStyle = classes.Button;

        if(this.props.current === 1 ) {
            prevStyle = [classes.Disable,style].join(" ");
        }

        if(this.props.current === this.props.pageSum ) {
            nextStyle = [classes.Disable,style].join(" ");
        }

        if(!this.props.users.length) {
            prevStyle = classes.Delete;
            nextStyle = classes.Delete;
        }

        let pagination = (
            <ReactPaginate 
            pageCount={this.props.pageSum}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={this.onCurrentPageChangeHandler}
            containerClassName= {classes.PageContainer}
             pageClassName={classes.Page}
             pageLinkClassName={classes.PageLink}
             activeLinkClassName = {classes.PageLinkActive}
             previousClassName={classes.Page}
             nextClassName={classes.Page}
             previousLinkClassName={prevStyle}
             nextLinkClassName={nextStyle}
             breakLabel='...'
             breakClassName={classes.Page}
             breakLinkClassName={classes.PageLink}
             forcePage={this.props.current-1}
             nextLabel={this.props.users.length ? "Next" : ""}
             previousLabel={this.props.users.length ? "Previous" : ""}
            />
        );

        if(this.props.loading) {
            userInfo = <Spinner/>
            pagination= null;
            showing= null;
        }
        return (
            <div className={classes.SearchResult}>
                {showing}
                {pagination}
                <div className={classes.container}>
                    <form className={classes.Form} onSubmit={this.inputSubmitHandler}>
                        <div style={{textAlign: "center"}}><h3>Search Form</h3></div>
                        {formElementsArray.map(formElement => (
                                        <InputSearch 
                                            key={formElement.id} 
                                            id={formElement.id}
                                            elementType={formElement.config.elementType} 
                                            elementConfig={formElement.config.elementConfig}
                                            value={formElement.config.value} 
                                            changed={(event) => this.inputChangeHandler(event,formElement.id)}
                                            label={formElement.config.label}
                                            />
                                    ))}
                        <div style={{display: "flex",justifyContent:"center",marginTop:"40px"}}><Button type="blue">Search</Button></div>
                    </form>
                    <div className={classes.UserPanel} >
                        {userInfo}
                    </div>
                </div>
                {pagination}     
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
        loading: state.user.loading,
        pageSum: state.user.pageSum,
        pageDisplayNum: state.user.pageDisplayNum,
        current: state.user.current
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onFetchUsers : (formObj,pageDisplayNum) => dispatch(actions.fetchUsers(formObj,pageDisplayNum)),
        onUpdateInput: (name,value) => dispatch(actions.updateInput(name,value)),
        onUpdateSelectedUser: (user) => dispatch(actions.updateSelectedUser(user)),
        onUpdatePage: (page) => dispatch(actions.updatePage(page)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResult);

  