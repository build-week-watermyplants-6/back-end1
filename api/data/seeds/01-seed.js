exports.seed = async function(knex) {
  await knex('users').insert([
    {username:'admin', password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', phone:'(111)-111-1111'},
    {username:'Bruce', password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', phone:'(111)-111-1112'},
    {username:'Cornelius', password: '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq', phone:'(111)-111-1113'}
  ])
  await knex('plants').insert([
    {species:'spider plant'},
    {species:'weeping fig'}, 
    {species:'golden barrel cactus'},
    {species:'century plant'},
  ])
  await knex('user_plants').insert([
    {user_id: 2, plant_id: 1, nickname: 'Rose', water_frequency: 5, last_water:null}, 
    {user_id: 2, plant_id: 1, nickname: 'Venus fly trap', water_frequency: 5, last_water:null}, 
    {user_id: 2, plant_id: 2, nickname: '#sadboi', water_frequency: 14, last_water:'2021-03-20'}, 
    {user_id: 2, plant_id: 3, nickname: 'planty plant', water_frequency: 7, last_water:null},
    {user_id: 3, plant_id: 4, nickname: 'plantiest plant', water_frequency: 3, last_water:null},
    {user_id: 3, plant_id: 3, nickname: 'the plantiest plant in town', water_frequency: 7, last_water:null},
  ])
}