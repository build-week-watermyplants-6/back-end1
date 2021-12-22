exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username').unique().notNullable()
      users.string('password').notNullable()
      users.string('phone').unique()
      users.timestamps(false, true)
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('species').unique().notNullable()
    })
    .createTable('user_plants', (user_plants) => {
      user_plants.increments('user_plants_id')
      user_plants.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      user_plants.integer('plant_id')
      .unsigned()
      .notNullable()
      .references('plant_id')
      .inTable('plants')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      user_plants.string('nickname')
      user_plants.integer('water_frequency')
      user_plants.dateTime('last_water')
    })
  }

  exports.down = async (knex) => {
    await knex.schema
    .dropTableIfExists('user_plants')
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
  }