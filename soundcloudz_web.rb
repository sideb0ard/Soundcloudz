#!/usr/bin/env ruby

require 'sinatra/base'
require 'haml'

class SoundCloudz < Sinatra::Base

  get '/' do
    haml :index
  end

  get '/about' do
    haml :about
  end

  #run! if app_file == $0

end

SoundCloudz.run!
