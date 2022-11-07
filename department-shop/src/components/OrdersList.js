import React from "react";

import { DataGrid } from "@mui/x-data-grid";

import Button from "@mui/material/Button";

import { getAllOrderLists, orderColumns } from './functions';

const gridStyle = {
    height: 600,
    marginTop: 10,

}

class OrdersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
            page: ''
        }
    }

    async componentDidMount() {
        let ordersList = await getAllOrderLists();

        let columns = orderColumns(ordersList[0]);

        let id = 0;
        for (let p in ordersList) {
            ordersList[p].id = id;
            id += 1;
        }
        this.setState({ rows: ordersList, columns: columns, page:'/orders-list' });
        console.log(this.state.rows)
    }

    render() {
        return (
            <>
                <DataGrid style={gridStyle}
                    hideFooterPagination={true}
                    hideFooter={true}
                    rows={this.state.rows}
                    columns={this.state.columns}
                />
            </>
        );
    }
}
export default OrdersList;
