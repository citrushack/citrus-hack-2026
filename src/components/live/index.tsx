import Landing from "./landing";
import Schedule from "./schedule";
// import About from "./about";
// import Tracks from "./tracks";
// import Sponsors from "./sponsors";
// import Team from "./team";
// import Committees from "./committees";
// import Judges from "./judges";
// import FAQ from "./faq";
// import Footer from "./footer";
import { Suspense } from "react";

const Live = () => {
  return (
    <>
      <Landing>
        <Suspense
          fallback={
            <div className="flex flex-row justify-center p-10 text-lg font-semibold text-white">
              Loading...
            </div>
          }
        >
          <Schedule />
        </Suspense>
      </Landing>
      {/* <About />
      <Tracks />
      <Schedule />
      <Sponsors />
      <Team />
      <Committees />
      <Judges />
      <FAQ />
      <Footer /> */}
    </>
  );
};

export default Live;
