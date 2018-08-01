import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const tableContainerStyle = {
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  borderRadius: "4px",
  width: "1500px"
}

const toolbarStyle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontSize: "1.3125rem",
  fontWeight: "500",
  fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  lineHeight: "1.16667em"
};

const tableHeadCellStyle = {
  color: "#fff",
  backgroundColor: "#000"
}

class EnhancedTableHead extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.keys.map(k => {
            return (
              <TableCell style={tableHeadCellStyle}>{k}</TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }
}

class EnhancedTableBody extends React.Component {
  render() {
    return (
      <TableBody>
        {this.props.data.map(d => {
          console.log(d)
          return (
            <TableRow
              hover>
              {this.props.keys.map(k => {
                return (
                  <TableCell>{d[k]}</TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    )
  }
}

class SimpleSelect extends React.Component {
  state = {
    env: 'dev',
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <FormControl style={{ width:'200px', margin: '20px 10px'}}>
        <InputLabel htmlFor="env">Environment</InputLabel>
        <Select
          value={this.state.env}
          onChange={this.handleChange}
          inputProps={{
            name: 'env',
            id: 'env',
          }}>
          <MenuItem value={"dev"}>dev</MenuItem>
          <MenuItem value={"devDub"}>dev-dub</MenuItem>
          <MenuItem value={"london1"}>london-1</MenuItem>
          <MenuItem value={"london2"}>london-2</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

var json = [{ "health": "yellow", "status": "open", "index": ".kibana", "uuid": "e9EXKU55SSmWTHg2dPoLHQ", "store.size": "12.4kb", "creation.date.string": "2018-07-04T04:04:58.615Z" }, { "health": "yellow", "status": "open", "index": "product_v4", "uuid": "cFm1Hy-3SBqXVk4CiNkiRA", "store.size": "198.2mb", "creation.date.string": "2018-07-09T07:51:02.080Z" }, { "health": "yellow", "status": "open", "index": "product_backup_20180712", "uuid": "2efHEeK4TEWCfOcXQNyL9g", "store.size": "290.3mb", "creation.date.string": "2018-07-12T11:04:35.014Z" }, { "health": "yellow", "status": "open", "index": "product_backup_20180717", "uuid": "2Mkge2LsT1eZ_IU150pE2g", "store.size": "22.7mb", "creation.date.string": "2018-07-17T11:40:50.506Z" }, { "health": "yellow", "status": "open", "index": "product_v6", "uuid": "1tVZx1FLQlWhtksPB4nWYg", "store.size": "335.5mb", "creation.date.string": "2018-07-27T08:22:08.307Z" }, { "health": "yellow", "status": "open", "index": "product_backup_20180716", "uuid": "t3YmAz1NSFadpmOEaD6QuA", "store.size": "39.1mb", "creation.date.string": "2018-07-16T12:16:57.907Z" }, { "health": "yellow", "status": "open", "index": "product_backup_20180715", "uuid": "QxvJU_M5SYKR3yNJ0sbz2g", "store.size": "80.5mb", "creation.date.string": "2018-07-15T10:05:51.404Z" }, { "health": "yellow", "status": "open", "index": "product_backup_20180719", "uuid": "EWtrd6p7RCWruLdXoAg0Kw", "store.size": "58.5mb", "creation.date.string": "2018-07-19T05:53:14.321Z" }, { "health": "yellow", "status": "open", "index": "product_v5", "uuid": "U5H7AgHqQt-aLnLj0ivlOQ", "store.size": "177.1mb", "creation.date.string": "2018-07-11T09:44:45.729Z" }];

class App extends Component {
  constructor() {
    super()
    this.keys = Object.keys(json[0]);
    this.data = json;
  }
  render() {
    return (
      <div className="App">
        <SimpleSelect />
        <div style={tableContainerStyle}>
          <Toolbar style={toolbarStyle}>Indices</Toolbar>
          <Table style={{ width: '100%' }}>
            <EnhancedTableHead keys={this.keys} />
            <EnhancedTableBody data={this.data} keys={this.keys} />
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
