class CreateInteractions < ActiveRecord::Migration
  def up
    create_table :interactions do |t|
      t.integer :video_id
      t.integer :question_id
      t.integer :user_id
      t.time    :interaction_at
      t.timestamps
    end
  end

  def down
  	drop_table :interactions
  end
end
