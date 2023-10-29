import React, { useCallback, useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BasicTabs from './BasicTabs';
import { URLPathsContext } from './URLPathsContext';
import { options } from './SelectionTable';

function SelectionTab() {
  const { urlPaths, urlPathsMap } = useContext(URLPathsContext);

  var initialSelectedActions = {};
  var initialOpen = {};
  for (var i = 0; i < urlPaths["included"].length; i++) {
    initialSelectedActions[urlPaths["included"][i]] = options[0].label;
    initialOpen[urlPaths["included"][i]] = false;
  }
  const [selectedActions, setSelectedActions] = useState(initialSelectedActions);
  const [open, setOpen] = React.useState(initialOpen);

  const handleListItemButtonClick = (path) => {
    var newOpen = {};
    for (var i = 0; i < urlPaths["included"].length; i++) {
      if (path === urlPaths["included"][i]) {
        newOpen[urlPaths["included"][i]] = !open[urlPaths["included"][i]];
      } else {
        newOpen[urlPaths["included"][i]] = open[urlPaths["included"][i]];
      }
    }
    setOpen(newOpen);
  };

  const handleChange = (event, path) => {
    alert(event.target.value);
    alert(path);
    setSelectedActions(prevValues => ({...prevValues,
      [path]: event.target.value}));
  };

  return (
    <div>
      <BasicTabs />

      <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
        {urlPaths["included"].map(includedPath => (
          <div>
            {urlPathsMap[includedPath].length > 0 ?
              <div>
                <ListItemButton key={includedPath} onClick={() => handleListItemButtonClick(includedPath)}>
                  <ListItemText primary={includedPath} />
                  <ToggleButtonGroup
                    color="primary"
                    value={selectedActions[includedPath]}
                    exclusive
                    onChange={(event) => handleChange(event, includedPath)}
                  >
                    {options.map(option => (
                      <ToggleButton value={option.label}>{option.label}</ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  {open[includedPath] ? <ExpandLess /> : <ExpandMore /> }
                </ListItemButton>
                <Collapse in={open[includedPath]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {urlPathsMap[includedPath].map(excludedPath => (
                      <ListItem>
                        <ListItemText primary={excludedPath} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
              :
              <div>
                <ListItem key={includedPath}>
                  <ListItemText primary={includedPath} />
                  <ToggleButtonGroup
                    color="primary"
                    value={selectedActions[includedPath]}
                    exclusive
                    onChange={(event) => handleChange(event, includedPath)}
                  >
                    {options.map(option => (
                      <ToggleButton value={option.label}>{option.label}</ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </ListItem>
              </div>
            }
          </div>
        ))}
      </List>
    </div>
  );
}

export default SelectionTab;
