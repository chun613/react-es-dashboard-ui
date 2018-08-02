import React, { Component } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';

const tableHeadCellStyle = {
    color: "#fff",
    backgroundColor: "#000"
}

const tableContainerStyle = {
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    borderRadius: "4px",
    width: "1500px",
    margin: "10px 0"
}

const toolbarStyle = {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1.3125rem",
    fontWeight: "500",
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    lineHeight: "1.16667em"
};

class IndiceTableHead extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TableHead>
                <TableRow>
                    {this.props.keys.map(k => {
                        return (
                            <TableCell key={k} style={tableHeadCellStyle}>{k}</TableCell>
                        )
                    })}
                </TableRow>
            </TableHead>
        )
    }
}

class IndiceTableBody extends React.Component {
    onClick(event, indexName) {
        this.props.cb(indexName);
    }
    render() {
        return (
            <TableBody>
                {this.props.data.map(d => {
                    return (
                        <TableRow 
                        hover
                        onClick={event => this.onClick(event, d.index)}>
                            {this.props.keys.map(k => {
                                return (
                                    <TableCell key={d[k]['uuid']}>{d[k]}</TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        )
    }
}

class TableSection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={tableContainerStyle}>
                <Toolbar style={toolbarStyle}>{this.props.title}</Toolbar>
                <Table style={{ width: '100%' }}>
                    <IndiceTableHead keys={this.props.keys} />
                    <IndiceTableBody data={this.props.data} keys={this.props.keys} cb={this.props.cb} />
                </Table>
            </div>
        )
    }
}

export default TableSection;