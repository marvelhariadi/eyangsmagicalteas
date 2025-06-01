// import React, { createContext, useState, useContext } from 'react';

// // Create the context
// const SearchContext = createContext();

// // Create a provider component
// export const SearchProvider = ({ children }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showSearch, setShowSearch] = useState(false);

//   // Values to be provided to consumers
//   const value = {
//     searchTerm,
//     setSearchTerm,
//     showSearch,
//     setShowSearch
//   };

//   return (
//     <SearchContext.Provider value={value}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// // Custom hook to use the search context
// export const useSearch = () => {
//   const context = useContext(SearchContext);
//   if (context === undefined) {
//     throw new Error('useSearch must be used within a SearchProvider');
//   }
//   return context;
// };
