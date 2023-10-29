import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { options } from './SelectionTable';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // {paths.map(path => (
  //   <div key={path}>
  //     {path}
  //     {options.map(tab => (
  //       <button 
  //         key={tab.id}
  //         onClick={() => handleActionClick(path, tab.id)}
  //         style={{ border: selectedAction[path] === tab.id ? '2px solid black' : 'none' }}
  //       >
  //         {/* Icon goes here */}
  //       </button>
  //     ))}
  //     <div>
  //       {excludedPaths
  //         .filter(subPath => subPath.startsWith(path))
  //         .map(subPath => (
  //           <div key={subPath}>
  //             {subPath}
  //             {options.map(tab => (
  //               <button 
  //                 key={tab.id}
  //                 onClick={() => handleActionClick(subPath, tab.id)}
  //                 style={{ border: selectedAction[subPath] === tab.id ? '2px solid black' : 'none' }}
  //               >
  //                 {/* Icon goes here */}
  //               </button>
  //             ))}
  //           </div>
  //         ))
  //       }
  //     </div>
  //   </div>
  // ))}

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {options.map(option => (
            <Tab label={option.text} {...a11yProps(option.key)} />
          ))}
        </Tabs>
      </Box>
      {options.map(option => (
        <CustomTabPanel value={value} index={option.key}>
          {option.description}
        </CustomTabPanel>
      ))}
      {/* <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
}
