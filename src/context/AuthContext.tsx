import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the type for the value provided by the context
type AppContextValue = {
  manuallyLogged: any;
  token: string;
  setRoleId: React.Dispatch<string>;
  roleId: string;
};

// Create the context with the specified type for the value
const AppContext = createContext<AppContextValue | undefined>(undefined);

// Create a custom hook for using the context
export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Define the type for the props of the AppProvider component
type AppProviderProps = {
  children: ReactNode; // ReactNode represents any valid React children
};

// Create the provider component
export function AppProvider({ children }: AppProviderProps): JSX.Element {
  // Define state or other necessary logic here
  let manuallyLogged: any = {};
  let token: string = '';

  // Retrieve data from localStorage
  const manuallyLoggedData = window.localStorage.getItem('user');
  const tokenData = window.localStorage.getItem('token');

  // Parse JSON data if it exists
  if (manuallyLoggedData) {
    manuallyLogged = JSON.parse(manuallyLoggedData);
  }
  if (tokenData) {
    token = tokenData;
  }

  const [roleId, setRoleId] = useState<string>('');

  return (
    <AppContext.Provider value={{ manuallyLogged, token, setRoleId, roleId }}>
      {children}
    </AppContext.Provider>
  );
}
