class CreateVideoResponse < ActiveRecord::Migration
  def change
    create_table :video_responses do |t|
      #t.integer :id , primary_key: true
      t.integer :video_id
      t.timestamps
    end
  end
end
