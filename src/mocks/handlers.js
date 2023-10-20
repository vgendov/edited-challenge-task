import { rest } from "msw";

const user = { email: "hello@edited.com", password: "hello123" };

export const handlers = [
  rest.post("https://localhost:3000/login", async (req, res, ctx) => {
    const data = await req.json();

    if (data.email === user.email && data.password === user.password) {
      return res(ctx.status(200));
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          message: "Failed to log in: username or password are invalid!",
        })
      );
    }
  }),
];
