class AddButtonUrlInQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :btn_url, :string
  end
end
