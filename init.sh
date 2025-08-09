#!/bin/sh
mkdir -p hashes fingerprints logs
[ ! -f hashes/hashes.json ] && echo "[]" > hashes/hashes.json
exec "$@"
