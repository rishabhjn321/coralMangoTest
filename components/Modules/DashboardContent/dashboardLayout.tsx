import React, { FC } from 'react';
import { en } from '../../atoms/locales';
import { Text } from '../../atoms/Text';
import { List } from '../../typings/employeesTypes';
import 'tippy.js/dist/tippy.css';

export interface MemberListingI {
  list?: List[];
  totalMember?: number;
}

export const MemberListing: FC<MemberListingI> = ({ list, totalMember }: MemberListingI) => {
  return (
    <>
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold text-gray-900" id="EmployeesTableHeading">
          {en.totalMember}: {totalMember}
        </h1>
      </div>
      <div className=" flex flex-col">
        <div className="px-4 py-4 pb-6">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-t">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-5 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    <Text id="name" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 text-left text-sm font-semibold text-gray-900 "
                  >
                    <Text id="age" />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 text-left text-sm font-semibold text-gray-900 "
                  >
                    <Text id="occupation" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {list?.map((data) => (
                  <tr key={data?.id}>
                    <td className="pl-3 pr-2 py-2 text-sm text-gray-500 capitalize">
                      {data?.name || 'N/A'}
                    </td>
                    <td className="pl-3 pr-2 py-2 text-sm text-gray-500 capitalize">
                      {data.age || 'N/A'}
                    </td>
                    <td className="pl-3 pr-2 py-2 text-sm text-gray-500 capitalize">
                      {data.occupation || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
