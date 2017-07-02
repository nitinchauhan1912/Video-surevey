class QuestionsController < ApplicationController
  before_action :set_video, only: [:create]
  before_action :check_authentication

  def create
    if !current_user && !Question::QUESTION_TYPE.include?(params[:question_type])
      Rails.logger.info "Error - Create Question - Invalid data match"
      return 
    end
    @question = Question.new
    @question.video_id = @video.id
    
    @question.user_id = current_user.id
    @question.question_label = params[:question_title]
    @question.question_type = params[:question_type]
    
    if(@question.question_type == 'quiz')
      @question.quiz_type_question_attr(params)
    elsif(@question.question_type == 'open')   
      @question.open_type_question_attr(params)
    elsif(@question.question_type == 'poll')
      @question.poll_type_question_attr(params)
    elsif(@question.question_type == 'email')  
      @question.email_type_question_attr(params)
    end
    time = params[:interaction_at].split(":")
    interaction_offset = params[:interaction_at_offset].to_i
    time_in_sec = time[0].to_i * 3600 + time[1].to_i * 60 + time[2].to_i
    @error = {}

    if @question.valid? && @question.save
      @question.interaction.create_interaction(time_in_sec,interaction_offset)
    else
      @error = @question.errors.messages if !@question.valid?
    end
    respond_to do |format|
      format.js
    end
  end

  def update
    @question = Question.where(:id=>params[:id]).first
    if !current_user && @question && !Question::QUESTION_TYPE.include?(@question.question_type) && @question.user_id != current_user.id
      Rails.logger.info "Error - Question Update: Invalid data match. Cant' Proceed"
      return
    end
    @question.question_label = params[:question_title]
    if(@question.question_type == 'quiz')
      @question.quiz_type_question_attr(params)
    elsif(@question.question_type == 'open')   
      @question.open_type_question_attr(params)
    elsif(@question.question_type == 'poll')
      @question.poll_type_question_attr(params)
    elsif(@question.question_type == 'email')  
      @question.email_type_question_attr(params)
    end
    @error = {}
    if @question.valid?
      @question.save
    else
      @error = @question.errors.messages if !@question.valid?
    end
    respond_to do |format|
      format.js
    end
  end

  def destroy
    @question = Question.where(:id=>params[:id]).first
    @video = @question.video
    @question.destroy
    respond_to do |format|
      format.js
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

  def check_authentication
    if !current_user
      flash[:warning] = "Your are not authorize to view any content until you sign in."
      redirect_to '/'
    end  
  end  
end