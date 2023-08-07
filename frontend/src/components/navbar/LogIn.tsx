import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import { LoginFormSchema } from "@/lib/validate";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useUserStore } from "@/lib/store";
import ErrorMessage from "../ErrorMessage";
import { logIn } from "@/api/api";
import ButtonLoading from "../ButtonLoading";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "ui/form";

export default function LogIn() {
  const [error, setError] = useState("");
  const [setUser, setIsLogIn] = useUserStore((state) => [
    state.setUser,
    state.setIsLogIn,
  ]);

  const logInMutate = useMutation(logIn, {
    onSuccess: (data: any) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLogIn(true);
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
  });

  function onSubmit(loginData: z.infer<typeof LoginFormSchema>) {
    logInMutate.mutate(loginData);
  }

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        {logInMutate.isError ? <ErrorMessage message={error} /> : <></>}
        <Button type="submit" className="w-full">
          {logInMutate.isLoading ? <ButtonLoading /> : "Log In"}
        </Button>
      </form>
    </FormProvider>
  );
}
