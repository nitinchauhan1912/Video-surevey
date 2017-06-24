class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :question, foreign_key: true
      t.text :value

      t.timestamps
    end
  end
end
