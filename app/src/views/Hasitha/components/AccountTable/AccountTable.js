import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const AccountTable = props => {
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (


    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
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
                {users.accounts.map(account => (
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
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

AccountTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default AccountTable;
