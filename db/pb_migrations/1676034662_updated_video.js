migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ki8v93qcpz57j5o")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ki8v93qcpz57j5o")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
