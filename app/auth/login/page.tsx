import {LoginForm} from "@/components/auth/login-form";
import { Header } from "@/components/auth/header";
import {Suspense} from "react";

const LoginPage = () => {
    return(
        <div>
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default LoginPage;