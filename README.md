# Strapi application

This is a repro repository for issue #8735.

## Setup

### Install

```
yarn
yarn build
yarn develop
```

### Configure

Edit public permissions (no need for authentication to reproduce)

> go to http://localhost:1337/admin/settings/users-permissions/roles/2 (Public role)

Allow all nested-entity and root-entity actions.

### Create sample models

1. Create a rootEntity, name it as you want (e.g `root01`)
2. Create multiple nestedEntities, name them incrementally (e.g `nested01`, `nested02`)

## Reproduce

> A controller in `api/root-entity/controllers/root-entity.js` will automatically drop nested_entities on find

> A controller in `api/nested-entity/controllers/nested-entity.js` will log when called


### REST

Reach `http://localhost:1337/root-entities`, you'll see a response without nested entities.

```json
[
  {
    "id": 1,
    "name": "root01",
    "created_at": "2020-11-26T08:11:31.753Z",
    "updated_at": "2020-11-26T08:15:05.877Z"
  }
]
```

### Graphql

From `http://localhost:1337/graphql` run

```graphql
query MyNestedEntities {
  rootEntities {
    id
    name
    nested_entities {
      id
      name
    }
  }
}
```

It should return:

```json
{
  "data": {
    "rootEntities": [
      {
        "id": "1",
        "name": "root01",
        "nested_entities": [
          {
            "id": "1",
            "name": "nested01"
          },
          {
            "id": "2",
            "name": "nested02"
          }
        ]
      }
    ]
  }
}
```

