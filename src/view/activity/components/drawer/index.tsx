import React from 'react';
import './drawer.css';
import Drawer from './components/Drawer';

const Index: React.FC = () => {
  return (
    <>
      <div className='relative h-3/5 w-full'>
        <div className='app'>
          <Drawer />
        </div>
      </div>
    </>
  );
}

export default Index;
