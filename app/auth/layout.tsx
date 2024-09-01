const AuthLayout = ({ children }: {children: React.ReactNode}) => {
    return(
        <div className="h-full bg-gray-100">
            {children}
        </div>
    )
}

export default AuthLayout;