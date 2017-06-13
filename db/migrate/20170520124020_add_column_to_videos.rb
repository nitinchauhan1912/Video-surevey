class AddColumnToVideos < ActiveRecord::Migration
  def change
    rename_column :videos, :title, :video_link
    add_column :videos, :slug, :string 
  end
end
