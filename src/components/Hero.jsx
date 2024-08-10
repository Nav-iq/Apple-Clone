import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo);

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 768) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          IPhone 15 pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
          <a
            href="#title"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(e.target.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            Buy
          </a>
          <p className="text-normal text-xl text-gray">fROM $199/MONTH OR $199</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
