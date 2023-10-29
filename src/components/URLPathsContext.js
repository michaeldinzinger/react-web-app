import React, { useState, useEffect } from 'react';
import { isExcludedPathConsidered } from './Robots';

export const URLPathsContext = React.createContext();

export const URLPathsProvider = ({ children }) => {
  const [urlPaths, setUrlPaths] = useState({ included: [], excluded: [] });
  const [considered, setConsidered] = React.useState({});
  const [urlPathsMap, setUrlPathsMap] = React.useState({});

  function computeConsidered() {
    console.log("evaluateConsidered");
    var considered = {};
    for (var i = 0; i < urlPaths["excluded"].length; i++) {
      considered[urlPaths["excluded"][i]] = isExcludedPathConsidered(urlPaths["excluded"][i], urlPaths["included"]);
    }
    return considered;
  }

  function computeUrlPathsMap() {
    console.log("evaluatePathsMap");
    var urlPathsMap = {};
    for (var i = 0; i < urlPaths["included"].length; i++) {
      var excludedUrlPathsList = [];
      for (var j = 0; j < urlPaths["excluded"].length; j++) {
        if (isExcludedPathConsidered(urlPaths["excluded"][j], [urlPaths["included"][i]])) {
          excludedUrlPathsList.push(urlPaths["excluded"][j]);
        }
      }
      urlPathsMap[urlPaths["included"][i]] = excludedUrlPathsList;
    }
    console.log(urlPathsMap);
    return urlPathsMap;
  }

  useEffect(() => {
    console.log(urlPaths);
    setConsidered(computeConsidered());
    setUrlPathsMap(computeUrlPathsMap());
  }, [JSON.stringify(urlPaths)]);

  return (
    <URLPathsContext.Provider value={{ urlPaths, setUrlPaths, considered, urlPathsMap }}>
      {children}
    </URLPathsContext.Provider>
  );
};

export default URLPathsContext;

