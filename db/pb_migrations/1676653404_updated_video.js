migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ki8v93qcpz57j5o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0nlvokk",
    "name": "thumbnail",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880000,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ki8v93qcpz57j5o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0nlvokk",
    "name": "thumbnail",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
