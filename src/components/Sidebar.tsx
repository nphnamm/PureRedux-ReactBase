import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <h2 className="text-xl font-bold p-4">Sidebar</h2>
      <ul className="p-4">
        <li className="py-2">Item 1</li>
        <li className="py-2">Item 2</li>
        <li className="py-2">Item 3</li>
      </ul>
    </div>
  );
};

export default Sidebar; 