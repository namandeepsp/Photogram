import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import image4 from "@/assets/images/image4.jpg";
import * as React from "react";

interface ILoginSignUpBGProps {
  children: React.ReactNode;
}

const LoginSignUpBG: React.FunctionComponent<ILoginSignUpBGProps> = ({
  children,
}) => {
  return (
    <div className="bg-slate-800 w-full h-screen">
      <div className="container mx-auto p-6 h-full flex">
        <div className="flex justify-center items-center w-full">
          <div className="p-6 w-2/3 hidden lg:block">
            <div className="grid grid-cols-2 gap-2">
              <img
                alt="People image"
                className=" w-2/3 h-auto aspect-video rounded-3xl place-self-end"
                src={image2}
              />
              <img
                alt="People image"
                className=" w-2/4 h-auto aspect-auto rounded-3xl"
                src={image1}
              />
              <img
                alt="People image"
                className=" w-2/4 h-auto aspect-auto rounded-3xl place-self-end"
                src={image4}
              />
              <img
                alt="People image"
                className=" w-2/3 h-auto aspect-video rounded-3xl"
                src={image3}
              />
            </div>
          </div>
          <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpBG;
