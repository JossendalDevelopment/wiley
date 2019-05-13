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

echo -e "\033[32mRunning Server...\033[0m"

# docker run -v ${PWD}:/usr/src/app -p 5001:5001 -it $(docker build -q -f ./Dockerfile .)
# docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 5000:5000 wiley
docker build -t wiley .
# docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 5000:5000 wiley
echo -e "\033[32mApp available at localhost:8080...\033[0m"
docker run -it -p 8080:80 --rm --name wiley_1 wiley

