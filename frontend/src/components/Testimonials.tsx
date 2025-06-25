import { Card, CardHeader, CardBody, Image } from "@heroui/react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frequent Traveler",
    message:
      "This is by far the easiest car rental service I've used. The process was smooth and the vehicle was in great condition!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Daniel Kim",
    role: "Business Consultant",
    message:
      "Excellent customer support and very flexible pickup options. I had to change my drop-off last minute—no issues at all.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Fatima Ali",
    role: "Vacation Renter",
    message:
      "Loved the contactless check-in. I was on the road in minutes. Clean, reliable, and easy to use!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="my-16 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Customers Say
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <Card key={index} className="shadow-md flex flex-col h-full">
            {/* Comment at the top */}
            <CardHeader className="p-6 flex-grow">
              <p className="text-base text-gray-700 italic">“{t.message}”</p>
            </CardHeader>

            {/* Fixed bottom part */}
            <CardBody className="bg-blue-600 text-white flex flex-col items-center py-6 mt-auto">
              <Image
                alt={`${t.name} profile`}
                src={t.image}
                className="rounded-full w-20 h-20 border-4 border-white shadow-md mb-3"
              />
              <p className="font-semibold text-lg">{t.name}</p>
              <p className="text-sm opacity-80">{t.role}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
