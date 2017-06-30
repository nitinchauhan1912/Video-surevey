class AnswersController < ApplicationController
  before_action :check_authentication, except: [:create]
  
  def index
    @video = Video.find(params[:id])
    @responses = nil
    questions = @video.questions
    question_ids = questions.collect(&:id)
    @question_lables = []
    @question_lables = ['Date'] + questions.collect(&:question_label)
    
    if @video && @video.user_id == current_user.id
      @responses = {}
      @video.video_responses.each do |video_response|
        @responses[video_response.id] = []
        video_response.answers.order("question_id ASC").each do |answer|
          if question_ids.include?(answer.question_id)
              @responses[video_response.id] << answer.value
          else
            @question_lables << answer.question_name
            @responses[video_response.id] << answer.value
          end
        end  
      end
    end 
    Rails.logger.info "********************#{@responses.inspect}"
    Rails.logger.info "********************#{@question_lables.inspect}"
    @question_lables.uniq
  end
  
  def create
    @question = Question.find(params[:question_id])
    if !session[:response_id].present?
       video_response = VideoResponse.new
       video_response.video_id = @question.video.id
       video_response.save!
       session[:response_id] = video_response.id
    end
    value = params[:share_question_answer]
    if(@question.question_type == 'email')
      value = params[:share_question_answer_name]+'$$$'+params[:share_question_answer_email]
    end
    @answer = Answer.new({:value=>value,:video_id=>@question.video.id,:question_name=>@question.question_label,:question_id => @question.id,:video_response_id=>session[:response_id]})
    
    @error = false
    respond_to do |format|
      if @answer.save
      else
        @error = true
      end
      format.js { render "create" }
    end
    
  end
  private
  
  def check_authentication
    if !current_user
      flash[:warning] = "Your are not authorize to view any content until you sign in."
      redirect_to '/'
    end  
  end
  
end
