class PagesController < ApplicationController
  #before_action :check_authentication, only: [:profile]
  def home
  	if user_signed_in?
  		redirect_to videos_path
  	end
  end
  def about 
	end 
	def profile 
	end 
end
