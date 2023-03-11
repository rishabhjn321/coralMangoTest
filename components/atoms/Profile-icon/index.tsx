import React from 'react';
import Image from '../../../node_modules/next/image';
import accountLogo from '../../../public/images/account_logo.png';

export const ProfileIcon = (props) => {
  return (
    <div>
    <div className='flex rounded-full overflow-hidden ring-1 ring-gray-300'><Image src={accountLogo} alt="profile image" onChange={props}  /></div>
    </div>
  );
};
