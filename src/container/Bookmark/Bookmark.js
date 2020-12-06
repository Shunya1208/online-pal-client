import React, { Component } from "react";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import UserSmallInfo from "../UserSmallInfo/UserSmallInfo";
import classes from "./Bookmark.module.css";
import Spinner from "../../component/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import H3 from "../../component/Text/H3/H3"

class Bookmark extends Component {
    
    componentDidMount() {
        this.props.onGetBookmark(this.props.user._id);
    }

    deleteBookmarkHandler = (event,id) => {
      
        this.props.onDeleteBookmark(id, this.props.user._id);
    }

    selectUserHandler = (event,obj) => {
        this.props.onUpdateSelectedUser(obj);
    }

    render () {
        let userInfo = this.props.bookmark.map(el => {
            return <UserSmallInfo key={el._id} info={el} type="bookmark" delete={(event,id) => this.deleteBookmarkHandler(event,id)} select={(event,obj) => this.selectUserHandler(event,obj)}/>
        })

        if(this.props.loading) {
            userInfo = <div className={classes.Spinner}><Spinner/></div>
        }

        return (
            <Aux>
                <H3>Bookmark</H3>
                <div className={classes.Bookmark}>
                    {userInfo}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        bookmark: state.auth.bookmark,
        loading: state.auth.loading
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onGetBookmark : (id) => dispatch(actions.getBookmark(id)),
        onDeleteBookmark : (id,myId) => dispatch(actions.deleteBookmark(id,myId)),
        onUpdateSelectedUser: (obj) => dispatch(actions.updateSelectedUser(obj))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bookmark)




