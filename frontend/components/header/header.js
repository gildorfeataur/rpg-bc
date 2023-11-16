'use client'
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

const navigation = [
  { name: "Ігри", href: "/", current: false },
  { name: "Майстри", href: "/masters", current: false },
  { name: "Правила", href: "/rules", current: false },
  { name: "Admin", href: "/admin", current: false },
];

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-800 mb-8">
      {({ open }) => (
        <>
          <div className="container mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M248 20.3L72.33 132.6 248 128.8zm16 0v108.5l175.7 3.8zm51.4 58.9c6.1 3.5 8.2 7.2 15.1 4.2 10.7.8 22.3 5.8 27.6 15.7 4.7 4.5 1.5 12.6-5.2 12.6-9.7.1-19.7-6.1-14.6-8.3 4.7-2 14.7.9 10-5.5-3.6-4.5-11-7.8-16.3-5.9-1.6 6.8-9.4 4-12-.7-2.3-5.8-9.1-8.2-15-7.9-6.1 2.7 1.6 8.8 5.3 9.9 7.9 2.2.2 7.5-4.1 5.1-4.2-2.4-15-9.6-13.5-18.3 5.8-7.39 15.8-4.62 22.7-.9zm-108.5-3.5c5.5.5 12.3 3 10.2 9.9-4.3 7-9.8 13.1-18.1 14.8-6.5 3.4-14.9 4.4-21.6 1.9-3.7-2.3-13.5-9.3-14.9-3.4-2.1 14.8.7 13.1-11.1 17.8V92.3c9.9-3.9 21.1-4.5 30.3 1.3 8 4.2 19.4 1.5 24.2-5.7 1.4-6.5-8.1-4.6-12.2-3.4-2.7-8.2 7.9-7.5 13.2-8.8zm35 69.2L55.39 149l71.21 192.9zm28.2 0l115.3 197L456.6 149zm-14.1 7.5L138.9 352.6h234.2zm133.3 21.1c13.9 8.3 21.5 26.2 22.1 43-1.3 13.6-.7 19.8-15.2 21.4-14.5 1.6-23.9-19.2-29.7-32.6-3.4-9.9-5.8-24 1.7-31.3 6.1-4.8 15-4.1 21.1-.5zm-223.7 16.1c2.1 4-.5 11.4-4.8 12.1-4.9.7-3.8-9.3-9.4-11.6-6.9-2.3-13.6 5.6-15 11.6 10.4-4 20.3 7.1 20.3 17-.4 11.7-7.9 24.8-19.7 28.1h-5.6c-12.7-.7-18.3-15.8-14.2-26.6 4.4-15.8 10.8-33.9 27.2-40.6 8.5-3.9 19 3.2 21.2 10zm213.9-8.4c-7.1-.1-4.4 10-3.3 14.5 3.5 11.5 7.3 26.6 18.9 30 6.8-1.2 4.4-12.8 3.7-16.5-4.7-10.9-7.1-23.3-19.3-28zM52 186v173.2l61.9-5.7zm408 0l-61.9 167.5 61.9 5.7zm-117.9.7l28.5 63.5-10 4.4-20-43.3c-6.1 3-13 8.9-14.6-1.4-1.3-3.9 8.5-5.1 8.1-11.9-.3-6.9 2.2-12.2 8-11.3zm-212 27.4c-2.4 5.1-4.1 10.3-2.7 15.9 1.7 8.8 13.5 6.4 15.6-.8 2.7-5 3.9-11.7-.5-15.7-4.1-3.4-8.9-2.8-12.4.6zm328.4 41.6c-.1 18.6 1.1 39.2-9.7 55.3-.9 1.2-2.2 1.9-3.7 2.5-5.8-4.1-3-11.3 1.2-15.5 1 7.3 5.5-2.9 6.6-5.6 1.3-3.2 3.6-17.7-1-10.2.7 4-6.8 13.1-9.3 8.1-5-14.4 0-30.5 7-43.5 5.7-6.2 9.9 4.4 8.9 8.9zM59.93 245.5c.59.1 1.34 1 2.48 3.6v61.1c-7.3-7-4.47-18-4.45-26.4 0-8.4 1.65-16.3-1.28-23.2-4.62-1.7-5.79-17-3.17-12.7 4.41 4.8 4.66-2.7 6.42-2.4zm178.77 7.6c8.1 4.5 13.8 14.4 10.8 23.6-2.1 15.2-27 21.1-30.4 29.7-1.2 3 25.4 1.6 30.2 1.6.5 4 1.5 10.7-3.8 11.7-14.5-1.2-29.9-.6-45.1-.6.4-11.2 7.4-21.3 17-26.8 6.9-4.9 15.4-9.3 18.1-17.9 1.8-4.5-.6-9.3-4.6-11.5-4.2-2.9-11-2.3-13.2 2.7-2 3.8-4.4 9.1-8.7 9.6-2.9.4-9 .5-7.2-4.9 1.4-5.6 3.4-11.5 8.2-15.2 8.8-6.3 19.9-6.7 28.7-2zm53.3-1.4c6.8 2.2 12 7.9 14.3 14.6 6.1 14.7 5.5 33.1-4.4 45.9-4.5 4.8-10.2 9.1-17 9.1-12.5-.1-22.4-11.1-24.8-22.8-3.1-13.4-1.8-28.7 6.9-39.8 6.8-7.6 16-10.3 25-7zm156.1 8.1c-1.6 5.9-3.3 13.4-.7 19.3 5.1-2 5.4-9.6 6.6-14.5.9-6.1-3.5-12.6-5.9-4.8zm-176.2 21.1c.6 10.5 1.7 22.8 9.7 28.2 4.9 1.8 9.7-2.2 11.1-6.7 1.9-6.3 2.3-12.9 2.4-19.4-.2-7.1-1.5-15-6.7-20.1-12.2-4.4-15.3 10.9-16.5 18zM434 266.8V328l-4.4 6.7v-42.3c-4.6 7.5-9.1 9.1-6.1-.9 6.1-7.1 4.8-17.4 10.5-24.7zM83.85 279c.8 3.6 5.12 17.8 2.04 14.8-1.97-1.3-3.62-4.9-3.41-6.1-1.55-3-2.96-6.1-4.21-9.2-2.95 4-3.96 8.3-3.14 13.4.2-1.6 1.18-2.3 3.39-.7 7.84 12.6 12.17 29.1 7.29 43.5l-2.22 1.1c-10.36-5.8-11.4-19.4-13.43-30-1.55-12.3-.79-24.7 2.3-36.7 5.2-3.8 9.16 5.4 11.39 9.9zm-7.05 20.2c-4.06 4.7-2.26 12.8-.38 18.4 1.11 5.5 6.92 10.2 6.06 1.6.69-11.1-2.33-12.7-5.68-20zm66.4 69.4L256 491.7l112.8-123.1zm-21.4.3l-53.84 4.9 64.24 41.1c-2.6-2.7-4.9-5.7-7.1-8.8-5.2-6.9-10.5-13.6-18.9-16.6-8.75-6.5-4.2-5.3 2.9-2.6-1-1.8-.7-2.6.1-2.6 2.2-.2 8.4 4.2 9.8 6.3l24.7 31.6 65.1 41.7zm268.4 0l-42.4 46.3c6.4-3.1 11.3-8.5 17-12.4 2.4-1.4 3.7-1.9 4.3-1.9 2.1 0-5.4 7.1-7.7 10.3-9.4 9.8-16 23-28.6 29.1l18.9-24.5c-2.3 1.3-6 3.2-8.2 4.1l-40.3 44 74.5-47.6c5.4-6.7 1.9-5.6-5.7-.9l-11.4 6c11.4-13.7 30.8-28.3 40-35.6 9.2-7.3 15.9-9.8 8.2-1.5l-12.6 16c10-7.6.9 3.9-4.5 5.5-.7 1-1.4 2-2.2 2.9l54.5-34.9zM236 385.8v43.4h-13.4v-30c-5-1.4-10.4 1.7-15.3-.3-3.8-2.9 1-6.8 4.5-5.9 3.3-.1 7.6.2 9.3-3.2 4.4-4.5 9.6-4.4 14.9-4zm29 .5c12.1 1.2 24.2.6 36.6.6 1.5 3 .8 7.8-3.3 7.9-7.7.3-21-1.6-25.9.6-8.2 10.5 5.7 3.8 11.4 5.2 7 1.1 15 2.9 19.1 9.2 2.1 3.1 2.7 7.3.7 10.7-5.8 6.8-17 11.5-25.3 10.9-7.3-.6-15.6-1.1-20.6-7.1-6.4-10.6 10.5-6.7 12.2-3.2 6 5.3 20.3 1.9 20.7-4.7.6-4.2-2.1-6.3-6.9-7.8-4.8-1.5-12.6 1-17.3 1.8-4.7.8-9.6.5-9-4.4.8-4.2 2.7-8.1 2.7-12.5.1-3 1.7-7 4.9-7.2zm133.5 5c-.2-.2-7 5.8-9.9 8.1l-15.8 13.1c10.6-6.5 19.3-12 25.7-21.2zm-247 14.2c2.4 0 7.5 4.6 9.4 7l26.1 31.1c-7.7-2.1-13.3-7.1-17.6-13.7-6.5-7.3-11.3-16.6-21.2-19.6-9-5-5.2-6.4 2.1-2.2-.3-1.9.2-2.6 1.2-2.6z"
                    />
                  </svg>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/avatars/profile.jpg"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
