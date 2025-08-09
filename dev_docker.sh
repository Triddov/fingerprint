docker rm -f fingerprint
docker rmi triddov/fingerprint:http

rm -rf ./docker-volumes/*

npm run build

docker buildx create --name BuildKit --use
docker buildx build --platform linux/amd64,linux/arm64 -t triddov/fingerprint:http --load .

mkdir -p "docker-volumes"

docker buildx rm BuildKit

docker run --name fingerprint -p 3001:3001 \
  -v /Users/triddov/Desktop/WebProjects/fingerprint/docker-volumes/log:/app/logs \
  -v /Users/triddov/Desktop/WebProjects/fingerprint/docker-volumes/hashes:/app/hashes \
  -v /Users/triddov/Desktop/WebProjects/fingerprint/docker-volumes/fingerprints:/app/fingerprints \
  triddov/fingerprint:http