import router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ContentLayout } from '../../atoms/ContentLayout';
import { DashboardContext } from './DashboardContentContext';
import Loader from 'react-spinners/BarLoader';
import LoaderComponent from '../../atoms/LoaderComponent';
import { MemberListing } from './dashboardLayout';
import { twCascade } from '@mariusmarais/tailwind-cascade';
import Image from 'next/image';
import logo from '../../../public/images/account_logo.png';

export const DashboardContent = () => {
  const logoutButton = () => {
    localStorage?.removeItem('Username'), localStorage?.removeItem('password'), router?.push('/');

    toast.success('Successfully logged out');
  };

  const {
    state: { totalData, loading, totalMember },
    action: { getTotalCount },
  } = useContext(DashboardContext);

  useEffect(() => {
    getTotalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [tabStatus, setTabStatus] = useState(true);
  const [activeTab, setActiveTab] = useState('Table');

  const tabs = [{ name: 'Table' }, { name: 'Profile' }];

  const handleChange = (tab) => {
    setActiveTab(tab.name);
    if (tab.name == 'Profile') {
      setTabStatus(false);
    }
    if (tab.name == 'Table') {
      setTabStatus(true);
    }
  };

  const handleChange1 = () => {
    const a = [1, 3, 5, 2, 4];
    const arr2 = [];

    for (let i = 0; i < a.length; i += 2) {
      let newVar = 0;
      newVar = a[i];
      arr2.push(newVar);
    }
    toast.success('Check console log for result for Test 1');

    console.log(arr2);
  };
  const handleChange2 = () => {
    const a = [1, 3, 5, 2, 4];
    const arr2 = [];

    for (let i = 0; i < a.length; i++) {
      let newVar = 0;
      newVar = a[i] * a[i];
      arr2.push(newVar);
    }
    toast.success('Check console log for result for Test 2');

    console.log(arr2);
  };
  const handleChange3 = () => {
    const a = [1, 3, 5, 2, 4];
    const arr2 = [];

    for (let i = 0; i < a.length; i += 2) {
      let newVar = 0;
      newVar = a[i] * a[i];
      arr2.push(newVar);
    }

    toast.success('Check console log for result for Test 3');

    console.log(arr2);
  };

  return (
    <>
      <ContentLayout>
        <LoaderComponent loading={loading} loaderType={<Loader />}>
          <div className="flex">
            <div className="min-h-[90vh] w-5/6">
              <div className="flex bg-gray-50  ">
                <div className="hidden sm:block w-1/2 ">
                  <div className=" border-gray-200">
                    <nav className="-mb-px flex space-x-8 " aria-label="Tabs">
                      <>
                        {tabs.map((tab) => (
                          <>
                            <button
                              key={tab.name}
                              className={twCascade(
                                tab.name === activeTab
                                  ? 'border-indigo-500 text-indigo-600'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 ',

                                'whitespace-nowrap py-4 px-10 border-b-[3px] font-medium text-sm',
                              )}
                              onClick={() => handleChange(tab)}
                            >
                              {tab.name}
                            </button>
                          </>
                        ))}
                      </>
                    </nav>
                  </div>
                </div>
              </div>
              {tabStatus ? (
                <div className="p-2 mr-4">
                  <MemberListing list={totalData} totalMember={totalMember} />
                </div>
              ) : (
                <div className="p-2 mr-4">
                  {totalData?.map((data) => (
                    <>
                      <div key={data?.id}>
                        <div className="text-sm mt-6 mb-4 ">
                          <div className="bg-white shadow overflow-hidden rounded-xl sm:w-[365px]">
                            <h3 className="text-lg font-medium text-white bg-slate-700 pl-3 py-1">
                              {data?.name || '-'}
                            </h3>
                            <div className="border-t sm:pl-2 border-4 border-slate-700  rounded-b-xl  py-3">
                              <div className="mt-2 bg-white w-40 h-40 rounded-full border-4 border-slate-700 m-auto overflow-hidden ">
                                <Image
                                  src={logo}
                                  alt={'image unavailable'}
                                  priority
                                  width={160}
                                  height={160}
                                  className="object-cover"
                                />
                              </div>
                              <dl className="grid sm:gap-x-14 sm:ml-36 mt-4 gap-y-2  ">
                                <div className="sm:col-span-1">
                                  <dd className=" text-sm text-[#4b658c] font-bold">
                                    {data?.name || '-'}
                                  </dd>
                                </div>
                              </dl>
                              <dl className="grid sm:gap-x-14 sm:ml-40 gap-y-2 grid-cols-3">
                                <div className="sm:col-span-1">
                                  <dd className=" text-sm text-[#4b658c] font-bold">
                                    {data?.age || '-'}
                                  </dd>
                                </div>
                              </dl>
                              <dl className="grid sm:gap-x-14 sm:ml-36 gap-y-2 grid-cols-3">
                                <div className="sm:col-span-1">
                                  <dd className=" text-sm text-[#4b658c] font-bold">
                                    {data?.occupation || '-'}
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
              <div className="flex">
                <div>
                  <button onClick={() => handleChange1()}>Test-1</button>
                </div>
                <div className="ml-2">
                  <button onClick={() => handleChange2()}>Test-2</button>
                </div>
                <div className="ml-2">
                  <button onClick={() => handleChange3()}>Test-3</button>
                </div>
              </div>
            </div>
            <div className=" w-1/6 ml-10">
              <button onClick={() => logoutButton()}>Logout</button>
            </div>
          </div>
        </LoaderComponent>
      </ContentLayout>
    </>
  );
};
