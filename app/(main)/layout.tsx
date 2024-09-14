import { Navbar } from "./_components/navbar/navbar";
import { SideBar } from "./_components/sidebar/sidebar";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <Navbar />
            <div className="flex flex-row py-4 w-full">
                <div className="basis-1/5"> 
                    <SideBar />
                </div>
                <div className="w-full px-5">
                    {children}
                </div>
            </div>
        </div>  
    )
}

export default MainLayout;