import React from "react";

import AwesomeSlider from "react-awesome-slider";
import "../../css/_deliverySliderHome.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import deliveryBack from "../../assets/images/deliveryBackg.png";

import CdelSur from "../../assets/icons/CDelSur.svg";
import Chevallier from "../../assets/icons/Chevallier.svg";
import FBus from "../../assets/icons/FBus.svg";
import MercadoEnv from "../../assets/icons/MercadoEnv.svg";
import Oca from "../../assets/icons/Oca.svg";
import Plusmar from "../../assets/icons/Plusmar.svg";
import Pullman from "../../assets/icons/Pullman.svg";
import Tata from "../../assets/icons/Tata.svg";
import TIguazu from "../../assets/icons/TIguazu.svg";
import VBari from "../../assets/icons/VBari.svg";
import ViaTac from "../../assets/icons/ViaTac.svg";

const deliveryData = [
  {
    image: CdelSur,
  },
  {
    image: Chevallier,
  },
  {
    image: FBus,
  },
  {
    image: MercadoEnv,
  },
  {
    image: Oca,
  },
  {
    image: Plusmar,
  },
  {
    image: Pullman,
  },
  {
    image: Tata,
  },
  {
    image: TIguazu,
  },
  {
    image: VBari,
  },
  {
    image: ViaTac,
  },
];

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Delivery = () => {
  return (
    <>
      <div id="background_slider" className="w-full md:my-4 m-auto md:mt-20">
        <h1
          className="uppercase text-slate-400	font-normal text-2xl text-center my-4"
          id="categoriesTitle"
        >
          Envíos
        </h1>

        <div className="w-full relative">
          <img
            src={deliveryBack}
            className="w-full"
            alt="delivery background"
          />

          <AutoplaySlider
            className="deliverySlider awssld__content"
            mobileTouch={true}
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={3000}
          >
            {deliveryData.map((slide, index) => {
              return (
                <div key={index}>
                  <img
                    src={slide.image}
                    alt="travel"
                    className="w-[50%] m-auto md:w-[100%]"
                  />
                </div>
              );
            })}
          </AutoplaySlider>
        </div>
      </div>
    </>
  );
};

export default Delivery;
