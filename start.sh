#!/bin/sh

# Start backend in background
node server.js &

# Start frontend server
serve -s public -l 8080 &

# Keep container running
wait