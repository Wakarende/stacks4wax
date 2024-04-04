import Image from "next/legacy/image";
import logo from "../../../public/logo.png";
export default function Logo() {
  return <Image src={logo} alt="logo" width={100} height={100} />;
}
