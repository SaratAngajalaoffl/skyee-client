migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n9hh9e2fqw2i3q2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zwtngo0s",
    "name": "nonce",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n9hh9e2fqw2i3q2")

  // remove
  collection.schema.removeField("zwtngo0s")

  return dao.saveCollection(collection)
})
