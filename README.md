# website-v3

personal website

inspired by the strightforwardness of http://bettermotherfuckingwebsite.com/

## running

development: `bun run dev`

production: `bun run build && bun run start`

production with docker: `docker build -t website-v3 . && docker run -p 80:8999 -d --name website-v3 website-v3`