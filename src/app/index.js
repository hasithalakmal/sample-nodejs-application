import React, {
    Component
} from 'react';

import PropTypes from 'prop-types';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: ""
        };
    }

    callAPI() {
        fetch("/items")
            .then(res => res.text())
            .then(res => {
                 var obj = JSON.parse(res);
                this.setState({
                    user: obj
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

        return ( <
            div >
            <
            h1 > hello world {
                isMobile ? 'mobile' : 'desktop'
            } < /h1> <
            p > {
                this.state.user.name
            } < /p> < /
            div >
        );
    }
}



App.propTypes = {
    isMobile: PropTypes.bool.isRequired
};