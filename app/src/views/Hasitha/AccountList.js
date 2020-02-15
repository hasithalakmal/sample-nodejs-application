import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress} from '@material-ui/core';

import { UsersToolbar, AccountTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const AccountList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <AccountTable users={users} />
      </div>
    </div>
  );
};


// const classes = useStyles();
// const [users] = useState(callAPI);
export class AccountListHasitha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '',
      dataAvailable: false
    };
  }



  callAPI() {
    console.log('hello hasitha 3');
    fetch('/accounts')
      .then(res => res.text())
      .then(res => {
        console.log(res);
        var obj = JSON.parse(res);
        console.log(obj);
        var useStyle = makeStyles(theme => ({
          root: {
            padding: theme.spacing(3)
          },
          content: {
            marginTop: theme.spacing(2)
          }
        }));
        this.setState({
          accounts: obj,
          dataAvailable: true,
          classes : useStyle
        });
      })
      .catch(err => {
        // err;
        console.log('hello hasitha 4 = '+err);
        console.log(err);
      });
  }

  componentDidMount() {
    console.log('hello hasitha 2 ');
    this.callAPI();
  }



  render() {
    console.log('hello hasitha');
    return (
      this.state.dataAvailable ? (
        <div className={ this.state.classes.root}>
          <UsersToolbar/>
          <div className={ this.state.classes.content}>
            <AccountTable users={this.state.accounts}/>
          </div>
        </div>
      )  : <CircularProgress />
    );
  }
}

export default AccountList;
