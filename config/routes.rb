Rails.application.routes.draw do
  
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    get '/users/email', to: 'users#email'
    resources :users
    resource :session
  end

end
