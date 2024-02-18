import { appText } from "@/lib/const";

export const Footer = () => {
  return (
    <div
      className={`mb-5 mt-10 w-full  text-center leading-6 text-white text-opacity-50 md:my-5`}
    >
      {appText.socials.githubLink && (
        <a rel="noreferrer" href={appText.socials.githubLink} target="_blank">
          GitHub repo
        </a>
      )}
    </div>
  );
};
