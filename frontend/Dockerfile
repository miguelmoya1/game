FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production


FROM nginx:22

COPY --from=builder /app/dist/my-angular-app /usr/share/nginx/html

# If you want to use a custom nginx configuration, you can copy it to the container like this:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
