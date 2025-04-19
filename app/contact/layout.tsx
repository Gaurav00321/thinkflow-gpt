import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - ThinkFlowGPT",
  description:
    "Get in touch with our team for support, inquiries, or feedback.",
  openGraph: {
    title: "Contact Us - ThinkFlowGPT",
    description:
      "Get in touch with our team for support, inquiries, or feedback.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
