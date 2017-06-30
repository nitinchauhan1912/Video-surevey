class AddVideoResponsesId < ActiveRecord::Migration
  def change
    add_column :answers, :video_response_id, :integer
  end
end
