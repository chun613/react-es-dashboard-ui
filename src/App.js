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
import TableSection from './TableSection.js';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ReactJson from 'react-json-view'


class SimpleSelect extends React.Component {
  state = {
    env: 'dev',
  };
  handleChange = event => {
    this.props.cb(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <FormControl style={{ width: '200px', margin: '20px 10px' }}>
        <InputLabel htmlFor="env">Environment</InputLabel>
        <Select
          value={this.state.env}
          onChange={this.handleChange}
          inputProps={{
            name: 'env',
            id: 'env',
          }}>
          <MenuItem value={"dev"}>dev</MenuItem>
          <MenuItem value={"dev-dub"}>dev-dub</MenuItem>
          <MenuItem value={"london-2"}>london-2</MenuItem>
        </Select>
      </FormControl>
    )
  }
}

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  }
  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose}>
        <DialogTitle>
          {this.props.name}
        </DialogTitle>
        <div style={{ margin: '20px' }}>
          <ReactJson src={this.props.mapping} theme="monokai" />
        </div>
      </Dialog>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      env: "dev",
      indices: [],
      indicesKeys: [],
      templates: [],
      templatesKeys: [],
      indexName: "",
      indexMapping: {},
      dialogOpen: false
    };
  }
  componentWillMount() {
    this.fetchIndicesData();
    this.fetchTemplateData();
  }
  fetchIndicesData() {
    console.log(this.state);
    fetch(`http://test.zwoop.abc:8080/${this.state.env}/indices`)
      .then(res => res.json())
      .then(json => {
        this.setState({ indices: json })
        this.setState({ indicesKeys: Object.keys(json[0]) })
      })
  }
  fetchTemplateData(env) {
    fetch(`http://test.zwoop.abc:8080/${this.state.env}/templates`)
      .then(res => res.json())
      .then(json => {
        this.setState({ templates: json })
        this.setState({ templatesKeys: Object.keys(json[0]) })
      })
  }
  fetchIndexMapping(indexName) {
    fetch(`http://test.zwoop.abc:8080/${this.state.env}/mapping/${indexName}`)
      .then(res => res.json())
      .then(json => this.setState({ indexMapping: json }))
  }
  onIndexClick = (indexName) => {
    this.fetchIndexMapping(indexName);
    this.setState({ "indexName": indexName });
    this.setState({ dialogOpen: true });
  }
  onEnvChange = (env) => {
    this.setState({ "env": env }, () => {
      this.fetchIndicesData();
      this.fetchTemplateData();
    });
  }
  onDialogClose = () => {
    this.setState({ dialogOpen: false });
  }
  render() {
    return (
      <div className="App">
        <SimpleSelect cb={this.onEnvChange} />
        <TableSection data={this.state.indices} keys={this.state.indicesKeys} title="Indices" cb={this.onIndexClick} />
        <TableSection data={this.state.templates} keys={this.state.templatesKeys} title="Template" />
        <SimpleDialog open={this.state.dialogOpen} onClose={this.onDialogClose} mapping={this.state.indexMapping} name={this.state.indexName} />
      </div>
    );
  }
}

export default App;