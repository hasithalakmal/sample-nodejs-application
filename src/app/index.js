import React, {
    Component
} from 'react';

import PropTypes from 'prop-types';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            accounts: ""
        };
    }

    callAPI() {
        fetch("/accounts")
            .then(res => res.text())
            .then(res => {
                 var obj = JSON.parse(res);
                 console.log(obj);
                this.setState({
                    accounts: obj
                });
            })
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        const {
            isMobile
        } = this.props;

        return (
            <div >
                <h1 > hello world {isMobile ? 'mobile' : 'desktop'} </h1>
                <p > {(this.state.accounts) ?this.state.accounts.accounts[0].accountName :"dsds"} </p>
                <p>I'm Hasitha</p>
            </div >
        );
    }
}



App.propTypes = {
    isMobile: PropTypes.bool.isRequired
};