'use client'


import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service";
import {toast} from "sonner";
import {DASHBOARDS_PAGES} from "../../../config/pages-url.config";
import {Field} from "@/components/ui/fields/Fields";
import {Heading} from "@/components/ui/heading/heading";
import {AuthTypes} from "@/types/auth.types";
import {Button} from '../../components/ui/buttons'
const Auth = () => {
    const {register, handleSubmit, reset} = useForm<AuthTypes>({
        mode: "onChange"
    })
    const [isLoginForm, setIsLoginForm] = useState(false)
    const {push} = useRouter()
    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: AuthTypes) => authService.main(isLoginForm ? 'login' : 'register', data),
        onSuccess() {
            toast.success("Successfully login!")
            reset()
            push(DASHBOARDS_PAGES.HOME)
        }
    })


    const onSubmit: SubmitHandler<AuthTypes> = data => {
        mutate(data)
    }


//@ts-ignore
    return (
        <div className='flex min-h-screen'>
            <form
                className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout'
                onSubmit={handleSubmit(onSubmit)}
            >

                <Heading title='Auth'/>
                <Field
                    id='email'
                    label='Email:'
                    placeholder='Enter email:'
                    type='email'
                    extra='mb-4'
                    {...register('email', {required: 'Email is required!'})}
                />

                <Field
                    id='password'
                    label='password:'
                    placeholder='Enter password:'
                    type='password'
                    extra='mb-4'
                    {...register('password', {required: 'password is required!'})}
                />


                <div className='flex items-center gap-5 justify-center'>

                    <Button onClick={() => setIsLoginForm(true)}>Login</Button>
                    <Button onClick={() => setIsLoginForm(false)}>Register</Button>


                </div>

            </form>
        </div>
    );
};

export default Auth;