import React from 'react';
import MaterialTable from 'material-table';

interface Props {
    data: any
    columns: any
    addRow: Function
    updateRow: Function
    deleteRow: Function
}

export default function Table({
                                  data,
                                  columns,
                                  addRow,
                                  updateRow,
                                  deleteRow,
                              }: Props) {
    return (
        <MaterialTable
            title='Score'
            columns={columns}
            data={data}
            options={{
                search: false,
                sorting: false,
                paging: false,
                maxBodyHeight: 250,
                headerStyle: {
                    backgroundColor: 'gray',
                    color: '#FFF',
                    fontSize: 15,
                    height: '10px',
                    padding: 0,
                },
            }}
            editable={{
                isEditable: rowData => true,
                isDeletable: rowData => true,
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                addRow(newData);
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                updateRow(oldData, newData);
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                deleteRow(oldData);
                            }
                            resolve();
                        }, 1000);
                    })
            }}
        />
    );
}
