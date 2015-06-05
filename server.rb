require 'sinatra'

set :public_folder, proc { File.join(root) }
set :views, 'views'

get '/' do
  File.read('./views/game.html')
end

post '/test' do
end

get '/test' do
end