import {Navbar} from "@/app/(protected)/_components/navbar/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return(
            <div className="">
                <Navbar />
                {children}
            </div>
    )
}

export default ProtectedLayout;