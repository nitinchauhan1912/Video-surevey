class Interaction < ActiveRecord::Base
	belongs_to :video
	belongs_to :question


  def create_interaction(time,interaction_offset)
		self.interaction_at = time
    self.interaction_at_offset = interaction_offset
		self.save
	end

end