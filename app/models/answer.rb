class Answer < ApplicationRecord
  belongs_to :video
  belongs_to :question
  
  def self.to_csv(column_names,results)
    CSV.generate do |csv|
      csv << column_names
      results.each do |result|
        csv << result
      end
    end
  end
  
end
