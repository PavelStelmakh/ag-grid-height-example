import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { defaultColDef, gridOptions } from './grid-settings';
import { columnDefs } from './default-column-defs';
import { rowData } from './rows-data';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Example1 } from './example-1';
import { Example2 } from './example-2';

export const DataGrid = () => {
  return (
    <>
      <h3>ClassName change example</h3>
      <div style={{ height: 350 }}>
        <Example1 />
      </div>
      <h3>Row height change example</h3>
      <div style={{ height: 1400 }}>
        <Example2 />
      </div>
    </>
  );
};
