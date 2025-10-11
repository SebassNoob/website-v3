# website-v3

![CO2 badge](https://img.shields.io/badge/CO2_/_visit-0.03g-blue)
![Lighthouse badge](https://img.shields.io/badge/Lighthouse_Performance-96-green)


personal website

inspired by the strightforwardness of http://bettermotherfuckingwebsite.com/

## running

Install packages with bun (`bun i`).

development: `bun run dev`

production: `bun run build && bun run start`

production with docker: `docker build -t website-v3 . && docker run -p 80:8999 -d --name website-v3 website-v3`

Known issues:
1. `biomejs` will not format when build files are in the workspace (fixed in 2.3).
2. `@next/bundle-analyzer` does not work with turbopack.
3. `next build` with turbopack will fail in docker environments when react compiler is enabled.