import Image from "next/image";

export const NavLogo = () => {
    return(
        <div className="flex space-x-2">
            <div className="">
                <Image src={"/logo.png"} alt={"logo"} width={32} height={32}/>
            </div>
            <div className="font-bold text-lg text-slate-600">
                iTaskDev
            </div>
        </div>
    )
}