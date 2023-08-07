import { useState } from "react";
import { useForm, FormProvider, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import { RegisterFormSchema } from "@/lib/validate";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import ButtonLoading from "../ButtonLoading";
import ErrorMessage from "../ErrorMessage";
import { register } from "@/api/api";
import { useUserStore } from "@/lib/store";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "ui/form";

export default function Register() {
  const [err, setErr] = useState("");
  const [setUser, setIsLogIn] = useUserStore((state) => [
    state.setUser,
    state.setIsLogIn,
  ]);
  const registrationMutate = useMutation(register, {
    onSuccess: (data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLogIn(true);
    },
    onError: (error: any) => {
      setErr(error.response.data.message);
    },
  });

  function onSubmit(registerData: z.infer<typeof RegisterFormSchema>) {
    registrationMutate.mutate(registerData);
  }

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="your name" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        {registrationMutate.isError ? <ErrorMessage message={err} /> : <></>}
        <Button type="submit" className="w-full text-primary-foreground">
          {registrationMutate.isLoading ? <ButtonLoading /> : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
}
