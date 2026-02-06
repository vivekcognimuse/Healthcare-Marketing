import PodcastBookingForm from "@/components/PodcastBookingForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function BookEventPage({ params }: PageProps) {
  const { eventId } = await params;
  
  return (
    <>
      <Header />
      <PodcastBookingForm eventId={eventId} />
      <Footer />
    </>
  );
}
