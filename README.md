# Check Flux

```brew install fluxcd/tap/flux```
```brew upgrade fluxcd/tap/flux```
```kompose convert -c -o charts/idc-stack -f docker-compose.yml```

Values file
```yaml
api:
  image: maxandersson/idc-api
db:
  image: maxandersson/idc-db
web:
  image: maxandersson/idc-web
```

```bash
flux create hr fluxcapacitor \
--source=GitRepository/flux-system \
--chart ./charts/idc-stack \
--export --values=charts/fluxcapacitor/values.yaml \
--target-namespace default > releases/fluxcapcacitor-release.yaml 
```
