import React, { useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { URLPathsContext } from './URLPathsContext';
import { isValidPath, normaliseEncoding, isExcludedPathConsidered } from './Robots';

export function CustomizedIncludedPathInputBase() {
  const { urlPaths, setUrlPaths } = useContext(URLPathsContext);
  const [input, setInput] = useState('');
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [tooltipText, setTooltipText] = React.useState('');

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const handleAdd = () => {
    var normalisedInput = normaliseEncoding(input.toLowerCase());

    if (normalisedInput == '') {
      setTooltipOpen(true);
      setTooltipText('Empty input');
      return;
    }

    if (urlPaths["included"].includes(normalisedInput)) {
      setTooltipOpen(true);
      setTooltipText('Already exists');
      return;
    }

    if (!isValidPath(normalisedInput)) {
      setTooltipOpen(true);
      setTooltipText('Invalid path');
      return;
    }

    setUrlPaths({ included: [...urlPaths["included"], normalisedInput], excluded: urlPaths["excluded"] });
    setInput('');
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        value={input}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add path"
        onChange={onChange}
      />
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={tooltipText}
            arrow
          >
            <IconButton type="button" sx={{ p: '10px' }} onClick={handleAdd} aria-label="add">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </Paper>
  );
}

export function CustomizedExcludedPathInputBase() {
  const { urlPaths, setUrlPaths } = useContext(URLPathsContext);
  const [input, setInput] = useState('');
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [tooltipText, setTooltipText] = React.useState('');

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const handleAdd = () => {
    var normalisedInput = normaliseEncoding(input.toLowerCase());

    if (normalisedInput == '') {
      setTooltipOpen(true);
      setTooltipText('Empty input');
      return;
    }

    if (urlPaths["excluded"].includes(normalisedInput)) {
      setTooltipOpen(true);
      setTooltipText('Already exists');
      return;
    }

    if (!isValidPath(normalisedInput)) {
      setTooltipOpen(true);
      setTooltipText('Invalid path');
      return;
    }

    setUrlPaths({ included: urlPaths["included"], excluded: [...urlPaths["excluded"], normalisedInput] });
    setInput('');
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        value={input}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add path"
        onChange={onChange}
      />
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={tooltipText}
            arrow
          >
            <IconButton type="button" sx={{ p: '10px' }} onClick={handleAdd} aria-label="add">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </Paper>
  );
}
