Rails.application.routes.draw do

  get 'cards/generator'
  post 'cards/generated'

  root 'application#hello'
  get  '/cardgen',  to: 'application#cardgen'

  get  '/lab',  to: 'cards#lab'
  post 'cards/playtest'
end
