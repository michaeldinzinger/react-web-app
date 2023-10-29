import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { parseRulesFromRobotsTxt } from './Robots';

// Create the context
export const RobotsRulesContext = createContext();

export const RobotsRulesProvider = ({ children }) => {
  const [rules, setRules] = useState({ allow: [], disallow: [] });
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isSuccessfulFetch, setIsSuccessfulFetch] = useState(false);


  function validateUrl(inputUrl) {
    const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?\/?$/;
    var valid = false;
    if (regex.test(inputUrl)) {
      valid = true;
    }
    return valid;
  }

  useEffect(() => {
    // Function to fetch and parse robots.txt
    const fetchRobotsTxt = async (inputUrl) => {
      var successful = false;

      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/${inputUrl}/robots.txt`, {
          responseType: 'text',
          // Headers to prevent CORS issues, security concerns.
          headers: {
            'Content-Type': 'text/plain',
            // 'Access-Control-Allow-Origin': '*',
          },
          // Other security best practices like timeout, validateStatus, etc., can be implemented based on requirements.
        });

        
        if (response.status === 200) {
          setRules(parseRulesFromRobotsTxt(response.data));
          successful = true;
        }
      } catch (error) {
        setRules({ allow: [], disallow: [] });
      }

      setIsSuccessfulFetch(successful);
    };

    var inputUrl = url.startsWith('http') ? url : `http://${url}`;
    var valid = validateUrl(inputUrl);
    setIsValidUrl(valid);
    if (valid) {
      fetchRobotsTxt(inputUrl);
    }
  }, [url]);

  return (
    <RobotsRulesContext.Provider value={{ rules, setUrl, isValidUrl, isSuccessfulFetch }}>
      {children}
    </RobotsRulesContext.Provider>
  );
};
