require 'sinatra'

set :public_folder, proc { File.join(root) }
set :views, 'views'

get '/' do
  File.read('./views/index.html')
end