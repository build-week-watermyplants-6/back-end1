const db = require('../data/db-config')

const find = () => {
  return db('user_plants as up')
  .join('users as u', 'u.user_id', 'up.user_id')
  .join('plants as p', 'p.plant_id', 'up.plant_id')
  .select('up.user_plants_id', 'u.username as user', 'p.species', 'up.nickname', 'up.water_frequency', 'up.last_water')
}

const findById = (user_id) => {
  return db('user_plants as up')
  .join('users as u', 'u.user_id', 'up.user_id')
  .join('plants as p', 'p.plant_id', 'up.plant_id')
  .select('up.user_plants_id', 'u.username as user', 'p.species', 'up.nickname', 'up.water_frequency', 'up.last_water')
  .where('u.user_id', user_id)
}

const findByPlantId = (user_id, user_plants_id) => {
  return findById(user_id)
  .where('user_plants_id', user_plants_id)
}

const getAllSpecies = () => {
  return db('plants')
}

const getSpeciesBy = (filter) => {
  return db('plants')
  .where('species', filter).first()
}

const insertIntoPlants = async (newSpecies) => {
  const id = await db('plants').insert({species: newSpecies}, ['plant_id'])
  return id
}

const create = async (userid, plant) => {
  const {species} = plant
  const speciesFound = await getSpeciesBy(species)
  if(!speciesFound){
    console.log(species)
    insertIntoPlants(species)
    .then(newPlantId => {
      const newPlant = {user_id:userid, plant_id:newPlantId[0].plant_id, nickname: plant.nickname, water_frequency: plant.water_frequency, last_water: plant.last_water}
      db('user_plants')
      .insert(newPlant, ['user_plants_id'])
      .then(userplantId => {
        return findByPlantId(userid, userplantId[0].user_plants_id)
      }).catch( err => console.log(err))
    }).catch( err => console.log(err))

  } else {
    const newPlantId = speciesFound.plant_id
    const newPlant = {user_id:userid, plant_id:newPlantId, nickname: plant.nickname, water_frequency: plant.water_frequency, last_water: plant.last_water}
    const userplantId = await db('user_plants').insert(newPlant, ['user_plants_id'])
    return await findByPlantId(userid, userplantId[0].user_plants_id)
  }
}

const remove = (id) => {
  return db('user_plants')
  .where('user_plants_id', id)
  .del()
}

const updatePlant = async (plantId, changes, userId) => {
  const {species} = changes
  const speciesFound = await getSpeciesBy(species)
  console.log(speciesFound)
  if(!speciesFound){
    const newPlantId = await insertIntoPlants(species)
    const newChanges = {user_id: userId, plant_id:newPlantId, nickname:changes.nickname, water_frequency: changes.water_frequency, last_water:changes.last_water}
    await db('user_plants').where('user_plants_id', plantId).update(newChanges)
    return findByPlantId(userId, plantId)
  } else {
    const newPlantId = speciesFound.plant_id
    const newChanges = {user_id: userId, plant_id:newPlantId, nickname:changes.nickname, water_frequency: changes.water_frequency, last_water:changes.last_water}
    console.log(newChanges)
    await db('user_plants').where('user_plants_id', plantId).update(newChanges)
    return findByPlantId(userId, plantId)
  }
}

module.exports = {
  find,
  findById,
  findByPlantId,
  getAllSpecies,
  getSpeciesBy,
  insertIntoPlants,
  create,
  remove,
  updatePlant
}