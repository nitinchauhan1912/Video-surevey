class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :video, foreign_key: true
      t.integer :question_id
      t.string :question_name
      t.text :value
      t.timestamps
    end
  end
end
