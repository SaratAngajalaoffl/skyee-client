migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ki8v93qcpz57j5o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0nlvokk",
    "name": "thumbnail",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ki8v93qcpz57j5o")

  // remove
  collection.schema.removeField("w0nlvokk")

  return dao.saveCollection(collection)
})
