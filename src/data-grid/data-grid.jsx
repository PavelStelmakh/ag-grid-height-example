import React from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Example2 } from './example-2';

export const DataGrid = () => {
  return (
    <>
      <h3>Row height change example</h3>
      <div style={{ height: 1400 }}>
        <Example2 />
      </div>
    </>
  );
};
