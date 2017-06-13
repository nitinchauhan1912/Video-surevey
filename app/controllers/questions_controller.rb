class QuestionsController < ApplicationController
  before_action :set_video, only: [:create]


  def create
   # debugger
    return if !current_user
    @question = Question.new


    @question.video_id = @video.id
    @question.user_id = current_user.id
    @question.question_label = params[:question_title]
    @question.question_type = params[:question_type]
    @question.choice_1 = params[:choice_1]
    @question.choice_2 = params[:choice_2]
    @question.choice_3 = params[:choice_3]
    @question.choice_4 = params[:choice_4]
    @question.button_text = params[:button_text]
    #debugger
    time = 2.32

    if @question.save
        @question.interaction.create_interaction(time)
      respond_to do |format|
        format.js

      end
    else

    end
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:video_id])
    end

    def question_params
      params.require(:video).permit(:video_link)

    end

end