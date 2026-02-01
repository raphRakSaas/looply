import Image from "next/image";

import logo from "@/assets/png/looply-logo.png";

export function LoginBranding() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-white p-8">
      <Image
        src={logo}
        alt="Looply"
        priority
        className="h-auto w-full max-w-[280px] object-contain md:max-w-[320px]"
      />
    </div>
  );
}
