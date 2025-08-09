mkdir -p "fingerprint-volumes"

echo 'stop and remove container...'
docker rm -f fingerprint;

echo 'run container again...'
docker run --name fingerprint -d -p 1234:1234 -e HTTP_PORT=1234 \
   -v /root/fingerprint-volumes/log:/app/logs \
   -v /root/fingerprint-volumes/hashes:/app/hashes \
   -v /root/fingerprint-volumes/fingerprints:/app/fingerprints \
   triddov/fingerprint:http

echo 'done.'
