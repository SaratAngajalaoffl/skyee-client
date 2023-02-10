migrate((db) => {
  const collection = new Collection({
    "id": "n9hh9e2fqw2i3q2",
    "created": "2023-02-10 12:27:22.197Z",
    "updated": "2023-02-10 12:27:22.197Z",
    "name": "user",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ggj21wsq",
        "name": "address",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": 42,
          "max": 42,
          "pattern": "^0x[a-fA-F0-9]{40}$"
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("n9hh9e2fqw2i3q2");

  return dao.deleteCollection(collection);
})
