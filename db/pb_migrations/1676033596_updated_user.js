migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n9hh9e2fqw2i3q2")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("n9hh9e2fqw2i3q2")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
