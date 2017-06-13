class Question < ActiveRecord::Base
	belongs_to :video
	has_one :interaction

	after_create :assign_interaction



	def assign_interaction
	  Interaction.create!(
	  	question_id: self.id,
	  	video_id: self.video_id,
	  	user_id: self.user_id,
	  	)

	end

	

end