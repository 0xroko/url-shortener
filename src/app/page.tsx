import { AddUrlForm } from "@/components/AddForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <Layout.Content>
        <Hero />
        <AddUrlForm />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}
