import Features from "../components/homepage/Platformfeatures";
import Banner from "../components/homepage/Banner";
import Newsletter from "../components/homepage/SubscriptionSection";
import UpcomingEvents from "../components/events/UpcomingEvents";

const page = () => {
  return (
    <div>
    <Banner/>
    <Features/>
   <UpcomingEvents  limit={6}/>
    <h1>past evets</h1>
    <Newsletter/>

    </div>
  );
};

export default page;