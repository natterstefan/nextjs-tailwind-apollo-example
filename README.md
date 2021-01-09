# nextjs-tailwind-template

This is a template repository with [Tailwind CSS](https://tailwindcss.com) in a
Next.js project.

## Start

```bash
# install dependencies
yarn

# start postgres
docker-compose -f docker/docker-compose.yml up -d

# start the app
yarn dev
```

## Test with Cypress

```bash
# start the app
yarn dev

# run the test in another terminal window
yarn cypress open
```

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/natterstefan/nextjs-tailwind-template)

## References

- based on <https://github.com/vercel/next.js/tree/master/examples/with-tailwindcss>

## License

[MIT](./LICENSE)
