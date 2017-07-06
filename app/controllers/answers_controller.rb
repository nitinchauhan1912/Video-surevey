class AnswersController < ApplicationController
  before_action :check_authentication, except: [:create]
  
  def index
    @video = Video.find_by_slug(params[:slug])
    questions = @video.questions
    question_ids = @video.answers.order("video_response_id DESC").collect(&:question_id).uniq
    @questions_label = ["Timestamp"] + Answer.where(:question_id =>question_ids).order("video_response_id DESC").collect(&:question_name).uniq
    @responses = []
    if @video && @video.user_id == current_user.id
      @video.video_responses.order("id DESC").each do |video_response|
        video_responses = []
        video_responses << video_response.created_at.utc
        question_ids.each do |q_id|
          answers = Answer.where("question_id = ? AND video_response_id = ?",q_id,video_response.id)
          if answers.size > 0
            if answers.first.question_type == 'email'
              video_responses << answers.first.value.gsub("$$$","/")
            else
              video_responses << answers.first.value
            end
          else
            video_responses << nil
          end
        end
       @responses << video_responses
      end  
    end
    respond_to do |format|
      format.html
      format.csv { send_data Answer.to_csv(@questions_label,@responses) }
    end
  end
  
  def create
    @error = false
    @error_type = ''
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
    elsif @question.question_type == 'password' && @question.choice_1 != value
      @error = true
      @error_type = 'password'
    end
    @answer = Answer.new({:value=>value,:question_name=>@question.question_label,:question_id => @question.id,:video_response_id=>session[:response_id],:question_type=>@question.question_type,:video_id =>@question.video.id })
    if !@error
      if @answer.save 
      else
        @error_type = 'save'
      end
    end
    respond_to do |format|
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
