#!/bin/bash
echo 'Running the server...'

docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 5001:5001 wiley
