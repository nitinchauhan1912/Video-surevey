class Interaction < ActiveRecord::Base
	belongs_to :video
	belongs_to :question


	def create_interaction(time)
		self.interaction_at = time
		self.save
	end

end