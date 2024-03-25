import { rowData } from './rows-data';
import { columnDefs } from './default-column-defs';
import { gridOptions, defaultColDef } from './grid-settings';

export const getDetailCellRendererParams = (heightRef) => ({
  detailGridOptions: {
    gridOptions,
    enableRangeSelection: true,
    enableFillHandle: true,
    enableCellChangeFlash: true,
    suppressClearOnFillReduction: true,
    checkboxSelection: true,
    rowDragManaged: true,
    suppressRowClickSelection: true,
    className: 'ag-theme-alpine',
    rowSelection: 'multiple',
    columnDefs,
    // rowHeight,
    // getRowHeight: () => heightRef.current,
    defaultColDef: {
        ...defaultColDef,
        flex: 1,
    },
  },
  getDetailRowData: (params) => {
    params.successCallback(rowData);
  },
});
