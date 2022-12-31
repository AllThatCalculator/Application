#!/bin/sh

nginx;

# Check if inotifywait is installed
if ! which inotifywait > /dev/null; then
    # Install inotify-tools package, which includes inotifywait
    apk update
    apk upgrade
    apk add inotify-tools
fi

# Monitor the nginx configuration file for changes
while inotifywait -e modify /etc/nginx/conf.d/nginx.conf; do
    # Reload nginx when the configuration file is modified
    echo "nginx reloaded"
    nginx -s reload
done