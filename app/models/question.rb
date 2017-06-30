class Question < ActiveRecord::Base
	belongs_to :video
	has_one :interaction, dependent: :destroy
  has_many :answers
   
  validates :question_label, presence: true
  
  after_create :assign_interaction
  
  QUESTION_TYPE = ["quiz","poll","open","email"]
  
	def assign_interaction
	  Interaction.create!(
	  	question_id: self.id,
	  	video_id: self.video_id,
	  	user_id: self.user_id,
	  	)
	end
  
  def quiz_type_question_attr(params)
    self.choice_1 = params[:choice_1]
    self.choice_2 = params[:choice_2]
    self.choice_3 = params[:choice_3]
    self.choice_4 = params[:choice_4]
  end
  
  def poll_type_question_attr(params)
    self.choice_1 = params[:choice_1]
    self.choice_2 = params[:choice_2]
    self.choice_3 = params[:choice_3]
    self.choice_4 = params[:choice_4]
  end
  
  def open_type_question_attr(params)
    
  end
  
  def email_type_question_attr(params)
    self.button_text = params[:button_text]
  end

	

end