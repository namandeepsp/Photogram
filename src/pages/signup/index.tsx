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
import { UserSignIn } from "@/types";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ISignupProps {}

const intialValue: UserSignIn = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const navigate = useNavigate();
  const { googleSignIn, signUp } = useUserAuth();
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(intialValue);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target?.value?.trim() || "",
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password, confirmPassword } = userInfo;
      if (!email || !password) {
        throw new Error("Please enter valid credentials!");
      }
      if (password !== confirmPassword) {
        throw new Error("Password and confirm password do not match");
      }
      setLoading(true);
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log("Error while signing up: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-6 mb-4">
            <CardTitle className="text-2xl m-auto">Photogram</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={handleGoogleSignIn}
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
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={userInfo.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-4">
            <Button className="w-full cursor-pointer" type="submit">
              {loading ? <Spinner color="#ffffff" /> : ""}
              {loading ? "Signing you in..." : "Create account"}
            </Button>
            <CardTitle>
              Already have an account? <Link to="/login">Login</Link>
            </CardTitle>
          </CardFooter>
        </form>
      </Card>
    </LoginSignUpBG>
  );
};

export default Signup;
