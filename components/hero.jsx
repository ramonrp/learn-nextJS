import Image from "next/image";
import heroImage from "../public/static/hero-image.png";
const Hero = ({ width = 700, height = 400 }) => {
  return (
    <Image
      src={heroImage}
      alt="Hero Image"
      width={width}
      height={height}
    ></Image>
  );
};

export default Hero;
