<p align="center">
<img src=".github/sc.jpg">
<br>
<i>s.roko.foo - Personal url shortener</i>
</p>

### About

Features a simple, clean and responsive design. It's a personal url shortener, so it's not meant to be used by others i.e. permanent linking. It was a fun project to learn and experiment with Next.js and Vercel KV.

Redirect are super fast because they are handled by Vercel's edge network.

### Stack:

- [Next.js 14](https://nextjs.org/) frontend hosted on [Vercel](https://vercel.com)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for storing URLs
- Creating/managing links is password protected
- Server actions for creating/managing links

### Host your own

1. Clone the repository
2. Install dependencies
3. Create a `.env.local` file, add in all the environment variables from `.env.example`
4. _Optional_: Change app name and description [here](src/lib/const.ts)
5. Run the app and/or deploy it to Vercel
