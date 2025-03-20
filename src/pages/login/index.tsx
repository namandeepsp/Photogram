import LoginSignUpBG from "@/components/commonComponents/LoginSignUpBG";
import Spinner from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/context/userAuthContext";
import { UserLogIn } from "@/types";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ILoginProps {}

const intialValue: UserLogIn = {
  email: "",
  password: "",
};

const Login: React.FunctionComponent<ILoginProps> = () => {
  const navigate = useNavigate();
  const { googleSignIn, logIn } = useUserAuth();
  const [userLogInInfo, setUserLogInInfo] =
    React.useState<UserLogIn>(intialValue);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogInInfo({
      ...userLogInInfo,
      [e.target.name]: e.target?.value?.trim() || "",
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { email, password } = userLogInInfo;
      if (!email || !password) {
        throw new Error("Please enter valid credentials!");
      }
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log("Error while loggin in: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("Error while signing in with google: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginSignUpBG>
      <Card>
        <CardHeader className="space-y-6">
          <CardTitle className="text-2xl m-auto">Photogram</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <CardDescription>Sign In using Google</CardDescription>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={handleGoogleLogIn}
              >
                <Icons.google />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                value={userLogInInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={userLogInInfo.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-4">
            <Button className="w-full cursor-pointer" type="submit">
              {loading ? <Spinner color="#ffffff" /> : ""}
              {loading ? "Logging you in..." : "Login"}
            </Button>
            <CardTitle>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </CardTitle>
          </CardFooter>
        </form>
      </Card>
    </LoginSignUpBG>
  );
};

export default Login;
