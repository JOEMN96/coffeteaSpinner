import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  console.log(req);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
    }),
  };
};
