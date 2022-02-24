import React from "react";
import Link from 'next/link'
function Logo() {
  return (
    <Link href='/' passHref='' >
      <div className="text-[1.7rem] font-bold text-light cursor-pointer">
        <span className="flex md:hidden">M.M.</span>
        <span className="hidden md:flex">Money Manager</span>

      </div>
    </Link>
  );
}

export default Logo;
