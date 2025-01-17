#!/bin/bash

deno --allow-net --allow-read --allow-run src/main.ts
tsc ./static/client.ts

