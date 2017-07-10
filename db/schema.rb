# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170710040625) do

  create_table "answers", force: :cascade do |t|
    t.integer  "video_id"
    t.integer  "question_id"
    t.string   "question_name"
    t.text     "value"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "video_response_id"
    t.string   "question_type"
  end

  create_table "interactions", force: :cascade do |t|
    t.integer  "video_id"
    t.integer  "question_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "interaction_at",        default: 0
    t.integer  "interaction_at_offset", default: 0
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "video_id"
    t.string   "question_label"
    t.string   "question_type"
    t.string   "choice_1"
    t.string   "choice_2"
    t.string   "choice_3"
    t.string   "choice_4"
    t.string   "button_text"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "btn_url"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "video_responses", force: :cascade do |t|
    t.integer  "video_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "videos", force: :cascade do |t|
    t.string   "video_link"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "slug"
    t.integer  "response",   default: 0
    t.string   "video_type"
    t.integer  "user_id"
  end

end
