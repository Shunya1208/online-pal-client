import React,{ Component } from "react";
import classes from "./LanguageFlag.module.css";
import { Link } from "react-router-dom"

class LanguageFlag extends Component {
    state = {
        url: null
    }

    componentDidMount() {
        import(`../../assets/images/languages/${this.props.photo}`).then(image =>  {this.setState({url: image.default})})
    }


    render() {

        return (
            <Link className={classes.LanguageFlag} to="/search" onClick={(event) => this.props.click(event,this.props.name)}>
                <img src={this.state.url} alt={this.props.name}/>
                <div>{this.props.name}</div>
            </Link>
        )
    }
};

export default LanguageFlag;