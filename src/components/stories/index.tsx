import * as React from "react";
import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import image4 from "@/assets/images/image4.jpg";
import image5 from "@/assets/images/image5.jpg";
import image6 from "@/assets/images/image6.jpg";
import image7 from "@/assets/images/image7.jpg";

interface IStoriesProps {}

const Stories: React.FunctionComponent<IStoriesProps> = () => {
  return (
    <div className="flex justify-between">
      <img
        src={image1}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={image2}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={image3}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={image4}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={image5}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={image6}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
      <img
        src={image7}
        alt="story image"
        className="w-20 h-20 rounded-full border-4 border-slate-800 object-cover"
      />
    </div>
  );
};

export default Stories;
