import React from 'react';
import Navbar from './components/Navbar';
import Title from './components/Title';

import './notfound.css';

export default class NotFoundPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <>
        <div className='w-screen'>
          <Navbar />
          <Title />
        </div>
      </>
    );
  }
}
