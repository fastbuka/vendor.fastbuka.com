import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

interface NavLinkProps extends LinkProps {
    active?: boolean;
    children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        passHref
        className={`inline-flex items-center p-2 border text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-slate-400 text-gray-900 focus:border-slate-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'
        }`}
    >
        {children}
    </Link>
);

export default NavLink;
