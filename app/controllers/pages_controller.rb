class PagesController < ApplicationController
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
