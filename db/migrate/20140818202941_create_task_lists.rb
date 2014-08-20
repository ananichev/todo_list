class CreateTaskLists < ActiveRecord::Migration
  def change
    create_table :task_lists do |t|
      t.text :task
      t.boolean :status

      t.timestamps
    end
  end
end
