// Content.tsx
/**
 * This file contains components, relaed to content section in landing page.
*/

import React from 'react';
import Circle from '@assets/circle.svg';

export default class Content extends React.Component<any, any> {

  public render(): JSX.Element {
    return (
      <>
        <div id='content' className='landing-container font-prompt w-full pt-32 pb-44'>
          <div className='h-auto w-full'>
            <div className='w-full text-center' >
              <span className='border-white mx-auto shadow-text text-3xl md:text-4xl lg:text-5xl text-darkPrimary font-semibold tracking-wider'  style={{borderBottom:'0.7px solid #000000'}}>เนื้อหา</span>
            </div>
          </div>
          <div className=' h-32'>
            <div  className='float-right pt-10'>
              <img src={Circle} alt="Logo"/>
            </div>
            <div className='float-right margin-circle'>
              <img src={Circle} alt="Logo" className='w-2/3  opacity-50' />
            </div>
          </div>
          <div className='md:grid md:grid-cols-2 '>
            <div className='w-full'>
              <div className='ml-auto md:mt-16'>
                  <div className='text-3xl md:text-4xl text-darkPrimary font-semibold tracking-wider w-80 mx-auto md:w-96'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>Relational Database</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Database System</p>
                    <p className='w-auto'>- Terminology</p>
                    <p className='w-auto'>- Relational Database</p>
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <div className='ml-auto md:mt-16'>
                  <div className='text-3xl md:text-4xl text-darkPrimary font-semibold tracking-wider w-80 mx-auto md:w-96'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>ER Model</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Database Entity</p>
                    <p className='w-auto'>- Database Relationship</p>
                    <p className='w-auto'>- Database Attributes</p>
                    <p className='w-auto'>- Relational Keys</p>
                    <p className='w-auto'>- ER-Diagram</p>
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <div className='ml-auto  mt-20 md:mt-16'>
                  <div className='text-3xl md:text-4xl text-darkPrimary font-semibold tracking-wider w-80 md:w-96 mx-auto'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>Database Design</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Top-down approach</p>
                    <p className='w-auto'>- Bottom-up approach</p>
                    <p className='w-auto'>- Inside-out approach</p>
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <div className='ml-auto  mt-20 md:mt-16'>
                  <div className='text-3xl md:text-4xl text-darkPrimary font-semibold tracking-wider w-80 md:w-96 mx-auto'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>Documentation</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Entity data dictionary</p>
                    <p className='w-auto'>- Relationship dictionary</p>
                    <p className='w-auto'>- Attribute data dictionary</p>
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <div className='ml-auto  mt-20 md:mt-16'>
                  <div className='text-3xl md:text-2xl text-darkPrimary font-semibold tracking-wider w-96 md:w-96 mx-auto'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>Database Design Problem</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Data redundency</p>
                    <p className='w-auto'>- Update Anomalies</p>
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <div className='ml-auto  mt-20 md:mt-16'>
                  <div className='text-3xl md:text-4xl text-darkPrimary font-semibold tracking-wider w-80 md:w-96 mx-auto'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>Dependency</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Functional Dependency</p>
                    <p className='w-auto'>- Full Functional Dependency</p>
                    <p className='w-auto'>- Transitive Dependency</p>
                  </div>
                </div>
            </div>
            <div className='w-full'>
              <div className='ml-auto  mt-20 md:mt-16'>
                  <div className='text-3xl md:text-4xl text-darkPrimary font-semibold tracking-wider w-80 md:w-96 mx-auto'>
                    <span className='bg-darkPrimary'>..</span>
                    <span className='ml-4'>Normalization</span>
                  </div>
                  <div className='mx-auto pl-10 mt-10 text-lg md:text-2xl text-darkPrimary font-semibold tracking-wider block w-80 md:w-96'>
                    <p className='w-auto'>- Introduction to Normalization</p>
                    <p className='w-auto'>- Unnormalization form</p>
                    <p className='w-auto'>- First Normalization form</p>
                    <p className='w-auto'>- Second Normalization form</p>
                    <p className='w-auto'>- Third Normalization form</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
