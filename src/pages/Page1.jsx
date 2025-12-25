import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import WishSender from "../components/WishSender";
import WishCard from "../components/Wishcard";
import QuoteBox from "../components/QuoteBox";

const Page1 = ({ senderName }) => {
  return (
    <div>
      <div className="relative min-h-screen text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12">
          
          <AnimatedSection id="wish-sender" centerOnLoad stackIndex={0}>
            <WishSender name={senderName} />
          </AnimatedSection>

          <AnimatedSection id="quote-box" stackIndex={1}>
            <QuoteBox />
          </AnimatedSection>

          <AnimatedSection id="wish-card" fireOnReveal stackIndex={2}>
            <WishCard />
          </AnimatedSection>
        </div>

        {/* Spacer before Page2 */}
        <div className="h-screen flex flex-col justify-center items-center font-bold text-4xl">
          SwipeUP to Create yours...
        </div>
      </div>
    </div>
  );
};

export default Page1;