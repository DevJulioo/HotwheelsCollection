import React, { createContext, useState } from 'react';

export const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Twin Mill',
      year: 1889,
      image: require('../../assets/images/image5.png'),
    },
    {
      id: '2',
      name: 'Twin Mill',
      year: 1889,
      image: require('../../assets/images/image-removebg-preview1.png'),
    },
    {
      id: '3',
      name: 'Twin Mill',
      year: 1889,
      image: require('../../assets/images/image6.png'),
    },
    {
      id: '4',
      name: 'Twin Mill',
      year: 1889,
      image: require('../../assets/images/image9.png'),
    },
  ]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}
