import { useState, useEffect } from 'react';

const useWifiStatus = () => {
  // For now, we will always return a "correct" status
  // to disable the network check.
  const [networkInfo, setNetworkInfo] = useState({
    isIpCorrect: true, // Always true
    currentIp: 'N/A', // Not applicable
  });

  // The hook doesn't need to do anything, but we keep the structure.
  useEffect(() => {
    // No network checks needed for now.
  }, []);

  return networkInfo;
};

export default useWifiStatus;
