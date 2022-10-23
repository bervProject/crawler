# Crawler Service

## Current Implementation

1. Parse Badges from Credly to DynamoDB

## Columns

### Badge

```json
{
  "id": "<badge id>",
  "name": "<badge title>",
  "href": "<credly link>",
  "src": "<image link>"
}
```

## Required Environment Variables

```bash
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_REGION=
export DYNAMODB_TABLE_NAME=
export CREDLY_USERNAME=
```

## TODO

- [ ] Multiple Data Store Options (Extandable)
- [ ] Custom Mapper Columns

## License

MIT