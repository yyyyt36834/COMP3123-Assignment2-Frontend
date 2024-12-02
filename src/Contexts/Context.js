import React, { useState } from 'react';

// Default session state
const defaultSessionValue = {
  isAuthenticated: false
};

// Create the context
const SessionContext = React.createContext({
  value: defaultSessionValue,
  setValue: () => {} // Placeholder function
});

// SessionProvider to manage session state
export const SessionProvider = ({ children }) => {
  const [value, setValue] = useState(defaultSessionValue);

  return (
    <SessionContext.Provider value={{ value, setValue }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
