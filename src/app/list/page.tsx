import { deleteLink } from "@/actions/url/delete";
import { AuthForm } from "@/components/AuthForm";
import { Footer } from "@/components/Footer";
import { Layout } from "@/components/Layout";
import { isAuthorized } from "@/lib/auth";
import { kv } from "@vercel/kv";

const getPairs = async () => {
  if (!isAuthorized()) {
    return {
      data: [],
      error: "Unauthorized",
    };
  }
  const keys = await kv.scan(0, { count: 200 });

  const pairs = await Promise.all(
    keys[1].map(async (key: string) => {
      const value = await kv.get<string>(key);
      return { key, value };
    }),
  );

  return {
    data: pairs,
    error: null,
  };
};

interface ListPageProps {}

const ListPage = async ({}: ListPageProps) => {
  const { data: links, error } = await getPairs();

  return (
    <Layout>
      <div
        className={`container flex grow flex-col items-center justify-center gap-12 px-5`}
      >
        <div
          className={`-mx-3 text-balance text-center text-[46px] font-semibold leading-[52px] tracking-[-0.015em] text-white text-opacity-[0.85] md:mx-0 md:text-[54px] md:leading-[60px] lg:text-start xl:text-[64px] xl:leading-[76px] `}
        >
          Index
        </div>
        {error ? (
          <div
            className={`flex h-full w-full max-w-md flex-col px-2  text-sm text-white text-opacity-80`}
          >
            <AuthForm />
          </div>
        ) : (
          <div className={`max-h-[400px] max-w-lg overflow-y-scroll`}>
            <table className={`table-auto border-spacing-0 border-none`}>
              <thead className={`sticky -top-px z-50`}>
                <tr>
                  <th>
                    <div
                      className={`flex  h-10 items-center justify-center rounded-2xl rounded-r-none border border-r-0 border-gray-500 bg-[#171717] bg-opacity-10 px-3 text-sm text-white text-opacity-80 backdrop-blur-sm`}
                    >
                      Slug
                    </div>
                  </th>
                  <th>
                    <div
                      className={`-ml-px flex h-10 items-center justify-center rounded-2xl rounded-l-none border border-gray-500 bg-[#171717] bg-opacity-10 px-3 text-sm text-white text-opacity-80 backdrop-blur-sm`}
                    >
                      Url
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.key} className={``}>
                    <td>
                      <div
                        className={`mx-3 my-2 flex h-10 items-center justify-center  text-sm text-white text-opacity-50`}
                      >
                        <div>{link.key}</div>
                      </div>
                    </td>
                    <td>
                      <div
                        className={`flex h-10 min-w-0 items-center justify-center text-ellipsis text-nowrap text-sm leading-tight text-white text-opacity-50`}
                      >
                        {link.value}
                        <form action={deleteLink}>
                          <input
                            type="hidden"
                            name="key"
                            value={link.key}
                          ></input>
                          <button
                            type="submit"
                            className={`ml-2 text-sm text-red-500 text-opacity-50`}
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
};
export default ListPage;
