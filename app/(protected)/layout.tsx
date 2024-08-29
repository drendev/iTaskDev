interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return(
            <div className="antialiased bg-[#EAEEFE]">
                {children}
            </div>
    )
}

export default ProtectedLayout;