import Image from 'next/image';
import React from 'react';
import loginimage from '../../../public/images/login-image.jpg';
import tenant from '../../../public/images/tenant-logo.png';

function BasicPageLayout(props) {
  return (

    <div className="lg:flex w-screen h-screen overflow-hidden bg-neutral-200 ">
      <div className="flex lg:w-1/2 h-full md:w-full">
        <Image className="" src={loginimage} alt="Login Image" />
      </div>
      <div
        className={`lg:w-1/2 flex sm:justify-center sm:items-center sm:h-0 sm:w-0 sm:top-1/2 sm:left-1/2 sm:absolute
        `}
      >
        <div className="flex  w-96 flex-col bg-white  h-auto justify-center items-center  border-red-800 ">

          <div className="flex justify-end w-10 h-10 mt-4">
            <Image className="" src={tenant} alt="Tenant Image" />
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
export default BasicPageLayout;

