import { Card } from "@/components/ui/card";
import { Car, CreditCard, Shield, Headphones } from "lucide-react";

const Services = () => {
  const services = [
    { name: "Free Shipping", description: "Free shipping on all orders", icon: <Car /> },
    { name: "Payment Options", description: "Secure payment options", icon: <CreditCard /> },
    { name: "Returns Policy", description: "Secure returns policy", icon: <Shield /> },
    { name: "Customer Support", description: "24/7 customer support", icon: <Headphones /> },
  ];

  return (
    <div className="bg-primary">
      <div className="container grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Card key={index} className="bg-background text-primary flex-center flex-col gap-0">
            <div className="text-primary bg-primary-foreground mb-4 rounded-full p-2">{service.icon}</div>
            <h2 className="mb-2 text-lg">{service.name}</h2>
            <p className="text-primary/75">{service.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
