import React, { useState } from 'react';
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { URLPathsProvider } from './components/URLPathsContext';
import { RobotsRulesProvider } from './components/RobotsRulesContext';
import HorizontalStepper from './components/HorizontalStepper';

import { baselightTheme } from "./theme/DefaultColors";

function App() {
  const theme = baselightTheme;

  return (
    // <div className="App">
    //   <TabController currentPage={currentPage} />

    //   <PathsProvider>
    //     <div>
    //       {currentPage === 1 && <AddressTab />}
    //       {currentPage === 2 && <PathsTab />}
    //       {currentPage === 3 && <SelectionTab />}
    //       {currentPage > 3 && `Content for Page ${currentPage}`}
    //     </div>
    //   </PathsProvider>

    //   {currentPage < 5 && <NextButton onClick={handleNextClick} />}
    // </div>

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <div className="App">
        <URLPathsProvider>
          <RobotsRulesProvider>
            <HorizontalStepper />
          </RobotsRulesProvider>
        </URLPathsProvider>
      </div>

    </ThemeProvider>
  );
}

export default App;
