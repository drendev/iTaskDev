import {LoginForm} from "@/components/auth/login-form";
import {Suspense} from "react";
import {Navbar} from "@/app/(protected)/_components/navbar";



const LoginPage = () => {
    return(
        <div>
            <Suspense>
                <Navbar />
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default LoginPage;