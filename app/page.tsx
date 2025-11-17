import Eventcard from "@/components/Eventcard";
import Explorebtn from "@/components/Explorebtn";
import { events } from "@/lib/constants";



const page = () => {
  return (
    <div>
      <section>
        <h1 className="text-center">
          The Hub for Every Dev <br /> Event You Can&apos;t Miss
        </h1>
        <p className="text-center mt-5 text-xl">
          Hackathons, meetups, conferences, and more are a great way to meet
        </p>

        <Explorebtn />

        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>

          <ul className="events">
            {events.map((event) => (
              <li key={event.title}>
                <Eventcard {...event} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
