import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import logo from '../../public/logo.png'
export default function Logo() {
  return (
   <Image src={logo} alt='logo' width={100} height={100}/>
  );
}
