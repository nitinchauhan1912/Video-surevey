class CreateQuestions < ActiveRecord::Migration
  def up
    create_table :questions do |t|
      t.integer :video_id
      t.string :question_label
      t.string :question_type
      t.string :choice_1
      t.string :choice_2
      t.string :choice_3
      t.string :choice_4
      t.string :button_text
      t.integer :user_id
      t.timestamps
    end
  end

  def down
  	drop_table :questions
  end
end
