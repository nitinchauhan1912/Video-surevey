class InteractionsController < ApplicationController
  before_action :set_video, only: [:create]
  before_action :check_authentication

  def create
  	@interaction = Interaction.create()
  	#debugger

  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_video
    @video = Video.find(params[:video_id])
  end

  def check_authentication
    if !current_user
      flash[:warning] = "Your are not authorize to view any content until you sign in."
      redirect_to '/'
    end  
  end 
  
end