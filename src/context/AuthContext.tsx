import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the value provided by the context
type AppContextValue = {
  message: string; // Example property
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
  let manuallyLogged

let token

  manuallyLogged  = window.localStorage.getItem('data');
  manuallyLogged = JSON.parse(manuallyLogged)
  token  = window.localStorage.getItem('token');
  
if(!manuallyLogged){
  manuallyLogged = window.localStorage.getItem('user');
  manuallyLogged = JSON.parse(manuallyLogged)
  token  = window.localStorage.getItem('token');
}


  return (
    <AppContext.Provider value={{manuallyLogged,token}}>
      {children}
    </AppContext.Provider>
  );
}
