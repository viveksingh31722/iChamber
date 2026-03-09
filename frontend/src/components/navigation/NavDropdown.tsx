import React from 'react';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { clsx } from 'clsx';

interface NavDropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

const NavDropdown = ({ label, items }: NavDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-primary hover:text-secondary transition-colors duration-200">
          {label}
          <HiOutlineChevronDown className="h-4 w-4" aria-hidden="true" />
        </MenuButton>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
          <div className="py-1">
            {items.map((item) => (
              <MenuItem key={item.href}>
                {({ focus }) => (
                  <Link
                    href={item.href}
                    className={clsx(
                      focus ? 'bg-muted text-secondary' : 'text-primary',
                      'block px-4 py-2 text-sm transition-colors duration-200'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default NavDropdown;
