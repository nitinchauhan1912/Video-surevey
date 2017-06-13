class InteractionsController < ApplicationController
  before_action :set_video, only: [:create]


  def create
  	@interaction = Interaction.create()
  	#debugger

  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:video_id])
    end

end