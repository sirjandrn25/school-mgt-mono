"use client";
import { DictionaryType } from "core";
import { useRouter } from "next/navigation";
import { FormBuilderInterface, formBuilderSubmitType } from "ui";
import FormBuilder from "ui/generics/formBuilder/formBuilder";
import Toast from "ui/utils/toast.utils";
import { useAuthContext } from "../../../context/auth.context";
import ApiService from "../../../utils/api.service.utils";
import { AuthStorageUtils } from "../../../utils/storage.utils";

const Login = () => {
    const { setIsLoggedIn } = useAuthContext();
    const router = useRouter();
    const handleLogin: formBuilderSubmitType = async (
        values: DictionaryType,
        { setError }
    ) => {
        const { success, response } = await ApiService.postRequest(
            "auth/login",
            values
        );
        if (success) {
            AuthStorageUtils.setInfo(response);
            setIsLoggedIn(true);
            return router.push("/dashboard");
        }
        if (response?.message)
            return Toast.error({
                message: response.message,
            });
        console.log(response);
        setError(response);
    };

    const form_builder_props: FormBuilderInterface = {
        fields: [
            {
                name: "email",
                label: "Email",
                required: true,
                type: "email",
            },
            {
                name: "password",
                label: "Password",
                required: true,
                type: "password",
            },
        ],
        onSubmit: handleLogin,
    };

    return (
        <div className="flex items-center justify-center flex-1 h-screen">
            <FormBuilder
                className="shadow  p-4 border rounded w-[400px]"
                {...form_builder_props}
            />
            {/* <div className="flex flex-col shadow gap-4 p-4 border rounded w-[400px]">
                <InputField
                    label="Email"
                    placeholder="Enter email "
                    type="email"
                    value={data?.email}
                    onChange={(value) => handleChange("email", value)}
                />
                <InputField
                    label="Password"
                    placeholder="Enter password "
                    type="password"
                    value={data?.password}
                    onChange={(value) => handleChange("password", value)}
                />
                <Button onClick={handleLogin} progress appearance="neutral">
                    Login
                </Button>
            </div> */}
        </div>
    );
};

export default Login;
