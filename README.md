# Check Flux

```brew install fluxcd/tap/flux```
```brew upgrade fluxcd/tap/flux```
```kompose convert -c -o charts/icd-stack -f docker-compose.yml```

Values file
```yaml
api:
  image: maxandersson/icd-api
db:
  image: maxandersson/icd-db
web:
  image: maxandersson/icd-web
```

```bash
flux create hr fluxcapacitor \
--source=GitRepository/flux-system \
--chart ./charts/icd-stack \
--export --values=charts/icd-stack/values.yaml \
--target-namespace default > releases/icd-release.yaml 
```

```sh
flux bootstrap github \
  --owner=$GITHUB_USER \
  --repository=dockercon\
  --branch=master \
  --path=./releases \
  --personal
  ```
