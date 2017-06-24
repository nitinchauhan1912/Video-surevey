module ApplicationHelper
  def get_div_left_position(quest)
    interaction = quest.interaction.interaction_at_offset
    bar_origanal_width_during_interaction = 800
    spot_quest_position = ((interaction.to_f/bar_origanal_width_during_interaction) * 100)
  end
end
