import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  FolderIcon,
  UsersIcon,
  ViewGridIcon,
  ClockIcon,
  ClipboardCheckIcon,
  ClipboardCopyIcon,
  PresentationChartLineIcon,
  PencilAltIcon,
  LibraryIcon,
  OfficeBuildingIcon,
  UserAddIcon,
  LocationMarkerIcon,
  CogIcon,
  DesktopComputerIcon,
  LightningBoltIcon,
  MenuAlt2Icon,
  XIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline';
// import { ProfileModal } from '../../Modules/ProfileModal';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ProfileIcon } from '../../atoms/Profile-icon';
import { Text } from '../../atoms/Text';
import { AppContext } from '../../context/loginContext';
import { en } from '../../atoms/locales/en';
// import { ProfileModal } from '../../Modules/ProfileModal';

const adminNavigation = [
  { name: en.dashboardHeader, icon: ViewGridIcon, href: `/admin/dashboard` },
  { name: en.schedulesHeader, icon: CalendarIcon, href: `/admin/schedules` },
  { name: en.timeClockHeader, icon: ClockIcon, href: `/admin/time-clock` },
  { name: en.customerSheetHeader, icon: ClipboardCheckIcon, href: `/admin/customer-sheet` },
  { name: en.lumperSheetHeader, icon: ClipboardCopyIcon, href: `/admin/lumper-sheet` },
  { name: en.reportsHeader, icon: PresentationChartLineIcon, href: `/admin/reports` },
  { name: en.temporaryLumperHeader, icon: PencilAltIcon, href: `/admin/temporary-lumper` },
  { name: en.lumperRequestHeader, icon: UsersIcon, href: `/admin/lumper-request` },
  { name: en.correctionRequestHeader, icon: FolderIcon, href: `/admin/correction-request` },
  { name: en.customersHeader, icon: LibraryIcon, href: `/admin/customers` },
  { name: en.buildingsHeader, icon: OfficeBuildingIcon, href: `/admin/buildings` },
  { name: en.employeesHeader, icon: UserAddIcon, href: `/admin/employees` },
  { name: en.districtsHeader, icon: LocationMarkerIcon, href: `/admin/districts` },
  { name: en.adminOfficeHeader, icon: DesktopComputerIcon, href: `/admin/admin-office` },
  { name: en.managementHeader, icon: DesktopComputerIcon, href: `/admin/management` },
  { name: en.customRoleHeader, icon: LightningBoltIcon, href: `/admin/custom-role` },
  { name: en.settingsHeader, icon: CogIcon, href: `/admin/settings` },
];
const contactNavigation = [
  { name: en.dashboardHeader, icon: ViewGridIcon, href: `/manager/dashboard` },
  { name: en.schedulesHeader, icon: CalendarIcon, href: `/manager/schedules` },
  { name: en.whoseWorkingHeader, icon: ClockIcon, href: `/manager/whose-working` },
  { name: en.customerSheetHeader, icon: ClipboardCheckIcon, href: `/manager/customer-sheet` },
  { name: en.reportsHeader, icon: PresentationChartLineIcon, href: `/manager/reports` },
  { name: en.buildingsHeader, icon: OfficeBuildingIcon, href: `/manager/buildings` },
  { name: en.internalContactsHeader, icon: UserAddIcon, href: `/manager/internal-contacts` },
  { name: en.logideckContactsHeader, icon: ThumbUpIcon, href: `/manager/logideck-contacts` },
  { name: en.settingsHeader, icon: CogIcon, href: `/manager/settings` },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderSiderLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const route = useRouter();
  const { state } = useContext(AppContext);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    if (state.isAuthenticated) {
      if (state.role == 'admin') {
        setNavigation(adminNavigation);
      }

      if (state.role == 'manager') {
        setNavigation(contactNavigation);
      }
    
    }
  }, [state]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Text id="closeSideBar" className="sr-only" />
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <Text
                    id="logideckText"
                    className="flex-shrink-0 flex items-center h-8 w-auto px-4 text-white text-2xl"
                  />

                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            key={item.name}
                            className={classNames(
                              route.asPath === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                            )}
                          >
                            <item.icon
                              className={classNames(
                                route.asPath === item.href
                                  ? 'text-gray-300'
                                  : 'text-gray-400 group-hover:text-gray-300',
                                'mr-4 flex-shrink-0 h-6 w-6',
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <Text
              id="logideckText"
              className="flex h-16 px-4 items-center text-white text-2xl bg-gray-900"
            />
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      key={item.name}
                      className={classNames(
                        route.asPath === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          route.asPath === item.href
                            ? 'text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-300',
                          'mr-3 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Text id="openSideBar" className="sr-only" />
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex"></div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Text id="viewNotifications" className="sr-only" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-900">
                      <Text id="openUserMenu" className="sr-only" />
                      <div className="h-9 w-9">
                        <ProfileIcon />
                      </div>
                    </Menu.Button>
                  </div>
                  {/* <ProfileModal /> */}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
