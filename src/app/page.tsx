import Features from "../components/homepage/Platformfeatures";
import Banner from "../components/homepage/Banner";
import Newsletter from "../components/homepage/SubscriptionSection";
import UpcomingEvents from "../components/events/UpcomingEvents";
import AllEvents from "../components/events/AllEvents"
const page = () => {
  return (
    <div>
    <Banner/>
    <Features/>
   <UpcomingEvents  limit={6}/>
  <AllEvents/>
    <Newsletter/>
    </div>
  );
};

export default page;