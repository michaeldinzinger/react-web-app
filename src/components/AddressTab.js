import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { RobotsRulesContext } from './RobotsRulesContext';
import TextField from '@mui/material/TextField';

function AddressTab() {
  const { setUrl, isValidUrl, isSuccessfulFetch } = useContext(RobotsRulesContext);

  const handleChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
  };

  return (
    <div>
      <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh'
        }}>
        <TextField
          id="url-input"
          label="Input the address of your web server's root directory"
          defaultValue=""
          variant="standard"
          onChange={handleChange}
          style={{width: '100%', maxWidth: 460}}
        />
      </div>

      {isValidUrl & !isSuccessfulFetch ?
        <div>
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span style={{ marginLeft: '8px' }} title="Maybe there are too many redirects or the robots.txt file is hosted in another domain.">
            robots.txt file not found
          </span>
        </div>
      : <div/> }

      {isValidUrl & isSuccessfulFetch ?
        <div>
          <FontAwesomeIcon icon={faCheck} />
          <span style={{ marginLeft: '8px' }}>
            robots.txt file found
          </span>
        </div>
      : <div/> }

    </div>
  );
}

export default AddressTab;
