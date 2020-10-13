# Stage I
FROM node:stretch AS react-build

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm install react-scripts@3.4.0 -g
RUN npm run-script build

# Stage II
#Setup Nginx
FROM nginx:1.16.0-alpine

COPY --from=react-build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

#Fire up Nginx
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]