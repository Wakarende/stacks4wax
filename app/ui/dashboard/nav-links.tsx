// "use client";

// import {
//   ListBulletIcon,
//   HomeIcon,
//   MusicalNoteIcon,
// } from '@heroicons/react/24/outline';
// import { PiSquaresFourLight, PiVinylRecordLight, PiHeartStraight, PiPlaylistFill, PiVinylRecordDuotone} from "react-icons/pi";
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import clsx from 'clsx';
// // Map of links to display in the side navigation.

// const links = [
//   { name: 'Discover', href: '/dashboard', icon: PiSquaresFourLight },
//   { name: 'Browse', href: '/dashboard', icon: PiVinylRecordDuotone },
//   { name: 'Liked', href: '/dashboard/Liked', icon: PiHeartStraight },
//   {
//     name: 'Collections',
//     href: '/dashboard/collections',
//     icon: PiPlaylistFill,
//   },
//   { name: 'Vinyls', href: '/dashboard/vinyls', icon: PiVinylRecordDuotone },
// ];

// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
//               {
//                 'bg-gray-100 text-green-600': pathname === link.href,
//               },
//               'text-green'
//             )}
//           >
//             <LinkIcon className="w-6" />
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }
