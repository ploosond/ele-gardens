import HeroSection from "../components/HeroSection";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Location = () => {
  const locations = [
    {
      id: 1,
      name: "Stauden Peters",
      address: {
        street: "Drüllerweg 14",
        city: "Kranenburg",
        state: "NRW",
        zip: "47559",
      },
      phone: "+49 (0)2826 91 50 - 0",
      email: "info@stauden-peters.de",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM, Sun: Closed",
      image:
        "https://scontent-dus1-1.xx.fbcdn.net/v/t39.30808-6/360086301_745291887399304_7848566366973120412_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=PYf0KDK0dvAQ7kNvgGKSCQx&_nc_oc=AdmrI7kf3s4jOJPwsxPQwftkep3jdQ5xtyOmGGrJeKgLNSAUYH3dIn48e0_rIbBjLGA&_nc_zt=23&_nc_ht=scontent-dus1-1.xx&_nc_gid=AkeO3_iJjJoEFoQ2RvCeiQ&oh=00_AYGjCqySZ5ksp4Sh0uajI-JXIUraLv__fndK16DMs6su4A&oe=67EF4287",
    },
    {
      id: 2,
      name: "Blumenparadies Berlin",
      address: {
        street: "Blumenstraße 45",
        city: "Berlin",
        state: "BE",
        zip: "10115",
      },
      phone: "+49 (0)30 123 4567",
      email: "info@blumenparadies-berlin.de",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM, Sun: Closed",
      image:
        "https://s3-media0.fl.yelpcdn.com/bphoto/v15ddGD3D050ZPn6-hMXLg/o.jpg",
    },
    {
      id: 3,
      name: "Gartenwelt München",
      address: {
        street: "Gartenstraße 12",
        city: "München",
        state: "BY",
        zip: "80331",
      },
      phone: "+49 (0)89 987 6543",
      email: "info@gartenwelt-muenchen.de",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM, Sat: 10:00 AM - 2:00 PM, Sun: Closed",
      image:
        "https://www.seebauer.de/content/files/2007/Slider-Startseite-r1-1920x700-proportionalsmallest.webp",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Our"
        highlight="Locations"
        description="Visit our garden centers and nurseries to explore our plant collections and get expert advice."
      />

      {/* Locations Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-16">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section */}
                <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[350px]">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-semibold text-white">
                      {location.name}
                    </h3>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <h3 className="text-garden-dark text-2xl font-semibold">
                    {location.name}
                  </h3>

                  <div className="flex items-start">
                    <div className="bg-garden-light mr-4 flex-shrink-0 rounded-full p-3">
                      <MapPin className="text-garden-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-garden-dark font-medium">Address</h4>
                      <p className="text-gray-600">
                        {location.address.street}
                        <br />
                        {location.address.city}, {location.address.state}{" "}
                        {location.address.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-garden-light mr-4 flex-shrink-0 rounded-full p-3">
                      <Phone className="text-garden-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-garden-dark font-medium">Phone</h4>
                      <p className="text-gray-600">
                        <a
                          href={`tel:${location.phone}`}
                          className="hover:text-garden-primary transition-colors"
                        >
                          {location.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-garden-light mr-4 flex-shrink-0 rounded-full p-3">
                      <Mail className="text-garden-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-garden-dark font-medium">Email</h4>
                      <p className="text-gray-600">
                        <a
                          href={`mailto:${location.email}`}
                          className="hover:text-garden-primary transition-colors"
                        >
                          {location.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-garden-light mr-4 flex-shrink-0 rounded-full p-3">
                      <Clock className="text-garden-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-garden-dark font-medium">Hours</h4>
                      <p className="text-gray-600">{location.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Location;
