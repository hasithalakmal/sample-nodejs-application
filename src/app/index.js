import React, {
    Component
} from 'react';
import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            accounts: "",
            dataAvailable: false
        };
    }

    callAPI() {
        fetch("/accounts")
            .then(res => res.text())
            .then(res => {
                 var obj = JSON.parse(res);
                 console.log(obj);
                this.setState({
                    accounts: obj,
                    dataAvailable: true
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
            this.state.dataAvailable ? (
            <div >
                <h1 > hello world {isMobile ? 'mobile' : 'desktop'} </h1>
                <p > {this.state.accounts.accounts[0].accountName} </p>
                <p>I'm Hasitha</p>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Account Id</TableCell>
                                <TableCell align="right">Account Name</TableCell>
                                <TableCell align="right">Owner Name</TableCell>
                                <TableCell align="right">Version Id</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.accounts.accounts.map(account => (
                                <TableRow key={account.accountId}>
                                    <TableCell component="th" scope="row">
                                        {account.accountId}
                                    </TableCell>
                                    <TableCell align="right">{account.accountName}</TableCell>
                                    <TableCell align="right">{account.ownerName}</TableCell>
                                    <TableCell align="right">{account.versionId}</TableCell>
                                    <TableCell align="right">{account.status}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
            ) : <CircularProgress />
        );
    }
}



App.propTypes = {
    isMobile: PropTypes.bool.isRequired
};