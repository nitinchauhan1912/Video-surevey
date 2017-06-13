class Video < ActiveRecord::Base
 
 require 'uri'

  validates :video_link, presence: true
  has_many :interactions
  has_many :questions
  validate :valid_url





	def to_slug
    #strip the string
    ret = self.video_link

    #blow away apostrophes
    ret.gsub! /['`]/,""

    # @ --> at, and & --> and
    ret.gsub! /\s*@\s*/, " at "
    ret.gsub! /\s*&\s*/, " and "

    #replace all non alphanumeric, underscore or periods with underscore
     ret.gsub! /\s*[^A-Za-z0-9\.\-]\s*/, '_'  

     #convert double underscores to single
     ret.gsub! /_+/,"_"

     #strip off leading/trailing underscore
     ret.gsub! /\A[_\.]+|[_\.]+\z/,""

     ret
  end

  def valid_url
    uri = URI.parse(self.video_link)
    if !uri.host.nil? && uri.host == "www.youtube.com"
      return true
    elsif !uri.host.nil? && uri.host.split(".").include?("wistia")
      return true
    else
      #rescue URI::InvalidURIError
      self.errors.add(:video_link, "Invalid URl")
      false
    end
  end

end
