class AnswersController < ApplicationController
  
  def create
    Rails.logger.info "********************#{params.inspect}"
    Rails.logger.info "*******************#{params["question_id"]}"
    Rails.logger.info "*******************#{params[:question_id]}"
    @question = Question.find(params[:question_id])
    if(@question.question_type == 'email')
      value = params[:share_question_answer_name]+'$$$'+params[:share_question_answer_email]
      #@answer = @question.answers.new({:question_id=>params[:question_id],:value=>value})
    else
      #@answer = @question.answers.new({:question_id=>params[:question_id],:value=>params[:share_question_answer]})
    end
    @error = false
    respond_to do |format|
#      if @answer.save
#      else
#        @error = true
#      end
      format.js { render "create" }
    end
    
  end
  private

  def set_video_response
     if(@response)
       #@question.video.increment!(:response)
       @response = false
     end
  end
end
