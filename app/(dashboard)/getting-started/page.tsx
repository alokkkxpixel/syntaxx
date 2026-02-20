


import GettingStartedComponent from "@/components/getStartedComponent";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Getting Started – Syntaxx",
    description: "Learn how to use Syntaxx",
  }
}

export default function GettingStartedDoc() {
 

  return (
    <div className="w-full">
      <GettingStartedComponent />
    </div>
  );
}






