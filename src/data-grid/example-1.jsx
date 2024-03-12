import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, gridOptions } from './grid-settings';
import { columnDefs } from './default-column-defs';
import { rowData } from './rows-data';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const Example1 = () => {
  const gridRef = useRef();

  const sizeMap = {
    lg: 40,
    md: 30,
    sm: 20
  };

  const [size, setSize] = useState('lg');

  const toggleFirstRow = () => {
    const row = gridRef.current.api.getDisplayedRowAtIndex(0);

    row.setExpanded(!row.expanded);
  };

  const handleSetNextSize = () => {
    const ss = Object.keys(sizeMap);
    const index = ss.findIndex((s) => s === size);
  
    setSize(ss[(index + 1) % ss.length]);
  };

  const detailCellRendererParams = useMemo(() => {
    return {
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
        defaultColDef: {
          ...defaultColDef,
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(rowData);
      },
    };
  }, []);

  const className = `ag-theme-alpine grid--${ size }`;

  return (
    <div style={{ height: '100%' }}>
      <div>
        <button onClick={ toggleFirstRow }>Toggle Row 1</button>
        <button onClick={ handleSetNextSize }>Change Size</button>
      </div>
      <AgGridReact ref={ gridRef }
          gridOptions={ gridOptions }
          enableRangeSelection
          enableFillHandle
          enableCellChangeFlash
          suppressClearOnFillReduction
          checkboxSelection
          rowDragManaged
          suppressRowClickSelection
          masterDetail={ true }
          detailRowAutoHeight={ true }
          detailCellRendererParams={ detailCellRendererParams }
          className={ className }
          rowSelection="multiple"
          columnDefs={ columnDefs }
          defaultColDef={ defaultColDef }
          rowData={ rowData }
          popupParent={ document.body } />
    </div>
  );
};
