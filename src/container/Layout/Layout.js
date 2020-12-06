import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Toolbar from "../../component/Toolbar/Toolbar";
import Footer from "../../component/Footer/Footer";
import SideDrawer from "../../component/SideDrawer/SideDrawer";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    onCloseSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    onOpenSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    logoutHandler = () => {
        this.props.onLogout();
        this.props.onClearMessages();
        this.props.onClearRooms();
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    open={this.onOpenSideDrawerHandler} 
                    isAuthenticated={this.props.isAuthenticated} 
                    logout={this.logoutHandler} 
                    user={this.props.user}
                    />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    close={this.onCloseSideDrawerHandler} 
                    isAuthenticated={this.props.isAuthenticated} 
                    logout={this.logoutHandler} 
                    user={this.props.user}
                    />
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token,
        user: state.auth.user
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onLogout : () => dispatch(actions.logout()),
        onClearMessages: () => dispatch(actions.clearMessages()),
        onClearRooms: () => dispatch(actions.clearRooms()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout)




