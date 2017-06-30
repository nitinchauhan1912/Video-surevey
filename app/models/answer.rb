class Answer < ApplicationRecord
  belongs_to :video
  belongs_to :question
end
