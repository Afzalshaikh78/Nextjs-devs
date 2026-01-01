//write a type of promise for params

import BookEvent from "@/components/BookEvent";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex gap-2 items-center">
    <Image src={icon} height={17} width={17} alt="event icon" />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div key={tag} className="pill">
          {tag}
      </div>
    ))}

  </div>
);


 
const EventDetailsPage = async ({ params }: Params) => {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      mode,
      organizer,
      date,
      time,
      overview,
      tags,
      location,
      audience,
      agenda,
    },
  } = await response.json();

  if (!description) {
    return notFound();
  }

  const bookings = 10;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>

        <div className="details">
          {/* left side */}
          <div className="content">
            <Image
              src={image}
              alt="event image"
              width={800}
              height={800}
              className="banner"
            />

            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>

            <section className="flex-col-gap-2">
              <h2>Event Details</h2>

              <EventDetailItem icon="/icons/calendar.svg" label={date} />
              <EventDetailItem icon="/icons/clock.svg" label={time} />
              <EventDetailItem icon="/icons/pin.svg" label={location} />
              <EventDetailItem icon="/icons/mode.svg" label={mode} />
              <EventDetailItem icon="/icons/audience.svg" label={audience} />
            </section>


            <EventAgenda agendaItems={agenda} />

            <section className="flex-col-gap-2">
              <h2>About the Organizer</h2>
              <p>{organizer}</p>

            </section>

            <EventTags tags={tags} />




          </div>

          {/* right side */}
          <aside className="booking">
            <div className="signup-card">
              <h2>
                Book Your Spot
              </h2>
              {bookings > 0 ? (
                <p className="text-sm">
                  Join {bookings} people who have booked for this event
              </p>
              ) : (<p className="text-sm">
                  Be the first to book this event
              </p>)}

             

              <BookEvent/>
              
            </div> 
            </aside>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
