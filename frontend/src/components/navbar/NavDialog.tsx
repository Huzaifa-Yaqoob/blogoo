import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogIn from "./LogIn";
import Register from "./Register";

export default function NavDialog() {
  return (
    <Dialog>
      <DialogTrigger
        className="
       text-base bg-primary text-primary-foreground px-2 py-1 font-bold rounded-sm hover:bg-primary-hover hover:shadow-sm"
      >
        Log In
      </DialogTrigger>
      <DialogContent className="shadow-lg">
        <DialogHeader className="mt-4">
          <Tabs defaultValue="LogIn" className="">
            <TabsList className="w-full h-12">
              <TabsTrigger value="LogIn" className="w-full h-full">
                Log In
              </TabsTrigger>
              <TabsTrigger value="Register" className="w-full h-full">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="LogIn">
              <LogIn />
            </TabsContent>
            <TabsContent value="Register">
              <Register />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
