#!/usr/bin/env ruby
require 'soundcloud'

client = Soundcloud.new(:client_id => '829a1cdaf7b2e5ce1aacbb2e076351ac')

if ARGV.length == 0 then
  puts "Gimmme some tags plz, nom nom.."
  exit
end

tags = ARGV.join(",")

puts "Searching for #{tags}..."

tracks = client.get('/tracks', :limit => 10, :tags => "#{tags}")

# print each link
tracks.each do |track|
  puts track.permalink_url
end
