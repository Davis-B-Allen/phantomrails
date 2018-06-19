Rails.application.routes.draw do

  root 'application#hello'
  get  '/cardgen',  to: 'application#cardgen'
end
