#!/bin/bash
command -v docker > /dev/null
if ! [ $? -eq 0 ] ; then
    boldecho '\033[31mRequired developer tooling is missing!'
    echo "This project depends on Docker for environment management."
    echo "https://docker.com"
    exit 1
else
    echo -e "\033[32mFound Docker!\033[0m"
fi

echo -e "\033[32mRunning docker-compose up --build...\033[0m"

docker-compose up --build
