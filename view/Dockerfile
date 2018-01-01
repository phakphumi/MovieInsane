# Use Node v8 as the base image.
FROM node:8

# Add everything in the current directory to our image, in the 'view' folder.
ADD . /view

# Change working directory to /view
WORKDIR /view

# install all dependencies
RUN npm install