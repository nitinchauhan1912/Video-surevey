class ChageClmInteractionAtInteractionTbl < ActiveRecord::Migration
  def up
    remove_column :interactions, :interaction_at
    add_column :interactions, :interaction_at, :integer, default: 0
    add_column :interactions, :interaction_at_offset, :integer, default: 0
  end

  def down
    remove_column :interactions, :interaction_at
    remove_column :interactions, :interaction_at_offset
    add_column :interactions, :interaction_at, :time
  end
end
