import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, gridOptions } from './grid-settings';
import { columnDefs } from './default-column-defs';
import { rowData } from './rows-data';
import { getDetailCellRendererParams } from './details-cell-renderer-params';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const sizes = [40, 30, 20];

export const DataGrid = () => {
  const gridRef = useRef();
  const heightRef = useRef();
  const [rowHeight, setRowHeight] = useState(40);

  heightRef.current = rowHeight;

  const toggleFirstRow = () => {
    const row = gridRef.current.api.getDisplayedRowAtIndex(0);

    row.setExpanded(!row.expanded);
  };

  const handleSetNextSize = () => {
    const index = sizes.findIndex((size) => size === rowHeight);
  
    setRowHeight(sizes[(index + 1) % sizes.length]);
  };

  const getRowHeight = useCallback((params) => {
    // const isDetailRow = params.node.detail;

    // if (!isDetailRow) { return rowHeight; }

    // const detailPanelHeight = params.data.children.length * rowHeight;

    // return detailPanelHeight;
    if (params.node && params.node.detail) {
      var offset = 80;
      var allDetailRowHeight =
        rowData.length *
        rowHeight;
      var gridSizes = params.api.getSizesForCurrentTheme();
      return (
        allDetailRowHeight +
        ((gridSizes && gridSizes.headerHeight) || 0) +
        offset
      );
    }

    return rowHeight;
  }, [ rowHeight ]);

  const detailCellRendererParams = useMemo(
    () => getDetailCellRendererParams(heightRef),
    []
  );

  useEffect(() => {
    gridRef.current?.api?.resetRowHeights();
    gridRef.current?.api?.detailGridInfoMap?.detail_8?.api?.setGetRowHeight(getRowHeight)
    gridRef.current?.api?.detailGridInfoMap?.detail_8?.api?.resetRowHeights()
    // console.log(gridRef.current?.api);
    // console.log(gridRef.current?.api?.detailGridInfoMap?.detail_8?.api);
  }, [ rowHeight ]);

  // const className = `ag-theme-alpine data-grid--${ rowHeight }`
  const className = `ag-theme-alpine`

  return (
    <>
      <div style={{ height: 470 }}>
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
              // detailRowAutoHeight={ true }
              detailRowHeight={ rowHeight }
              detailCellRendererParams={ detailCellRendererParams }
              className={ className }
              getRowHeight={ getRowHeight }
              // rowHeight={ rowHeight }
              rowSelection="multiple"
              columnDefs={ columnDefs }
              defaultColDef={ defaultColDef }
              rowData={ rowData }
              popupParent={ document.body } />
        </div>
      </div>
    </>
  );
};
