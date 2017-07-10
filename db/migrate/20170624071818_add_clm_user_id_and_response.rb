class AddClmUserIdAndResponse < ActiveRecord::Migration
  def change
    add_column :videos, :response, :integer, default: 0
  end
end
