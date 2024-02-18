import { kv } from "@vercel/kv";

export const runtime = "edge";

export async function GET(req: Request) {
	const { slug } = Object.fromEntries(new URL(req.url).searchParams);
	if (slug) {
		const url = await kv.get<string>(slug);
		if (url) {
			return new Response("", {
				status: 301,
				headers: {
					Location: url,
				},
			});
		}
	}
	return new Response("", { status: 301, headers: { Location: "/" } });
}
