import React from 'react';
import './drawer.css';
import Drawer from './components/Drawer';

const Index: React.FC = () => {
  return (
    <>
      <div className='relative h-full w-full'>
        <div className='app'>
          <Drawer />
        </div>
      </div>
    </>
  );
}

export default Index;
