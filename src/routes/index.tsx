import { AddUrlForm } from "@/components/AddForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout";
import { Nav } from "@/components/Nav";
import { appText } from "@/lib/const";
import { Metadata, Viewport } from "next";

export let meta: Metadata = {
  title: `${appText.appName} - URL Shortener`,
};

export const viewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const Index = () => {
  return (
    <Layout>
      <Nav />
      <Layout.Content>
        <Hero />
        <AddUrlForm />
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default Index;
