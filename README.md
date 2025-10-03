# website-v3

![CO2 badge](https://img.shields.io/badge/CO2_/_visit-0.03g-blue)
![Lighthouse badge](https://img.shields.io/badge/Lighthouse_Performance-96-green)


personal website

inspired by the strightforwardness of http://bettermotherfuckingwebsite.com/

## running

to setup, install packages `bun i` and copy environment variables `cp .env.example .env`, filling in env variables as needed (all optional).

development: `bun run dev`

production: `bun run build && bun run start`

production with docker: `docker build -t website-v3 . && docker run -p 80:8999 -d --name website-v3 website-v3`