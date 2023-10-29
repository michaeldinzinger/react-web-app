import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { URLPathsContext } from './URLPathsContext';
import TextField from '@mui/material/TextField';

function DownloadTab() {
  const { urlPaths } = useContext(URLPathsContext);

  return (
    <div/>
  );
}

export default DownloadTab;