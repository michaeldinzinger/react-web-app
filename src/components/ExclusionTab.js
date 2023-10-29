import React, { useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { URLPathsContext } from './URLPathsContext';
import { Stack } from '@mui/material';
import { CustomizedIncludedPathInputBase, CustomizedExcludedPathInputBase } from './CustomizedInputBase';
import { RobotsRulesContext } from './RobotsRulesContext';

function ExclusionTab() {
  const { rules } = useContext(RobotsRulesContext);
  const { urlPaths, setUrlPaths, considered } = useContext(URLPathsContext);
  const [tooltipOpen, setTooltipOpen] = React.useState({});

  // const handleTooltipClose = (excludedPath) => {
  //   console.log(tooltipOpen);
  //   setTooltipOpen({[excludedPath]: false});
  // };

  // const handleTooltipOpen = (excludedPath) => {
  //   console.log(tooltipOpen);
  //   setTooltipOpen({[excludedPath]: true});
  // };

  // const handleInputChange = (e) => {
  //   const newPath = decodeURIComponent(e.target.value.toLowerCase());
  //   setInputPath(newPath);
  // };

  // const handleAddPath = () => {
  //   // Regex for path validation as per RFC 9309 (generic format, may need refinement)
  //   const pathRegex = /^(\/[\w-]+)*\/?$/;

  //   if (!inputPath) {
  //     setTooltip('Empty input');
  //     setTimeout(() => setTooltip(''), 2000);
  //     return;
  //   }

  //   if (!pathRegex.test(inputPath)) {
  //     setTooltip('The paths have to be formatted in the Regex format specified in IETF RFC 9309');
  //     setTimeout(() => setTooltip(''), 2000);
  //     return;
  //   }

  //   setPaths([...paths, inputPath]);
  //   setInputPath('');
  //   setTooltip('');  // Clear any tooltips
  // };

  const onChange = () => {
    alert("onChange");
  };

  const handleDeleteExcludedPath = (excludedPath) => {
    const newExcludedPaths = [...urlPaths["excluded"]];
    const index = urlPaths["excluded"].indexOf(excludedPath);
    newExcludedPaths.splice(index, 1);
    setUrlPaths({ included: urlPaths["included"], excluded: newExcludedPaths });
  };

  // const handleExcludedInputChange = (e) => {
  //   const newPath = decodeURIComponent(e.target.value.toLowerCase());
  //   setInputExcludedPath(newPath);
  // };

  // const handleAddExcludedPath = () => {
  //   // Similar logic as before, but now we check if the path is a subpath of one from the first list
  //   if (!inputExcludedPath) {
  //     setTooltip('Empty input');
  //     setTimeout(() => setTooltip(''), 2000);
  //     return;
  //   }

  //   if (!paths.some(p => inputExcludedPath.startsWith(p))) {
  //     setTooltip('This path is not considered.');
  //     setTimeout(() => setTooltip(''), 2000);
  //     return;
  //   }

  //   setExcludedPaths([...excludedPaths, inputExcludedPath]);
  //   setInputExcludedPath('');
  //   setTooltip('');  // Clear any tooltips
  // };

  const handleImportAllowRules = () => {
    const newExcludedPaths = [...urlPaths["excluded"]];
    for (let i = 0; i < rules["allow"].length; i++) {
      if (!newExcludedPaths.includes(rules["allow"][i])) {
        newExcludedPaths.push(rules["allow"][i])
      }
    }

    setUrlPaths({ included: urlPaths["included"], excluded: newExcludedPaths });
  };

  return (
    <div>
      <h3>Excluded from opt-out</h3>
      <List onChange={onChange} sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
        {urlPaths["excluded"].map(excludedPath => (
          <ListItem key={excludedPath} secondaryAction={
            <Stack spacing={2} direction="row">
              {/* <ClickAwayListener onClickAway={() => handleTooltipClose(excludedPath)}>
                <div>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => handleTooltipClose(excludedPath)}
                    open={tooltipOpen[excludedPath]}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="This path is not considered."
                    arrow
                  >
                    <IconButton aria-label="warning" onClick={() => handleTooltipOpen(excludedPath)}>
                      <WarningIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </ClickAwayListener> */}
              {
                considered[excludedPath] ?
                <div /> :
                <Tooltip disableFocusListener disableTouchListener title="This path is not considered" arrow>
                  <IconButton aria-label="warning">
                    <WarningIcon />
                  </IconButton>
                </Tooltip>
              }
              
              <IconButton aria-label="delete" onClick={() => handleDeleteExcludedPath(excludedPath)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          }>
            <ListItemText primary={excludedPath} />
          </ListItem>
        ))}
      </List>
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" value={inputExcludedPath} onChange={handleExcludedInputChange} />
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginLeft: '8px', cursor: 'pointer' }}
          onClick={handleAddExcludedPath}
          title={tooltip}
        />
      </div> */}
      <CustomizedExcludedPathInputBase />

      {rules["allow"].length > 0 ?
        <Button variant="contained" onClick={handleImportAllowRules}>
          Import ALLOW rules from robots.txt
        </Button>
      : <div/> }

      {urlPaths["included"].length === 0 & urlPaths["excluded"].length === 0 ?
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <FontAwesomeIcon icon={faCheckCircle}/>
          <span>
            The opt-out is applied to all web assets on your web server
          </span>
        </div>
      : <div/> }

    </div>
  );
}

export default ExclusionTab;
