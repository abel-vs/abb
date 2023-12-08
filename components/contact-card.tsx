import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContactCardProps {
  firstName: string;
  lastName: string;
  title: string;
  phoneNumber: string;
  email: string;
  src: string;
}

const ContactCard = ({
  firstName,
  lastName,
  title,
  phoneNumber,
  email,
  src,
}: ContactCardProps) => {
  const pictureSize = 200;
  return (
    <Card className="flex items-center bg-secondary rounded-md overflow-hidden shadow-sm border-[0.5px] border-black h-36 p-6">
      <div className="block w-auto h-auto -ml-16">
        <Image
          src={src}
          alt="Profile picture"
          width={pictureSize}
          height={pictureSize}
          className="rounded-full"
        />
      </div>
      <div className="flex-col">
        <CardHeader>
          <CardTitle>{firstName + " " + lastName}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="flex gap-1">
            <Phone height={20} /> {phoneNumber}
          </p>
          <p className="flex gap-1">
            <Mail height={20} />
            {email}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default ContactCard;
