"use client";
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'

type ActiveLinkProps = LinkProps & {
  className?: string
  activeClassName: string
}

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(props.href as string);

  return (
    <Link className={classNames(className, isActive ? activeClassName : '')} {...props}>
      {children}
    </Link>
  );
}

export default ActiveLink
